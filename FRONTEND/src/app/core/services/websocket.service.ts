import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebsocketChannel<T = any> {
  signal: WritableSignal<T | null>;
  subscription?: StompSubscription;
}

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private client: Client;
  private channels = new Map<string, WebsocketChannel>();

  // dentro de WebsocketService
  private connectionPromise: Promise<void>;
  private resolveConnection!: () => void;

  constructor() {
    this.connectionPromise = new Promise<void>((resolve) => {
      this.resolveConnection = resolve;
    });

    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // 👈 IMPORTANTE
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Conectado al WebSocket');
        this.resolveConnection(); // 👈 resolvemos la promesa
        this.resubscribeAll();
      },
    });

    this.client.activate();
  }

  public async publishWhenReady(destination: string, body: any): Promise<void> {
    await this.connectionPromise;
    this.publish(destination, body);
  }


  // Suscribirse a un tópico y obtener la señal reactiva
  public subscribe<T = any>(topic: string): Signal<T | null> {
    if (!this.channels.has(topic)) {
      const newChannel: WebsocketChannel<T> = {
        signal: signal<T | null>(null)
      };

      if (this.client.connected) {
        newChannel.subscription = this.client.subscribe(topic, (message: Message) => {
          newChannel.signal.set(this.parseMessage(message.body));
        });
      }

      this.channels.set(topic, newChannel);
    }

    return this.channels.get(topic)!.signal;
  }

  // Enviar datos al backend
  public publish(destination: string, body: any): void {
    if (this.client.connected) {
      this.client.publish({ destination, body: JSON.stringify(body) });
    } else {
      console.warn('❌ WebSocket no está conectado.');
    }
  }

  // Re-suscribirse a todos los canales luego de reconexión
  private resubscribeAll() {
    for (const [topic, channel] of this.channels) {
      channel.subscription = this.client.subscribe(topic, (message: Message) => {
        channel.signal.set(this.parseMessage(message.body));
      });
    }
  }

  private parseMessage<T = any>(body: string): T {
    try {
      return JSON.parse(body);
    } catch {
      return body as unknown as T;
    }
  }
}

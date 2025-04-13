package com.cebrian.test.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocket implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    // Permitir mensajes a estos prefijos
    config.enableSimpleBroker("/topic", "/queue");
    config.setApplicationDestinationPrefixes("/app"); // donde Angular publica
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // Endpoint de conexión (SockJS habilitado)
    registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
  }
}

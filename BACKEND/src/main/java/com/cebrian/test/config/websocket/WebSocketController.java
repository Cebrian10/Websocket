package com.cebrian.test.config.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.messaging.handler.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.cebrian.test.app.Clientes.service.ClienteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

  @Autowired
  private final SimpMessagingTemplate messagingTemplate;
  private final ClienteService clienteService;

  // Escucha mensajes que vienen desde Angular (/app/init por ejemplo)
  @MessageMapping("/init")
  public void handleInit() {
    messagingTemplate.convertAndSend("/topic/init", "connected");
  }

  @MessageMapping("/clientes")
  public void handleCliente(@Payload String clienteJson) {
    messagingTemplate.convertAndSend("/topic/clientes/count", clienteService.count(null));
  }

  @MessageMapping("/ventas")
  public void handleVenta(@Payload String ventaJson) {
    messagingTemplate.convertAndSend("/topic/ventas", ventaJson);
  }
}

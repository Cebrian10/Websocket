package com.cebrian.test.config.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.*;

@Component
public class WebSocketEventListener {

  private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

  @EventListener
  public void handleWebSocketConnectListener(SessionConnectedEvent event) {
    logger.info("🔌 Nueva conexión WebSocket");
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    logger.info("❌ Cliente desconectado: {}", event.getSessionId());
  }
}

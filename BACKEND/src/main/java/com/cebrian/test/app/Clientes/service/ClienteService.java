package com.cebrian.test.app.Clientes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.cebrian.test.app.Clientes.entity.Cliente;
import com.cebrian.test.app.Clientes.interfaces.ClienteInterface;
import com.cebrian.test.app.Clientes.repositories.ClienteRepository;
import com.cebrian.test.app.Shared.Response;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService implements ClienteInterface {

  @Autowired
  private final ClienteRepository clienteRepository;
  private final SimpMessagingTemplate messagingTemplate;

  /* ------------------------------ Métodos GET ------------------------------ */

  @Override
  public Long count(HttpServletRequest request) {
    try {
      return clienteRepository.count();
    } catch (Exception e) {
      throw e;
    }
  }

  @Override
  public List<Cliente> findAll(HttpServletRequest request) {
    try {
      return clienteRepository.findAll();
    } catch (Exception e) {
      throw e;
    }
  }

  /* ----------------------------- Métodos POST ------------------------------ */

  @Override
  public Response save(Cliente cliente, HttpServletRequest request) {
    try {
      clienteRepository.save(cliente);
      this.subscribeToTopic(request);

      return new Response("success", "Cliente guardado correctamente", "");
    } catch (Exception e) {
      return new Response("error", "Error al guardar el cliente", "");
    }
  }

  /* ------------------------------ Métodos PUT ------------------------------ */

  /* ---------------------------- Métodos DELETE ---------------------------- */

  @Override
  public Response delete(Integer id, HttpServletRequest request) {
    try {
      clienteRepository.deleteById(id);
      this.subscribeToTopic(request);

      return new Response("success", "Cliente eliminado correctamente", "");
    } catch (Exception e) {
      return new Response("error", "Error al eliminar el cliente", "");
    }
  }

  /* ------------------------------ Métodos AUX ------------------------------ */

  public void subscribeToTopic(HttpServletRequest request) {
    try {
      long totalClientes = this.count(request);
      messagingTemplate.convertAndSend("/topic/clientes", totalClientes);
    } catch (Exception e) {
      throw e;
    }
  }

}

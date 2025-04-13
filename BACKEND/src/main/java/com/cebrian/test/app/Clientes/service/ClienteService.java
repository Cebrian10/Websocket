package com.cebrian.test.app.Clientes.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

  @Override
  public Cliente findById(Integer id, HttpServletRequest request) {
    try {
      return clienteRepository.findById(id).orElse(null);
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
    } catch (DataIntegrityViolationException e) {
      return new Response("warning", "Cédula duplicada", "Ya existe un cliente con esta cédula");
    } catch (Exception e) {
      return new Response("error", "Error al guardar el cliente", "");
    }
  }

  /* ------------------------------ Métodos PUT ------------------------------ */

  @Override
  public Response update(Integer id, Cliente cliente, HttpServletRequest request) {
    try {
      Cliente existingCliente = this.findById(id, request);
      Field[] fields = cliente.getClass().getDeclaredFields();
      AtomicInteger count = new AtomicInteger(0);

      for (Field field : fields) {
        field.setAccessible(true);
        Object newValue = field.get(cliente);
        Object oldValue = field.get(existingCliente);
        // String fieldName = field.getName(); // En caso de querer guardar que campo
        // fue cambiado

        if (newValue != null && !newValue.equals(oldValue)) {
          field.set(existingCliente, newValue);
          count.incrementAndGet();
        }
      }

      if (count.get() == 0) {
        return new Response("info", "No se han realizado cambios", "");
      } else {
        cliente.setId(id);
        clienteRepository.save(cliente);
        return new Response("success", "Cliente actualizado correctamente", "");
      }
    } catch (Exception e) {
      return new Response("error", "Error al actualizar el cliente", "");
    }
  }

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
      messagingTemplate.convertAndSend("/topic/clientes/count", totalClientes);
    } catch (Exception e) {
      throw e;
    }
  }

}

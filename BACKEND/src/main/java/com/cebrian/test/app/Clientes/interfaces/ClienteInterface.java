package com.cebrian.test.app.Clientes.interfaces;

import java.util.List;

import com.cebrian.test.app.Clientes.entity.Cliente;
import com.cebrian.test.app.Shared.Response;

import jakarta.servlet.http.HttpServletRequest;

public interface ClienteInterface {

  /* ------------------------------ Métodos GET ------------------------------ */

  Long count(HttpServletRequest request);

  List<Cliente> findAll(HttpServletRequest request);

  Cliente findById(Integer id, HttpServletRequest request);

  /* ----------------------------- Métodos POST ------------------------------ */

  Response save(Cliente cliente, HttpServletRequest request);

  /* ------------------------------ Métodos PUT ------------------------------ */

  Response update(Integer id, Cliente cliente, HttpServletRequest request);

  /* ---------------------------- Métodos DELETE ---------------------------- */

  Response delete(Integer id, HttpServletRequest request);
  
}

package com.cebrian.test.app.Clientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cebrian.test.app.Clientes.entity.Cliente;
import com.cebrian.test.app.Clientes.service.ClienteService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

  @Autowired
  private final ClienteService clienteService;

  /* ------------------------------ Métodos GET ------------------------------ */

  @GetMapping("")
  public ResponseEntity<?> findAll(HttpServletRequest request) {
    return ResponseEntity.ok().body(clienteService.findAll(request));
  }

  @GetMapping("/count")
  public ResponseEntity<Long> countClientes(HttpServletRequest request) {
    return ResponseEntity.ok(clienteService.count(request));
  }

  /* ----------------------------- Métodos POST ------------------------------ */

  @PostMapping("")
  public ResponseEntity<?> save(@RequestBody @Valid Cliente cliente, HttpServletRequest request) {
    return ResponseEntity.ok().body(clienteService.save(cliente, request));
  }

  /* ------------------------------ Métodos PUT ------------------------------ */

  /* ---------------------------- Métodos DELETE ---------------------------- */

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Integer id, HttpServletRequest request) {
    return ResponseEntity.ok().body(clienteService.delete(id, request));
  }

}

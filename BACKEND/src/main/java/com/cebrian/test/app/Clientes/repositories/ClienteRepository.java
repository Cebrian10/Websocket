package com.cebrian.test.app.Clientes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cebrian.test.app.Clientes.entity.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {    
  
}

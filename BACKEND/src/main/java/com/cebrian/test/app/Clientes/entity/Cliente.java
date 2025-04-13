package com.cebrian.test.app.Clientes.entity;

import com.unboundid.util.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "[dbo].[CLIENTES]")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "[id]")
  private Integer id;

  @NotNull
  @Size(max = 100)
  @Column(name = "[nombre]")
  private String nombre;

  @NotNull
  @Size(max = 100)
  @Column(name = "[apellido]")
  private String apellido;

  @NotNull
  @Size(max = 20)
  @Column(name = "[cedula]")
  private String cedula;

  @NotNull
  @Column(name = "[edad]")
  private Integer edad;

}

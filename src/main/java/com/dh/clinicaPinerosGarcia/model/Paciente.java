package com.dh.clinicaPinerosGarcia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@Table(name = "Pacientes")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="nombre_paciente")
    private String nombre;

    @Column(name="apellido_paciente")
    private String apellido;

    @Column(name="dni_paciente")
    private String dni;

    @Column(name="fechaRegistro_paciente")
    private LocalDate fecha_registro;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_domicilio" , referencedColumnName = "id", nullable = false)
    private Domicilio domicilio;

    /*
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_usuario" , referencedColumnName = "id", nullable = false)
    private Usuario usuario;
     */

    @OneToMany(mappedBy = "paciente", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Turno> turnos;

    public Paciente() {
    }
    public Paciente(String nombre, String apellido, String dni, LocalDate fecha_registro, Domicilio domicilio, Set<Turno> turnos) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fecha_registro = fecha_registro;
        this.domicilio = domicilio;
        this.turnos = turnos;
    }

    public Paciente(Integer id, String nombre, String apellido, String dni, LocalDate fecha_registro, Domicilio domicilio, Set<Turno> turnos) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fecha_registro = fecha_registro;
        this.domicilio = domicilio;
        this.turnos = turnos;
    }
}

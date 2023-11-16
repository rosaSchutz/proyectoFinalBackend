package com.dh.clinicaPinerosGarcia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@Table(name = "Odontologos")
public class Odontologo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="nombre_odontologo")
    private String nombre;

    @Column(name="apellido_odontologo")
    private String apellido;

    @Column(name="matricula_odontologo")
    private String matricula;

     /*
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_odontologo" , referencedColumnName = "id", nullable = false)
    private Usuario usuario;
      */

    @OneToMany(mappedBy = "odontologo", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Turno> turnos;

    public Odontologo() {
    }

    public Odontologo(String nombre, String apellido, String matricula, Set<Turno> turnos) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.turnos = turnos;
    }

    public Odontologo(Integer id, String nombre, String apellido, String matricula, Set<Turno> turnos) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.turnos = turnos;
    }
}

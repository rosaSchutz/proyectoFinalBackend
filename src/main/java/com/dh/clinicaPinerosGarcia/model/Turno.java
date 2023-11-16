package com.dh.clinicaPinerosGarcia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString
@Table(name = "Turnos")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "odontologo_id", nullable = false)
    private Odontologo odontologo;

    @Column(name="fecha_turno")
    private LocalDate fechaTurno;

    @Column(name="hora_turno")
    private String horaTurno;

    public Turno() {
    }

    public Turno(Paciente paciente, Odontologo odontologo, LocalDate fechaTurno, String horaTurno) {
        this.paciente = paciente;
        this.odontologo = odontologo;
        this.fechaTurno = fechaTurno;
        this.horaTurno = horaTurno;
    }

    public Turno(Integer id, Paciente paciente, Odontologo odontologo, LocalDate fechaTurno, String horaTurno) {
        this.id = id;
        this.paciente = paciente;
        this.odontologo = odontologo;
        this.fechaTurno = fechaTurno;
        this.horaTurno = horaTurno;
    }
}

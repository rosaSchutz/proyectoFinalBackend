package com.dh.clinicaPinerosGarcia.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "Domicilios")
public class Domicilio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="domicilio")
    private String domicilio;
    public Domicilio() {
    }

    public Domicilio(Integer id, String domicilio) {
        this.id = id;
        this.domicilio = domicilio;
    }
}

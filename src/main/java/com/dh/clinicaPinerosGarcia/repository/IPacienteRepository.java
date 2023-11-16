package com.dh.clinicaPinerosGarcia.repository;

import com.dh.clinicaPinerosGarcia.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPacienteRepository extends JpaRepository<Paciente, Integer> {

    @Query("select p from Paciente p where p.dni =?1")
    Optional<Paciente> findPacienteByDni (String dni);
}
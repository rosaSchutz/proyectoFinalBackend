package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.PacienteDTO;

import java.util.Set;

public interface IPacienteService {
    void createPaciente(PacienteDTO pacienteDTO);
    PacienteDTO readPaciente(Integer id);
    PacienteDTO readDniPaciente(String dni);
    void updatePaciente(PacienteDTO pacienteDTO);
    void deletePaciente(Integer id);
    Set<PacienteDTO> getAll();
}

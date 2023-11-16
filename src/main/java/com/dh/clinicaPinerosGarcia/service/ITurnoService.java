package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.TurnoDTO;

import java.util.Set;

public interface ITurnoService {
    void createTurno(TurnoDTO turnoDTO);
    TurnoDTO readTurno(Integer id);
    void updateTurno(TurnoDTO turnoDTO);
    void deleteTurno(Integer id);
    Set<TurnoDTO> getAll();
}

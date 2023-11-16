package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.OdontologoDTO;
import com.dh.clinicaPinerosGarcia.model.TurnoDTO;


import java.util.Set;

public interface IOdontologoService {
    void createOdontologo(OdontologoDTO odontologoDTO);
    OdontologoDTO readOdontologo(Integer id);
    OdontologoDTO readMatriculaOdontologo(String matricula);
    void updateOdontologo(OdontologoDTO odontologoDTO);
    void deleteOdontologo(Integer id);
    Set<OdontologoDTO> getAll();
}

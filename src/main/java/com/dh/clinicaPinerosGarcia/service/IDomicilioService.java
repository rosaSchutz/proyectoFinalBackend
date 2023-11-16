package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.DomicilioDTO;

import java.util.Set;

public interface IDomicilioService {
    void createDomicilio(DomicilioDTO domicilioDTO);
    DomicilioDTO readDomicilio(Integer id);
    void updateDomicilio(DomicilioDTO domicilioDTO);
    void deleteDomicilio(Integer id);
    Set<DomicilioDTO> getAll();
}

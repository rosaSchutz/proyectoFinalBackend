package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.Domicilio;
import com.dh.clinicaPinerosGarcia.model.DomicilioDTO;
import com.dh.clinicaPinerosGarcia.model.Turno;
import com.dh.clinicaPinerosGarcia.model.TurnoDTO;
import com.dh.clinicaPinerosGarcia.repository.IDomicilioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DomicilioService implements IDomicilioService{
    IDomicilioRepository repository;
    ObjectMapper mapper;

    @Autowired
    public DomicilioService(IDomicilioRepository repository, ObjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    private void saveDomicilio(DomicilioDTO domicilioDTO){
        Domicilio domicilio = mapper.convertValue(domicilioDTO, Domicilio.class);
        repository.save(domicilio);
    }

    @Override
    public void createDomicilio(DomicilioDTO domicilioDTO) {
        saveDomicilio(domicilioDTO);
    }

    @Override
    public DomicilioDTO readDomicilio(Integer id) {
        Optional<Domicilio> domicilio = repository.findById(id);
        DomicilioDTO domicilioDTO = null;
        if(domicilio.isPresent())
            domicilioDTO = mapper.convertValue(domicilio, DomicilioDTO.class);
        return domicilioDTO;
    }

    @Override
    public void updateDomicilio(DomicilioDTO domicilioDTO) {
        saveDomicilio(domicilioDTO);
    }

    @Override
    public void deleteDomicilio(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Set<DomicilioDTO> getAll() {
        List<Domicilio> domicilios = repository.findAll();
        Set<DomicilioDTO> domiciliosDTO = new HashSet<>();

        for(Domicilio domicilio:domicilios){
            domiciliosDTO.add(mapper.convertValue(domicilio, DomicilioDTO.class));
        }
        return domiciliosDTO;
    }
}

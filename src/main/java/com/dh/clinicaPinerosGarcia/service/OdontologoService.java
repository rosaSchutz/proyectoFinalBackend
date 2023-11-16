package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.ResourceNotFoundException;
import com.dh.clinicaPinerosGarcia.model.Odontologo;
import com.dh.clinicaPinerosGarcia.model.OdontologoDTO;
import com.dh.clinicaPinerosGarcia.repository.IOdontologoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OdontologoService implements IOdontologoService{
    IOdontologoRepository repository;
    ObjectMapper mapper;

    @Autowired
    public OdontologoService(IOdontologoRepository repository, ObjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    private void saveOdontologo(OdontologoDTO odontologoDTO){
        Odontologo odontologo = mapper.convertValue(odontologoDTO, Odontologo.class);
        repository.save(odontologo);
    }

    @Override
    public void createOdontologo(OdontologoDTO odontologoDTO) {
        saveOdontologo(odontologoDTO);
    }

    @Override
    public OdontologoDTO readOdontologo(Integer id) {
        Optional<Odontologo> odontologo = repository.findById(id);
        OdontologoDTO odontologoDTO = null;
        if(odontologo.isPresent())
            odontologoDTO = mapper.convertValue(odontologo, OdontologoDTO.class);
        return odontologoDTO;
    }

    //Buscar odontologo por su matricula
    @Override
    public OdontologoDTO readMatriculaOdontologo(String matricula) throws ResourceNotFoundException {
        Optional<Odontologo> odontologo = repository.findOdontologoByMatricula(matricula);
        OdontologoDTO odontologoDTO = null;
        if(odontologo.isPresent())
            odontologoDTO = mapper.convertValue(odontologo, OdontologoDTO.class);
        return odontologoDTO;
    }

    @Override
    public void updateOdontologo(OdontologoDTO odontologoDTO) {
        saveOdontologo(odontologoDTO);
    }

    @Override
    public void deleteOdontologo(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Set<OdontologoDTO> getAll() {
        List<Odontologo> odontologos = repository.findAll();
        Set<OdontologoDTO> odontologosDTO = new HashSet<>();

        for(Odontologo odontologo:odontologos){
            odontologosDTO.add(mapper.convertValue(odontologo,OdontologoDTO.class));
        }
        return odontologosDTO;
    }
}


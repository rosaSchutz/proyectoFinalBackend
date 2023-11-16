package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.ResourceNotFoundException;
import com.dh.clinicaPinerosGarcia.model.Paciente;
import com.dh.clinicaPinerosGarcia.model.PacienteDTO;
import com.dh.clinicaPinerosGarcia.repository.IPacienteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PacienteService implements IPacienteService{
    IPacienteRepository repository;
    ObjectMapper mapper;

    @Autowired
    public PacienteService(IPacienteRepository repository, ObjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    private void savePaciente(PacienteDTO pacienteDTO){
        Paciente paciente = mapper.convertValue(pacienteDTO, Paciente.class);
        repository.save(paciente);
    }

    @Override
    public void createPaciente(PacienteDTO pacienteDTO) {
        savePaciente(pacienteDTO);
    }

    @Override
    public PacienteDTO readPaciente(Integer id) {
        Optional<Paciente> paciente = repository.findById(id);
        PacienteDTO pacienteDTO = null;
        if(paciente.isPresent())
            pacienteDTO = mapper.convertValue(paciente, PacienteDTO.class);
        return pacienteDTO;
    }

    //Buscar paciente por su DNI
    @Override
    public PacienteDTO readDniPaciente(String dni) throws ResourceNotFoundException {
        Optional<Paciente> paciente = repository.findPacienteByDni(dni);
        PacienteDTO pacienteDTO = null;
        if(paciente.isPresent())
            pacienteDTO = mapper.convertValue(paciente, PacienteDTO.class);
        return pacienteDTO;
    }

    @Override
    public void updatePaciente(PacienteDTO pacienteDTO) {
        savePaciente(pacienteDTO);
    }

    @Override
    public void deletePaciente(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Set<PacienteDTO> getAll() {
        List<Paciente> pacientes = repository.findAll();
        Set<PacienteDTO> pacientesDTO = new HashSet<>();

        for(Paciente paciente:pacientes){
            pacientesDTO.add(mapper.convertValue(paciente, PacienteDTO.class));
        }
        return pacientesDTO;
    }
}

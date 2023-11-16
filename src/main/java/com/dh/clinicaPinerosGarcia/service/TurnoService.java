package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.Turno;
import com.dh.clinicaPinerosGarcia.model.TurnoDTO;
import com.dh.clinicaPinerosGarcia.repository.ITurnoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TurnoService implements ITurnoService{
    @Autowired ITurnoRepository repository;
    @Autowired ObjectMapper mapper;

    private void saveTurno(TurnoDTO turnoDTO){
        Turno turno = mapper.convertValue(turnoDTO, Turno.class);
        repository.save(turno);
    }

    @Override
    public void createTurno(TurnoDTO turnoDTO) {
        saveTurno(turnoDTO);
    }

    @Override
    public TurnoDTO readTurno(Integer id) {
        Optional<Turno> turno = repository.findById(id);
        TurnoDTO turnoDTO = null;
        if(turno.isPresent())
            turnoDTO = mapper.convertValue(turno, TurnoDTO.class);
        return turnoDTO;
    }

    @Override
    public void updateTurno(TurnoDTO turnoDTO) {
        saveTurno(turnoDTO);
    }

    @Override
    public void deleteTurno(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Set<TurnoDTO> getAll() {
        List<Turno> turnos = repository.findAll();
        Set<TurnoDTO> turnosDTO = new HashSet<>();

        for(Turno turno:turnos){
            turnosDTO.add(mapper.convertValue(turno, TurnoDTO.class));
        }
        return turnosDTO;
    }
}

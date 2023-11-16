package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringRunner.class)
@SpringBootTest
class TurnoServiceTest {

    @Autowired
    ITurnoService turnoService;

    @Autowired
    IPacienteService pacienteService;

    @Autowired
    IOdontologoService odontologoService;

    @Autowired
    ObjectMapper mapper;

    @Test
    void create() {
        //Creando Odontolo Uno
        OdontologoDTO odontologoDto = new OdontologoDTO();
        odontologoDto.setId(1);
        odontologoDto.setNombre("Pablo");
        odontologoDto.setApellido("Sanchez");
        odontologoDto.setMatricula("2334553");
        odontologoService.createOdontologo(odontologoDto);

        //Creando paciente Uno
        PacienteDTO pacienteDTO = new PacienteDTO();
        pacienteDTO.setId(1);
        pacienteDTO.setNombre("Maria");
        pacienteDTO.setApellido("Hernandez");
        pacienteDTO.setDni("56876543");
        pacienteDTO.setFecha_registro(LocalDate.parse("2023-09-13"));

        Domicilio domicilio = new Domicilio();
        domicilio.setCalle("Av Santa fe");
        domicilio.setNumero("444");
        domicilio.setLocalidad("CABA");
        domicilio.setProvincia("Buenos Aires");
        pacienteDTO.setDomicilio(domicilio);
        pacienteService.createPaciente(pacienteDTO);

        Paciente paciente = mapper.convertValue(pacienteDTO, Paciente.class);
        Odontologo odontologo = mapper.convertValue(odontologoDto, Odontologo.class);


        //Setemos los valores al turno
        TurnoDTO turnoDTO = new TurnoDTO();

        turnoDTO.setPaciente(paciente);
        turnoDTO.setOdontologo(odontologo);
        turnoDTO.setFechaTurno(LocalDate.parse("2023-09-30"));
        turnoDTO.setHoraTurno("17:00");

        //Llamando al servicio de crear turno para crear dos turnos con los mismos datos
        turnoService.createTurno(turnoDTO);
        turnoService.createTurno(turnoDTO);

        assertNotNull(turnoService.readTurno(1));
    }

     @Test
     void getAll() {
        Set<TurnoDTO> turnoDTO = turnoService.getAll();
        assertFalse(turnoDTO.isEmpty());
    }

    @Test
    void delete() {
        turnoService.deleteTurno(2);
        assertNull(turnoService.readTurno(2));
    }
}
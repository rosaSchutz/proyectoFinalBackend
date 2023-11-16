package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.OdontologoDTO;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringRunner.class)
@SpringBootTest
class OdontologoServiceTest {

    @Autowired
    IOdontologoService odontologoService;

    @Test
     void create() {
        OdontologoDTO odontologoDto = new OdontologoDTO();
        odontologoDto.setNombre("Pablo");
        odontologoDto.setApellido("Sanchez");
        odontologoDto.setMatricula("2334553");

        OdontologoDTO odontologoDosDto = new OdontologoDTO();
        odontologoDosDto.setNombre("Maria Paula");
        odontologoDosDto.setApellido("Rodriguez");
        odontologoDosDto.setMatricula("12349853");

        odontologoService.createOdontologo(odontologoDto);
        odontologoService.createOdontologo(odontologoDosDto);

        Set<OdontologoDTO> odontologos = odontologoService.getAll();
        assertTrue(odontologos.size() > 0);
    }

    @Test
     void getAll() {
        Set<OdontologoDTO> odontologoDTO = odontologoService.getAll();
        assertFalse(odontologoDTO.isEmpty());
    }

    @Test
     void delete() {
        odontologoService.deleteOdontologo(2);
        assertNull(odontologoService.readOdontologo(2));
    }

}
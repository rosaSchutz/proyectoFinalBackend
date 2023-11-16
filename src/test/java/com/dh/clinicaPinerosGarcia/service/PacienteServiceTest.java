package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.Domicilio;
import com.dh.clinicaPinerosGarcia.model.PacienteDTO;
import org.junit.FixMethodOrder;
import org.junit.Test;
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
public class PacienteServiceTest {

    @Autowired
    IPacienteService pacienteService;

    @Test
    public void create() {
        //Creando paciente Uno
        PacienteDTO pacienteDTO = new PacienteDTO();
        pacienteDTO.setNombre("Santiago");
        pacienteDTO.setApellido("Paz");
        pacienteDTO.setDni("88888888");
        pacienteDTO.setFecha_registro(LocalDate.parse("2023-09-13"));

        Domicilio domicilio = new Domicilio();
        domicilio.setCalle("Av Santa fe");
        domicilio.setNumero("444");
        domicilio.setLocalidad("CABA");
        domicilio.setProvincia("Buenos Aires");
        pacienteDTO.setDomicilio(domicilio);

        //Creando paciente Dos
        PacienteDTO pacienteDosDTO = new PacienteDTO();
        pacienteDosDTO.setNombre("Micaela");
        pacienteDosDTO.setApellido("Perez");
        pacienteDosDTO.setDni("99999999");
        pacienteDosDTO.setFecha_registro(LocalDate.parse("2023-09-13"));

        Domicilio domicilioDos = new Domicilio();
        domicilioDos.setCalle("Av Avellaneda");
        domicilioDos.setNumero("333");
        domicilioDos.setLocalidad("CABA");
        domicilioDos.setProvincia("Buenos Aires");
        pacienteDosDTO.setDomicilio(domicilioDos);

        //Llamando al servicio crear paciente
        pacienteService.createPaciente(pacienteDTO);
        pacienteService.createPaciente(pacienteDosDTO);

        //Haciendo el test
        Set<PacienteDTO> pacientes = pacienteService.getAll();
        assertTrue(pacientes.size() > 0);
    }

    @Test
    public void getAll() {
        Set<PacienteDTO> pacienteDTO = pacienteService.getAll();
        assertFalse(pacienteDTO.isEmpty());
    }

    @Test
    public void delete() {
        pacienteService.deletePaciente(2);
        assertNull(pacienteService.readPaciente(2));
    }
}
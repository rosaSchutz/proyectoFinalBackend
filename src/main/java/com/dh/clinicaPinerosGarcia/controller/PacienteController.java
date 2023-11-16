package com.dh.clinicaPinerosGarcia.controller;

import com.dh.clinicaPinerosGarcia.ResourceNotFoundException;
import com.dh.clinicaPinerosGarcia.model.Paciente;
import com.dh.clinicaPinerosGarcia.model.PacienteDTO;
import com.dh.clinicaPinerosGarcia.service.IPacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {
    IPacienteService pacienteService;

    @Autowired
    public PacienteController(IPacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPaciente(@RequestBody PacienteDTO pacienteDTO) {
        pacienteService.createPaciente(pacienteDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public PacienteDTO getPaciente(@PathVariable Integer id){
        return pacienteService.readPaciente(id);
    }

    @GetMapping("/buscarDni/{dni}")
    public PacienteDTO getDniPaciente(@PathVariable String dni) throws ResourceNotFoundException{
        return pacienteService.readDniPaciente(dni);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updatePaciente(@RequestBody PacienteDTO pacienteDTO) {
        pacienteService.updatePaciente(pacienteDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removePaciente(@PathVariable Integer id) {
        ResponseEntity<String> response = null;
        pacienteService.deletePaciente(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

    @GetMapping("/getAll")
    public Collection<PacienteDTO> listPacientes() {
        return pacienteService.getAll();
    }
}

package com.dh.clinicaPinerosGarcia.controller;

import com.dh.clinicaPinerosGarcia.model.TurnoDTO;
import com.dh.clinicaPinerosGarcia.service.ITurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;


@RestController
@RequestMapping("/turnos")
public class TurnoController {
    ITurnoService turnoService;
    @Autowired
    public TurnoController(ITurnoService turnoService) {
        this.turnoService = turnoService;
    }
    @PostMapping("/add")
    public ResponseEntity<?> addTurno(@RequestBody TurnoDTO turnoDTO) {
        turnoService.createTurno(turnoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public TurnoDTO getTurno(@PathVariable Integer id){
        return turnoService.readTurno(id);
    }
    @PutMapping("/update")
    public ResponseEntity<?> modifyTurno(@RequestBody TurnoDTO turnoDTO) {
        turnoService.updateTurno(turnoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeTurno(@PathVariable Integer id) {
        ResponseEntity<String> response = null;
        turnoService.deleteTurno(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }
    @GetMapping("/getAll")
    public Collection<TurnoDTO> listTurnos() {
        return turnoService.getAll();
    }
}

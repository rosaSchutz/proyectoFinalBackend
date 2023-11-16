package com.dh.clinicaPinerosGarcia.controller;

import com.dh.clinicaPinerosGarcia.model.OdontologoDTO;
import com.dh.clinicaPinerosGarcia.service.IOdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
@RestController
@RequestMapping("/odontologos")
public class OdontologoController {
    IOdontologoService odontologoService;
    @Autowired
    public OdontologoController(IOdontologoService odontologoService) {
        this.odontologoService = odontologoService;
    }
    @PostMapping("/add")
    public ResponseEntity<?> addOdontologo(@RequestBody OdontologoDTO odontologoDTO) {
        odontologoService.createOdontologo(odontologoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public OdontologoDTO getOdontologo(@PathVariable Integer id){
        return odontologoService.readOdontologo(id);
    }
    @PutMapping("/update")
    public ResponseEntity<?> modifyOdontologo(@RequestBody OdontologoDTO odontologoDTO) {
        odontologoService.updateOdontologo(odontologoDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeOdontologo(@PathVariable Integer id) {

        ResponseEntity<String> response = null;
        odontologoService.deleteOdontologo(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }
    @GetMapping("/getAll")
    public Collection<OdontologoDTO> listOdontologo() {
        return odontologoService.getAll();
    }
}

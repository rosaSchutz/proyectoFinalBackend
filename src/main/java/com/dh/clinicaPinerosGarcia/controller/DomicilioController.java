package com.dh.clinicaPinerosGarcia.controller;

import com.dh.clinicaPinerosGarcia.model.DomicilioDTO;
import com.dh.clinicaPinerosGarcia.service.IDomicilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/domicilios")
public class DomicilioController {
    IDomicilioService domicilioService;

    @Autowired
    public DomicilioController(IDomicilioService domicilioService) {
        this.domicilioService = domicilioService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addDomicilio(@RequestBody DomicilioDTO domicilioDTO) {
        domicilioService.createDomicilio(domicilioDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public DomicilioDTO getDomicilio(@PathVariable Integer id){
        return domicilioService.readDomicilio(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> modifyDomicilio(@RequestBody DomicilioDTO domicilioDTO) {
        domicilioService.updateDomicilio(domicilioDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeDomicilio(@PathVariable Integer id) {

        ResponseEntity<String> response = null;
        domicilioService.deleteDomicilio(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

    @GetMapping("/getAll")
    public Collection<DomicilioDTO> listDomicilios() {
        return domicilioService.getAll();
    }

}

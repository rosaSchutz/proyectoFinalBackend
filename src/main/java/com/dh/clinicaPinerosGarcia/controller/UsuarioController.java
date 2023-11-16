package com.dh.clinicaPinerosGarcia.controller;

import com.dh.clinicaPinerosGarcia.model.UsuarioDTO;
import com.dh.clinicaPinerosGarcia.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @GetMapping("/")
    public String home(){
        return "Welcome";
    }

    @GetMapping("/user")
    public String user(){
        return "Welcome usuario";
    }

    @GetMapping("/admin")
    public String admin(){
        return "Welcome admin";
    }

    /*
    IUsuarioService usuarioService;

    @Autowired
    public UsuarioController(IUsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        usuarioService.createUsuario(usuarioDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public UsuarioDTO getUsuario(@PathVariable Integer id){
        return usuarioService.readUsuario(id);
    }
    @PutMapping("/update")
    public ResponseEntity<?> modifyUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        usuarioService.updateUsuario(usuarioDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeUsuario(@PathVariable Integer id) {
        ResponseEntity<String> response = null;
        usuarioService.deleteUsuario(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

    @GetMapping("/getAll")
    public Collection<UsuarioDTO> listUsuarios() {
        return usuarioService.getAll();
    }

     */


}

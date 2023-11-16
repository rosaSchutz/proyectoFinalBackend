package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.UsuarioDTO;

import java.util.Set;

public interface IUsuarioService {
    void createUsuario(UsuarioDTO usuarioDTO);
    UsuarioDTO readUsuario(Integer id);
    void updateUsuario(UsuarioDTO usuarioDTO);
    void deleteUsuario(Integer id);
    Set<UsuarioDTO> getAll();
}

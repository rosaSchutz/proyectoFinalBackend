package com.dh.clinicaPinerosGarcia.service;


import com.dh.clinicaPinerosGarcia.model.Usuario;
import com.dh.clinicaPinerosGarcia.model.UsuarioDTO;
import com.dh.clinicaPinerosGarcia.repository.IUsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UsuarioService implements UserDetailsService{

    private final IUsuarioRepository userRepository;

    @Autowired
    public UsuarioService(IUsuarioRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow((() -> new UsernameNotFoundException("email usuario no encontrado: " + email)));
    }

    /*
    IUsuarioRepository repository;
    ObjectMapper mapper;

    @Autowired
    public UsuarioService(IUsuarioRepository repository, ObjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    private void saveUsuario(UsuarioDTO usuarioDTO){
        Usuario usuario = mapper.convertValue(usuarioDTO, Usuario.class);
        repository.save(usuario);
    }

    @Override
    public void createUsuario(UsuarioDTO usuarioDTO) {
        saveUsuario(usuarioDTO);
    }

    @Override
    public UsuarioDTO readUsuario(Integer id) {
        Optional<Usuario> usuario = repository.findById(id);
        UsuarioDTO usuarioDTO = null;
        if(usuario.isPresent())
            usuarioDTO = mapper.convertValue(usuario, UsuarioDTO.class);
        return usuarioDTO;
    }

    @Override
    public void updateUsuario(UsuarioDTO usuarioDTO) {
        saveUsuario(usuarioDTO);
    }

    @Override
    public void deleteUsuario(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Set<UsuarioDTO> getAll() {
        List<Usuario> usuarios = repository.findAll();
        Set<UsuarioDTO> usuariosDTO = new HashSet<>();

        for(Usuario usuario:usuarios){
            usuariosDTO.add(mapper.convertValue(usuario, UsuarioDTO.class));
        }
        return usuariosDTO;
    }
     */

}

package com.dh.clinicaPinerosGarcia.service;

import com.dh.clinicaPinerosGarcia.model.Usuario;
import com.dh.clinicaPinerosGarcia.model.UsuarioRol;
import com.dh.clinicaPinerosGarcia.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    private IUsuarioRepository userRepository;

    @Autowired
    public DataLoader(IUsuarioRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password1 = passwordEncoder.encode("1234");
        userRepository.save(new Usuario("Rosa Piñeros", "rosa", "rosa@digital.com", password1, UsuarioRol.ADMIN));
    }

}


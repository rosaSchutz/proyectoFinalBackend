package com.dh.clinicaPinerosGarcia.repository;

import com.dh.clinicaPinerosGarcia.model.Domicilio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDomicilioRepository extends JpaRepository<Domicilio, Integer>{
}

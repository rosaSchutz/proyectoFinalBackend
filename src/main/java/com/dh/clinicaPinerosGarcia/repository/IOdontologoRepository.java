package com.dh.clinicaPinerosGarcia.repository;

import com.dh.clinicaPinerosGarcia.model.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOdontologoRepository extends JpaRepository<Odontologo, Integer>{
}

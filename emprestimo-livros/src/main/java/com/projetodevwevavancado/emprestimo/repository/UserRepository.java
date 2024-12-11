package com.projetodevwevavancado.emprestimo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.projetodevwevavancado.emprestimo.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	
//	UserDetails findByEmail(String email);
	
	@Query("SELECT u FROM UserEntity u WHERE u.email = :email")
	UserDetails findByEmail(@Param("email") String email);
	
	@Query("SELECT e FROM UserEntity e WHERE e.email = :email")
    Optional<UserEntity> findEntityByEmail(@Param("email") String email);
}

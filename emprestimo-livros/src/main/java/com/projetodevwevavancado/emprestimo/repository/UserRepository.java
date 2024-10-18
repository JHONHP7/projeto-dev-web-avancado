package com.projetodevwevavancado.emprestimo.repository;

import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

}

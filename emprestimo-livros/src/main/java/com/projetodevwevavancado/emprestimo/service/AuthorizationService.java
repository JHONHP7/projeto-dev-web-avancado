package com.projetodevwevavancado.emprestimo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.repository.UserRepository;

@Service
public class AuthorizationService implements UserDetailsService{

	@Autowired
	UserRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return repository.findByEmail(email);
	}

}

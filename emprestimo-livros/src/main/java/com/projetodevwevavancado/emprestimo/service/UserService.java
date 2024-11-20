package com.projetodevwevavancado.emprestimo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import com.projetodevwevavancado.emprestimo.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public UserResponseDTO userEntityToUserResponseDTO(UserEntity userEntity) {
		return modelMapper.map(userEntity, UserResponseDTO.class);
	}
	
	public List<UserResponseDTO> listAll(){
		List<UserEntity> entities = userRepository.findAll();
		
		return entities.stream()
				.map(this::userEntityToUserResponseDTO)
				.collect(Collectors.toList());
	}

}

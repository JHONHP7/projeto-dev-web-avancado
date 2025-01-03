package com.projetodevwevavancado.emprestimo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.projetodevwevavancado.emprestimo.api.dto.request.UserRequestDTO;
import com.projetodevwevavancado.emprestimo.api.dto.response.UserResponseDTO;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.DataNotFoundException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.EmailAlreadyExistsException;
import com.projetodevwevavancado.emprestimo.api.resource.handler.exceptions.ResourceNotFoundException;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;
import com.projetodevwevavancado.emprestimo.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	public UserResponseDTO userEntityToUserResponseDTO(UserEntity userEntity) {
		return modelMapper.map(userEntity, UserResponseDTO.class);
	}

	public List<UserResponseDTO> listAll() {
	    try {
	        List<UserEntity> entities = userRepository.findAll();
	        if (entities.isEmpty()) {
	            return List.of();
	        }
	        return entities.stream().map(this::convertToDTO).toList();
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new RuntimeException("Erro ao listar usuários: " + e.getMessage(), e);
	    }
	}


	private UserResponseDTO convertToDTO(UserEntity userEntity) {
	    return UserResponseDTO.builder()
	            .id(userEntity.getId())
	            .nome(userEntity.getNome())
	            .email(userEntity.getEmail())
	            .role(userEntity.getRole())
	            .build();
	}



	public Optional<UserEntity> findById(Long id) {
		return userRepository.findById(id);
	}

	public void deleteUser(Long id) {

		if (!userRepository.existsById(id)) {
			throw new DataNotFoundException("Usuário não encontrado para o ID: " + id);
		}
		userRepository.deleteById(id);
	}

	public UserResponseDTO updateUser(UserRequestDTO userRequest) {
		Long id = userRequest.getId();

		UserEntity existingUser = userRepository.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Usuário não encontrado para o ID: " + id));

		checkIfEmailIsAlreadyInUse(userRequest.getEmail(), id);

		Optional.ofNullable(userRequest.getEmail()).ifPresent(existingUser::setEmail);
	    Optional.ofNullable(userRequest.getRole()).ifPresent(existingUser::setRole);
	    Optional.ofNullable(userRequest.getNome()).ifPresent(existingUser::setNome);

		if (userRequest.getPassword() != null && !userRequest.getPassword().isBlank()) {
			String encryptedPassword = new BCryptPasswordEncoder().encode(userRequest.getPassword());
			existingUser.setSenha(encryptedPassword);
		}

		UserEntity updatedUser = userRepository.save(existingUser);

		return userEntityToUserResponseDTO(updatedUser);
	}

	private void checkIfEmailIsAlreadyInUse(String email, Long userId) {

		Optional<UserEntity> existingUser = userRepository.findEntityByEmail(email);
		if (existingUser.isPresent() && !existingUser.get().getId().equals(userId)) {
			throw new EmailAlreadyExistsException("O e-mail já está em uso por outro usuário.");
		}
	}
	
	public List<UserResponseDTO> findUserByEmail(String email) {

		String emailCorreto = "%" + email + "%";
	    
	    var users = userRepository.findUserByEmail(emailCorreto);

	    if (users == null || users.isEmpty()) {
	        throw new ResourceNotFoundException("Nenhum usuário encontrado com o e-mail fornecido: " + email);
	    }

	    return users.stream()
	            .map(user -> UserResponseDTO.builder()
	                    .id(user.getId())
	                    .nome(user.getNome())
	                    .email(user.getEmail())
	                    .role(user.getRole())
	                    .build())
	            .toList();
	}


	/**
	 * Conversões DTO/ENTITY
	 */


}


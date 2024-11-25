package com.projetodevwevavancado.emprestimo.configuration.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.projetodevwevavancado.emprestimo.entity.UserEntity;

@Service
public class TokenService {
	
	@Value("${api.security.token.secret}")
	private String secret;

	public String generateToken(UserEntity user) {
		
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("api-emprestimo-livro") //quem criou o token nome da aplicação
					.withSubject(user.getEmail()) //usuário que ta recebendo o token
					.withExpiresAt(genExpirationDate()) //tempo para o token expirar
					.sign(algorithm); //fazer a assinatura e geração final
			return token;
					
		} catch (JWTCreationException e) {
			throw new RuntimeException("Error while generationg token ", e);
		}
		
	}
	
	
	public String validateToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			return JWT.require(algorithm)
					.withIssuer("api-emprestimo-livro")
					.build()
					.verify(token)
					.getSubject();
			
		} catch (JWTCreationException e) {
			return "";
		}
	}
	
	
	/**
	 * Token vai ter 2 horas
	 * transformamos em um instante no tempo a partir
	 * de agr no fuso horário do nosso país
	 * @return
	 */
	private Instant genExpirationDate() {
		return LocalDateTime
				.now()
				.plusHours(2)
				.toInstant(ZoneOffset.of("-03:00"));
	}
}

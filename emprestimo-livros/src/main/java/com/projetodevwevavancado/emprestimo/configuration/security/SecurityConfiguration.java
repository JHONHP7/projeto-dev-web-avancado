package com.projetodevwevavancado.emprestimo.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	SecurityFilter filter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authorize -> authorize
						
						/**
						 * Configs de permissões de enpoints
						 */
						.requestMatchers(HttpMethod.POST, "/books").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET, "/books").hasRole("USER")
						.requestMatchers(HttpMethod.POST, "/books/save").hasRole("ADMIN")
						.requestMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST, "/users/update").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST, "/users/delete").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
						.requestMatchers(HttpMethod.POST,"/auth/register").permitAll()
						
						/**
						 * Configs do swagger
						 */
						.requestMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**", "/webjars/**").permitAll()
						
						/**
						 * Configs de qualquer outra requisição
						 */
						.anyRequest().authenticated())
				
				/**
				 * Config para verificar o token antes de verificar as roles
				 */
				.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passswordEncoder () {
		return new BCryptPasswordEncoder();
	}
	
	
}

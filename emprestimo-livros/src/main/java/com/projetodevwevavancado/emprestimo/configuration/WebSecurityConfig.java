package com.projetodevwevavancado.emprestimo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*") // permitir solicitações de todos os domínios
				.allowedMethods("GET", "POST", "PUT", "DELETE") // permitir métodos HTTP
				.allowedHeaders("*"); // permitir todos os cabeçalhos
	}
}

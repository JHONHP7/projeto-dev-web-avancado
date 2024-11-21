package com.projetodevwevavancado.emprestimo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("API de Empréstimos de Livros")
	                .version("1.0.0")
	                .description("Documentação da API de Empréstimos de Livros"))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                		.addSecuritySchemes("bearerAuth", new SecurityScheme()
                				.type(SecurityScheme.Type.HTTP)
                				.scheme("bearer")
                				.bearerFormat("JWT")));
    }
}


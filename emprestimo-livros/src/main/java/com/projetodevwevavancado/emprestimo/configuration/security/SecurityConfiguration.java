package com.projetodevwevavancado.emprestimo.configuration.security;

import java.util.Arrays;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfiguration {

    private final SecurityFilter filter;

    static final String ADMIN_ROLE = "ADMIN";

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize

                        // Configs de permissões de endpoints
                        .requestMatchers(HttpMethod.POST, "/books").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.GET, "/books").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/books/save").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.GET, "/users").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.POST, "/users/update").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.POST, "/users/delete").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.POST, "/users/**").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.POST, "/books").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/google-login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").hasRole(ADMIN_ROLE)
                        .requestMatchers(HttpMethod.GET, "/books/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/loans/renew/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/email/**").hasRole(ADMIN_ROLE)

                        // Configs do Swagger
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**", "/webjars/**").permitAll()

                        // Configs de qualquer outra requisição
                        .anyRequest().authenticated())
                
                		

                // Config para verificar o token antes de verificar as roles
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173","http://localhost:5174"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

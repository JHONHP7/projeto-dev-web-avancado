package com.projetodevwevavancado.emprestimo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

@Component
public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf().disable() // Desativa CSRF para simplificar. Pode ser configurado depois.
//
//            .headers().frameOptions().disable() // Libera o uso de frames (para o console H2)
//
//            .and()
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/admin/**").hasRole("ADMIN") // Rotas acessíveis apenas por administradores
//                .requestMatchers("/user/**").hasRole("USER") // Rotas acessíveis apenas por usuários padrão
//                
//                // Libera as URLs do Swagger
//                .requestMatchers(
//                    "/v3/api-docs/**",
//                    "/swagger-ui.html",
//                    "/swagger-ui/**",
//                    "/webjars/**"
//                ).permitAll()
//                
//                // Libera o console H2
//                .requestMatchers("/h2-console/**").permitAll()
//
//                // Libera rotas de API específicas para serem acessadas pelo Swagger e Postman
//                .requestMatchers("/**").permitAll()  // Exemplo de rota pública
//
//                .anyRequest().authenticated() // Qualquer outra requisição precisa estar autenticada
//            )
//            .formLogin() // Habilita formulário de login
//            .and()
//            .logout() // Configura logout
//            .permitAll();
//        
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
}

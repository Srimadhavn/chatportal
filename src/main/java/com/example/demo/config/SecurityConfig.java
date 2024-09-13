package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/**").permitAll()  // Allow access to API endpoints
                        .requestMatchers("/css/**", "/js/**", "/login.html", "/other-queries.html","/student-dashboard.html","/your-queries.html").permitAll()  // Allow access to static resources
                        .anyRequest().authenticated()  // Require authentication for all other requests
                        
                )
                .formLogin(form -> form
                        .loginPage("/login.html")  // Login page URL
                        .permitAll()
                )
                .logout(logout -> logout
                        .permitAll()
                )
                .exceptionHandling(exceptions -> exceptions
                        .accessDeniedPage("/login.html")  // Redirect to login on access denied
                );

        return http.build();
    }
}

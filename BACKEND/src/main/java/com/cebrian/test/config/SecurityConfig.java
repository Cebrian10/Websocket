package com.cebrian.test.config;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import javax.crypto.SecretKey;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecretKey secretKey() {
    return Jwts.SIG.HS256.key().build();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(aut -> aut.anyRequest().permitAll())
        .cors(cors -> cors.configurationSource(configurationSource()))
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return httpSecurity.build();
  }

  @Bean
  CorsConfigurationSource configurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOriginPatterns(Arrays.asList("**"));
    config.setAllowedMethods(Arrays.asList("*")); // "POST", "GET", "PUT", "DELETE"
    config.setAllowedHeaders(Arrays.asList("*")); // "Authorization", "Content-Type"+
    config.setExposedHeaders(Arrays.asList("File-Name"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
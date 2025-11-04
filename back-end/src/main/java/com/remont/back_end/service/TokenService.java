package com.remont.back_end.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.*;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.remont.back_end.model.User;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {

    @Value("${app.jwt.secret}") 
    private String jwtSecret;

    private static final long EXPIRATION_HOURS = 24;
    
    private static final String ISSUER = "remont-api";

    /**
     * Gera um novo token JWT para o usuário autenticado.
     */
    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

            Instant now = Instant.now();
            Instant expirationTime = now.plus(EXPIRATION_HOURS, ChronoUnit.HOURS);

            String token = JWT.create()
                    .withIssuer(ISSUER) 
                    .withSubject(user.getEmail()) 
                    .withClaim("role", user.getRole().name()) 
                    .withClaim("name", user.getName()) 
                    .withIssuedAt(now) 
                    .withExpiresAt(expirationTime) 
                    .sign(algorithm); 

            return token;

        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar o token JWT: " + exception.getMessage(), exception);
        }
    }

    /**
     * Valida um token e retorna o "subject" (email).
     * @param token O string completo do token JWT.
     * @return O e-mail do usuário se o token for válido.
     * @throws JWTVerificationException Se o token for inválido (expirado, assinatura errada).
     */
    public String validateTokenAndGetSubject(String token) throws JWTVerificationException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

            // Cria o objeto verificador com o mesmo issuer
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build();

            DecodedJWT jwt = verifier.verify(token);

            return jwt.getSubject();

        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Token inválido ou expirado", exception);
        }
    }
}
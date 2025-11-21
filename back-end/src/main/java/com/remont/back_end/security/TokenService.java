package com.remont.back_end.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
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
     * Gera um novo token JWT contendo ID, Email e Role.
     */
    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            Instant now = Instant.now();
            Instant expirationTime = now.plus(EXPIRATION_HOURS, ChronoUnit.HOURS);

            return JWT.create()
                    .withIssuer(ISSUER)
                    .withSubject(user.getEmail())
                    .withClaim("id", user.getId()) // CORREÇÃO: Usar "id" para bater com o Filtro
                    .withClaim("role", user.getRole().name())
                    .withClaim("name", user.getName())
                    .withIssuedAt(now)
                    .withExpiresAt(expirationTime)
                    .sign(algorithm);

        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    /**
     * Valida o token e retorna o objeto decodificado (para extrair claims).
     */
    public DecodedJWT validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build();

            return verifier.verify(token);

        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Token inválido ou expirado", exception);
        }
    }
}
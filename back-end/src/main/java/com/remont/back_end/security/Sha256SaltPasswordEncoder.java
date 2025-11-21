package com.remont.back_end.security;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Objects;

/**
 * Implementação de PasswordEncoder que atende ao requisito não-funcional RF120:
 * Criptografia usando Hash SHA-256 + SALT.
 *
 * Formato: salt_base64$hash_base64
 */
public class Sha256SaltPasswordEncoder implements PasswordEncoder {

    private static final int SALT_LENGTH = 16;
    private static final String HASH_ALGORITHM = "SHA-256";
    private static final String DELIMITER = "$";

    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Codifica a senha.
     * 1. Gera um salt aleatório.
     * 2. Hasheia a senha junto com o salt.
     * 3. Retorna "salt$hash" codificado em Base64.
     */
    @Override
    public String encode(CharSequence rawPassword) {
        Objects.requireNonNull(rawPassword, "A senha não pode ser nula");

        try {
            byte[] salt = new byte[SALT_LENGTH];
            secureRandom.nextBytes(salt);

            byte[] hash = hashPassword(rawPassword.toString(), salt);

            String saltBase64 = Base64.getEncoder().encodeToString(salt);
            String hashBase64 = Base64.getEncoder().encodeToString(hash);

            return saltBase64 + DELIMITER + hashBase64;

        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Algoritmo de hash '" + HASH_ALGORITHM + "' não encontrado", e);
        }
    }

    /**
     * Verifica se a senha crua (digitada) corresponde à senha codificada (do banco).
     * 1. Separa o salt e o hash da senha codificada.
     * 2. Hasheia a senha crua usando o salt extraído.
     * 3. Compara o novo hash com o hash extraído em tempo constante.
     */
    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword == null || encodedPassword.isEmpty()) {
            return false;
        }

        String[] parts = encodedPassword.split("\\" + DELIMITER);
        if (parts.length != 2) {
            return false;
        }

        try {
            byte[] salt = Base64.getDecoder().decode(parts[0]);
            byte[] expectedHash = Base64.getDecoder().decode(parts[1]);

            byte[] actualHash = hashPassword(rawPassword.toString(), salt);

            return MessageDigest.isEqual(expectedHash, actualHash);

        } catch (IllegalArgumentException | NoSuchAlgorithmException e) {
            return false;
        }
    }

    /**
     * Função utilitária para gerar o hash SHA-256.
     * Ela hasheia o salt primeiro, depois a senha.
     */
    private byte[] hashPassword(String rawPassword, byte[] salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance(HASH_ALGORITHM); 
        
        md.update(salt); 
        
        byte[] hash = md.digest(rawPassword.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        
        return hash;
    }
}
package com.remont.back_end.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Exceção customizada para quando um recurso não é encontrado.
// O @ResponseStatus faz o Spring retornar um erro 404 (Not Found) automaticamente.
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

    // Construtor que aceita uma mensagem de erro
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
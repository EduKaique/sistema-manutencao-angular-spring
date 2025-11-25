package com.remont.back_end.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exceção personalizada para operações relacionadas a MaintenanceRecord.
 * 
 * Esta exceção é lançada quando ocorrem erros específicos durante o processamento
 * de registros de manutenção, como:
 * - Dados inválidos fornecidos
 * - Violação de regras de negócio específicas de manutenção
 * - Inconsistências nos dados do registro
 * - Tentativa de operação em estado inválido
 * 
 * A anotação @ResponseStatus faz com que o Spring retorne automaticamente
 * um código HTTP 400 (Bad Request) quando esta exceção for lançada em um controller.
 * 
 * @author Sistema de Manutenção
 * @version 1.0
 * @since 2025-11-25
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class MaintenanceRecordException extends RuntimeException {
    
    /**
     * Identificador único para serialização da classe.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Construtor padrão que aceita apenas uma mensagem de erro.
     * 
     * Exemplo de uso:
     * <pre>
     * throw new MaintenanceRecordException("Descrição da manutenção não pode estar vazia");
     * </pre>
     * 
     * @param message Mensagem descritiva do erro ocorrido
     */
    public MaintenanceRecordException(String message) {
        super(message);
    }
     
    /**
     * Construtor que aceita uma mensagem de erro e a causa raiz da exceção.
     * 
     * Este construtor é útil quando você quer encapsular outra exceção,
     * mantendo a rastreabilidade da causa original do erro.
     * 
     * Exemplo de uso:
     * <pre>
     * try {
     *     // operação que pode falhar
     * } catch (Exception e) {
     *     throw new MaintenanceRecordException("Erro ao processar manutenção", e);
     * }
     * </pre>
     * 
     * @param message Mensagem descritiva do erro ocorrido
     * @param cause A exceção original que causou este erro
     */
    public MaintenanceRecordException(String message, Throwable cause) {
        super(message, cause);
    }
}

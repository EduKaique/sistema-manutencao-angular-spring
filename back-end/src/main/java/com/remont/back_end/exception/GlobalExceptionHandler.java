// package com.remont.back_end.exception;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.validation.FieldError;
// import org.springframework.web.bind.MethodArgumentNotValidException;
// import org.springframework.web.bind.annotation.ExceptionHandler;
// import org.springframework.web.bind.annotation.RestControllerAdvice;
// import org.springframework.web.context.request.WebRequest;
// import org.springframework.web.server.ResponseStatusException;

// import java.time.LocalDateTime;
// import java.util.HashMap;
// import java.util.Map;

// /**
//  * Manipulador global de exceções para a aplicação.
//  * Centraliza o tratamento de erros e fornece respostas padronizadas.
//  * 
//  * @author Maria Eduarda Ferreira
//  * @version 1.0
//  * @since 2025-11-25
//  */
// @RestControllerAdvice
// public class GlobalExceptionHandler {

//     /**
//      * Trata exceções de recursos não encontrados.
//      * Retorna HTTP 404 NOT FOUND.
//      */
//     @ExceptionHandler(ResourceNotFoundException.class)
//     public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
//             ResourceNotFoundException ex, WebRequest request) {
        
//         ErrorResponse errorResponse = new ErrorResponse(
//                 LocalDateTime.now(),
//                 HttpStatus.NOT_FOUND.value(),
//                 "Recurso não encontrado",
//                 ex.getMessage(),
//                 request.getDescription(false)
//         );
        
//         return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
//     }

//     /**
//      * Trata exceções de validação de argumentos.
//      * Retorna HTTP 400 BAD REQUEST com detalhes dos campos inválidos.
//      */
//     @ExceptionHandler(MethodArgumentNotValidException.class)
//     public ResponseEntity<ErrorResponse> handleValidationExceptions(
//             MethodArgumentNotValidException ex, WebRequest request) {
        
//         Map<String, String> errors = new HashMap<>();
//         ex.getBindingResult().getAllErrors().forEach((error) -> {
//             String fieldName = ((FieldError) error).getField();
//             String errorMessage = error.getDefaultMessage();
//             errors.put(fieldName, errorMessage);
//         });
        
//         ErrorResponse errorResponse = new ErrorResponse(
//                 LocalDateTime.now(),
//                 HttpStatus.BAD_REQUEST.value(),
//                 "Erro de validação",
//                 "Campos inválidos: " + errors.toString(),
//                 request.getDescription(false)
//         );
        
//         return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//     }

//     /**
//      * Trata exceções de autenticação.
//      * Retorna HTTP 401 UNAUTHORIZED.
//      */
//     @ExceptionHandler({BadCredentialsException.class, AuthenticationException.class})
//     public ResponseEntity<ErrorResponse> handleAuthenticationException(
//             Exception ex, WebRequest request) {
        
//         ErrorResponse errorResponse = new ErrorResponse(
//                 LocalDateTime.now(),
//                 HttpStatus.UNAUTHORIZED.value(),
//                 "Falha na autenticação",
//                 "Credenciais inválidas ou token expirado",
//                 request.getDescription(false)
//         );
        
//         return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
//     }

//     /**
//      * Trata exceções de resposta com status HTTP específico.
//      * Retorna o status HTTP definido na exceção.
//      */
//     @ExceptionHandler(ResponseStatusException.class)
//     public ResponseEntity<ErrorResponse> handleResponseStatusException(
//             ResponseStatusException ex, WebRequest request) {
        
//         ErrorResponse errorResponse = new ErrorResponse(
//                 LocalDateTime.now(),
//                 ex.getStatusCode().value(),
//                 "Erro na requisição",
//                 ex.getReason() != null ? ex.getReason() : "Erro desconhecido",
//                 request.getDescription(false)
//         );
        
//         return new ResponseEntity<>(errorResponse, ex.getStatusCode());
//     }

//     /**
//      * Trata exceções genéricas não mapeadas.
//      * Retorna HTTP 500 INTERNAL SERVER ERROR.
//      */
//     @ExceptionHandler(Exception.class)
//     public ResponseEntity<ErrorResponse> handleGlobalException(
//             Exception ex, WebRequest request) {
        
//         ErrorResponse errorResponse = new ErrorResponse(
//                 LocalDateTime.now(),
//                 HttpStatus.INTERNAL_SERVER_ERROR.value(),
//                 "Erro interno do servidor",
//                 ex.getMessage(),
//                 request.getDescription(false)
//         );
        
//         return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     /**
//      * Classe interna para representar a estrutura de resposta de erro.
//      * Fornece informações detalhadas sobre o erro ocorrido.
//      */
//     public static class ErrorResponse {
//         private LocalDateTime timestamp;
//         private int status;
//         private String error;
//         private String message;
//         private String path;

//         public ErrorResponse(LocalDateTime timestamp, int status, String error, 
//                            String message, String path) {
//             this.timestamp = timestamp;
//             this.status = status;
//             this.error = error;
//             this.message = message;
//             this.path = path;
//         }

//         // Getters
//         public LocalDateTime getTimestamp() { return timestamp; }
//         public int getStatus() { return status; }
//         public String getError() { return error; }
//         public String getMessage() { return message; }
//         public String getPath() { return path; }

//         // Setters
//         public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
//         public void setStatus(int status) { this.status = status; }
//         public void setError(String error) { this.error = error; }
//         public void setMessage(String message) { this.message = message; }
//         public void setPath(String path) { this.path = path; }
//     }
// }

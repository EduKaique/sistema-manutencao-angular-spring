package com.remont.back_end.exception;

// import java.io.Serial;
// import java.time.LocalDateTime;
// import java.util.Objects;

// public class Exception extends RuntimeException {
//     @Serial
//     private static final long serialVersionUID = 1L;
    
//     private String mensagem;
//     private int codigo;
//     private LocalDateTime dataHora;
//     private String detalhes;
//     private StackTraceElement[] stackTrace;
    
//     public Exception() {
//         super();
//         this.dataHora = LocalDateTime.now();
//         this.codigo = 500;
//     }
    
//     public Exception(String mensagem) {
//         super(mensagem);
//         this.mensagem = mensagem;
//         this.dataHora = LocalDateTime.now();
//         this.codigo = 500;
//     }
    
//     public Exception(String mensagem, int codigo) {
//         super(mensagem);
//         this.mensagem = mensagem;
//         this.codigo = codigo;
//         this.dataHora = LocalDateTime.now();
//     }
    
//     public Exception(String mensagem, Throwable causa) {
//         super(mensagem, causa);
//         this.mensagem = mensagem;
//         this.dataHora = LocalDateTime.now();
//         this.codigo = 500;
//     }
    
//     public Exception(String mensagem, int codigo, String detalhes) {
//         super(mensagem);
//         this.mensagem = mensagem;
//         this.codigo = codigo;
//         this.detalhes = detalhes;
//         this.dataHora = LocalDateTime.now();
//     }
    
//     public String getMensagem() {
//         return mensagem;
//     }
    
//     public void setMensagem(String mensagem) {
//         this.mensagem = mensagem;
//     }
    
//     public int getCodigo() {
//         return codigo;
//     }
    
//     public void setCodigo(int codigo) {
//         this.codigo = codigo;
//     }
    
//     public LocalDateTime getDataHora() {
//         return dataHora;
//     }
    
//     public void setDataHora(LocalDateTime dataHora) {
//         this.dataHora = dataHora;
//     }
    
//     public String getDetalhes() {
//         return detalhes;
//     }
    
//     public void setDetalhes(String detalhes) {
//         this.detalhes = detalhes;
//     }
    
//     @Override
//     public String toString() {
//         return "Exception{" +
//                 "mensagem='" + mensagem + '\'' +
//                 ", codigo=" + codigo +
//                 ", dataHora=" + dataHora +
//                 ", detalhes='" + detalhes + '\'' +
//                 '}';
//     }
// }

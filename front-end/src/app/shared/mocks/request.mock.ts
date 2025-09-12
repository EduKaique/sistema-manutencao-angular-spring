import {Request} from '../models/request'

export const REQUESTS: Request[] = [
    {
        id: 1, 
        nome_equipamento: "Notebook Dell Inspiron 15", 
        descrição_equipamento: "O equipamento liga, mas a tela permanece preta (sem imagem). O LED indicador de energia acende e é possível ouvir o som da ventoinha em funcionamento, mas não há qualquer sinal de vídeo. O problema persiste mesmo após reiniciar o dispositivo várias vezes.", 
        data_solicitação: new Date("2025-09-04T10:30:00"), 
        status_id: 1, 
        categoria_id: 2, 
        cliente_id: 1, 
        funcionario_id: 2
    }
]
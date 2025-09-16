import {Request} from '../models/request'

export const REQUESTS: Request[] = [
    {
        id: 1, 
        equipmentName: "Notebook Dell Inspiron 15", 
        equipmentDescription: "O equipamento liga, mas a tela permanece preta (sem imagem). O LED indicador de energia acende e é possível ouvir o som da ventoinha em funcionamento, mas não há qualquer sinal de vídeo. O problema persiste mesmo após reiniciar o dispositivo várias vezes.", 
        requestDate: new Date("2025-09-04T10:30:00"), 
        statusId: 1, 
        categoryId: 2, 
        clientId: 1, 
        employeeId: 2
    }
]
export interface RequestHistory {
    id?: number;
    titulo: string;
    dataSolicitacao: Date | string;
    solicitacaoId: number;
    usuarioId: number;
    statusId: number;

    // Propriedades de compatibilidade (manter existentes)
    title?: string;
    date?: Date;
    requestId?: number;
    userId?: number;
}
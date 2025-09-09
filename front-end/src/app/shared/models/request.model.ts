export class Request {
    constructor(
        public id: number = 0,
        public equipamento: string = "",
        public categoria: string = "",
        public dataCriacao: string = "",
        public ultimaAtualizacao: string = "",
        public descricaoDefeito: string = "",
        public status: string = "",
    ) {

    }
}

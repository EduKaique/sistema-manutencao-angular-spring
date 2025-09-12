export class Request {
    constructor(
        public id: string = "",
        public equipamento: string = "",
        public categoria: string = "",
        public dataCriacao: string = "",
        public ultimaAtualizacao: string = "",
        public descricaoDefeito: string = "",
        public status: string = "",
    ) {

    }
}

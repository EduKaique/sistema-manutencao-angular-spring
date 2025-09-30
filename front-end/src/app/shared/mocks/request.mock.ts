import {Request} from '../models/request'

export const REQUESTS: Request[] = [
    { id: 101, equipmentName: 'Monitor Dell U2721DE', equipmentDescription: 'Tela piscando', requestDate: new Date(), statusId: 1, category: 'Hardware', categoryId: 1, clientId: 1, employeeId: 1 },
    { id: 102, equipmentName: 'Notebook HP EliteBook', equipmentDescription: 'Precisa da suíte completa', requestDate: new Date(), statusId: 1, category: 'Software', categoryId: 2, clientId: 2, employeeId: 1 },
    { id: 103, equipmentName: 'MacBook Pro 14"', equipmentDescription: 'Tecla "A" não funciona', requestDate: new Date(), statusId: 2, category: 'Hardware', categoryId: 1, clientId: 3, employeeId: 2 },
    { id: 104, equipmentName: 'HP LaserJet Pro M404dn', equipmentDescription: 'Não imprime a partir da rede', requestDate: new Date(), statusId: 4, category: 'Rede', categoryId: 3, clientId: 1, employeeId: 2 },
    { id: 105,  equipmentName: 'Desktop Dell Vostro', equipmentDescription: 'Aumentar de 8GB para 16GB', requestDate: new Date(), statusId: 2, category: 'Hardware', categoryId: 1, clientId: 4, employeeId: 1 },
    { id: 106, equipmentName: 'N/A', equipmentDescription: 'Nobreak para servidor principal', requestDate: new Date(), statusId: 3, category: 'Cotação', categoryId: 4, clientId: 2, employeeId: 2 },
    { id: 107, equipmentName: 'Notebook Lenovo ThinkPad', equipmentDescription: 'Sistema operacional corrompido', requestDate: new Date(), statusId: 6, category: 'Software', categoryId: 2, clientId: 5, employeeId: 1 },
    { id: 108, equipmentName: 'Roteador Cisco', equipmentDescription: 'Permitir acesso remoto seguro', requestDate: new Date(), statusId: 8, category: 'Rede', categoryId: 3, clientId: 3, employeeId: 2 },
]
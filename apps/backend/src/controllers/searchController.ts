/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import { searchService } from "../services/searchService";

export async function getAllItems(req: Request, res: Response) { // Adicionado async
    try {
        const service = searchService();
        const all = await service.getAll(); // Adicionado await e chamada ao método .getAll()
        
        res.status(200).json(all);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar itens' }); // Mensagem corrigida (estava 'deletar usuário')
    }
}
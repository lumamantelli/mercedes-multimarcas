/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import {
  atualizarCarro,
  criarCarro,
  deletarCarro,
  listarCarroPorId,
  listarCarros,
  listarCarrosPorUsuario,
} from '../services/carroService';
import CriarCarroInput from '../interfaces/carroInterface';
import { TipoVeiculo } from '../utils/multer';

export async function getCarros(req: Request, res: Response) {
  try {
    const carros = await listarCarros();
    res.status(200).json(carros);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Safe access to `.message`
    } else {
      console.error('An unknown error occurred');
      res.status(500).json({ message: 'Erro ao buscar carros' });
    }
  }
}

export async function getCarroPorUsuario(req: Request, res: Response) {
  const { usuarioId } = req.params;
  try {
    const carros = await listarCarrosPorUsuario(usuarioId);
    res.status(200).json(carros);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Safe access to `.message`
    } else {
      console.error('An unknown error occurred');
      res.status(500).json({ message: 'Erro ao buscar carros' });
    }
  }
}

export async function getCarroPorId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const carros = await listarCarroPorId(id);
    res.status(200).json(carros);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Safe access to `.message`
    } else {
      console.error('An unknown error occurred');
      res.status(500).json({ message: 'Erro ao buscar carros' });
    }
  }
}

export async function postCarro(req: Request, res: Response) {
  try {
    const carro = await criarCarro(req.body as CriarCarroInput);
    res.status(201).json(carro);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    res.status(500).json({ message: 'Erro ao criar carro' });
  }
}

export async function deleteCarro(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const carroDeletado = await deletarCarro(id);
    res.status(200).json(carroDeletado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    res.status(500).json({ message: 'Erro ao deletar carro' });
  }
}

export async function putCarro(req: Request, res: Response) {
  const { id } = req.params;
  const { data } = req.body as { data: CriarCarroInput };
  try {
    const carroAtualizado = await atualizarCarro(id, data);
    res.status(200).json(carroAtualizado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    res.status(500).json({ message: 'Erro ao atualizar carro' });
  }
}

// Função para upload de uma única foto de carro
export function uploadFotoCarro(req: Request, res: Response) {
  try {
    // Middleware do multer já processou o upload
    const arquivo = req.file;
    
    if (!arquivo) {
      return res.status(400).json({
        error: 'Nenhum arquivo foi enviado'
      });
    }

    // Retornar informações do arquivo salvo
    res.status(200).json({
      message: 'Foto do carro enviada com sucesso!',
      arquivo: {
        nomeOriginal: arquivo.originalname,
        nomeArquivo: arquivo.filename,
        tamanho: arquivo.size,
        tipo: arquivo.mimetype,
        pasta: 'uploads/Carro',
        caminhoCompleto: arquivo.path
      }
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro no upload da foto do carro:', error.message);
      res.status(500).json({
        error: 'Erro interno no upload da foto',
        details: error.message
      });
    } else {
      console.error('Erro desconhecido no upload:', error);
      res.status(500).json({
        error: 'Erro desconhecido no upload'
      });
    }
  }
}

// Função para upload de múltiplas fotos de carro
export function uploadMultiplasFotosCarro(req: Request, res: Response) {
  try {
    const arquivos = req.files as Express.Multer.File[];
    
    if (!arquivos || arquivos.length === 0) {
      return res.status(400).json({
        error: 'Nenhum arquivo foi enviado'
      });
    }

    // Processar informações de todos os arquivos
    const arquivosProcessados = arquivos.map(arquivo => ({
      nomeOriginal: arquivo.originalname,
      nomeArquivo: arquivo.filename,
      tamanho: arquivo.size,
      tipo: arquivo.mimetype,
      pasta: 'uploads/Carro',
      caminhoCompleto: arquivo.path
    }));

    res.status(200).json({
      message: `${arquivos.length} foto(s) do carro enviada(s) com sucesso!`,
      arquivos: arquivosProcessados,
      total: arquivos.length
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro no upload múltiplo de fotos do carro:', error.message);
      res.status(500).json({
        error: 'Erro interno no upload das fotos',
        details: error.message
      });
    } else {
      console.error('Erro desconhecido no upload múltiplo:', error);
      res.status(500).json({
        error: 'Erro desconhecido no upload'
      });
    }
  }
}

// Middleware para configurar o tipo de veículo como carro
export const configurarTipoCarro = (req: Request, res: Response, next: () => void) => {
  (req.body as { tipoVeiculo?: TipoVeiculo }).tipoVeiculo = 'carro' as TipoVeiculo;
  console.log('🚗 Tipo de veículo configurado: carro');
  next();
};

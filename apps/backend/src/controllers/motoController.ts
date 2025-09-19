/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import {
  atualizarMoto,
  criarMoto,
  deletarMoto,
  listarMotos,
  listarMotosPorUsuario,
} from '../services/motoService';
import CriarMotoInput from '../interfaces/motoInterface';
import { TipoVeiculo } from '../utils/multer';

export async function getMotos(req: Request, res: Response) {
  try {
    const motos = await listarMotos();
    res.status(200).json(motos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Safe access to `.message`
    } else {
      console.error('An unknown error occurred');
    }
  }
}

export async function getMotoPorUsuario(req: Request, res: Response) {
  const { usuarioId } = req.params;
  try {
    const motos = await listarMotosPorUsuario(usuarioId);
    res.status(200).json(motos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Safe access to `.message`
    } else {
      console.error('An unknown error occurred');
    }
  }
}

export async function postMoto(req: Request, res: Response) {
  try {
    const moto = await criarMoto(req.body as CriarMotoInput);
    res.status(201).json(moto);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao buscar motos:', error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error('Erro desconhecido ao buscar motos:', error);
      res.status(400).json({ error: 'Erro desconhecido ao buscar motos' });
    }
  }
}

export async function deleteMoto(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const motoDeletada = await deletarMoto(id);
    res.status(200).json(motoDeletada);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Safe access to `.message`
    } else {
      console.error('An unknown error occurred');
    }
  }
}

export async function putMoto(req: Request, res: Response) {
  const { id } = req.params;
  const { data } = req.body as { data: CriarMotoInput };
  try {
    const motoAtualizada = await atualizarMoto(id, data);
    res.status(200).json(motoAtualizada);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Safe access to `.message`
    } else {
      console.error('An unknown error occurred');
    }
  }
}

// Função para upload de uma única foto de moto
export function uploadFotoMoto(req: Request, res: Response) {
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
      message: 'Foto da moto enviada com sucesso!',
      arquivo: {
        nomeOriginal: arquivo.originalname,
        nomeArquivo: arquivo.filename,
        tamanho: arquivo.size,
        tipo: arquivo.mimetype,
        pasta: 'uploads/Moto',
        caminhoCompleto: arquivo.path
      }
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro no upload da foto da moto:', error.message);
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

// Função para upload de múltiplas fotos de moto
export function uploadMultiplasFotosMoto(req: Request, res: Response) {
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
      pasta: 'uploads/Moto',
      caminhoCompleto: arquivo.path
    }));

    res.status(200).json({
      message: `${arquivos.length} foto(s) da moto enviada(s) com sucesso!`,
      arquivos: arquivosProcessados,
      total: arquivos.length
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro no upload múltiplo de fotos da moto:', error.message);
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

// Middleware para configurar o tipo de veículo como moto
export const configurarTipoMoto = (req: Request, res: Response, next: () => void) => {
  (req.body as { tipoVeiculo?: TipoVeiculo }).tipoVeiculo = 'moto' as TipoVeiculo;
  console.log('🏍️ Tipo de veículo configurado: moto');
  next();
};

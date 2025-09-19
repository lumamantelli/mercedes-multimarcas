/* eslint-disable prettier/prettier */
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

// Tipos permitidos para upload
export type TipoVeiculo = 'carro' | 'moto';

// Interface para o arquivo com tipo de veículo
interface MulterFile extends Express.Multer.File {
  tipoVeiculo?: TipoVeiculo;
}

// Interface para a requisição com tipo de veículo
interface MulterRequest extends Request {
  body: {
    tipoVeiculo?: TipoVeiculo;
    [key: string]: any;
  };
}

// Função para criar diretórios se não existirem
const criarDiretorioSeNaoExistir = (diretorio: string): void => {
  if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio, { recursive: true });
    console.log(`📁 Diretório criado: ${diretorio}`);
  }
};

// Configuração de armazenamento do multer
const storage = multer.diskStorage({
  destination: (req: MulterRequest, file: MulterFile, cb) => {
    try {
      // Diretório base de uploads
      const baseDir = path.join(process.cwd(), 'uploads');
      criarDiretorioSeNaoExistir(baseDir);

      // Determinar tipo de veículo do body da requisição
      const tipoVeiculo = req.body.tipoVeiculo?.toLowerCase() as TipoVeiculo;
      
      let tipoDir: string;
      
      // Definir pasta baseada no tipo de veículo
      switch (tipoVeiculo) {
        case 'carro':
          tipoDir = path.join(baseDir, 'Carro');
          break;
        case 'moto':
          tipoDir = path.join(baseDir, 'Moto');
          break;
        default:
          // Se não especificado, usar pasta geral
          tipoDir = path.join(baseDir, 'Geral');
          console.warn(`⚠️ Tipo de veículo não especificado, salvando em: ${tipoDir}`);
          break;
      }

      // Criar diretório do tipo de veículo
      criarDiretorioSeNaoExistir(tipoDir);
      
      // Salvar tipo no arquivo para usar no filename
      file.tipoVeiculo = tipoVeiculo;
      
      console.log(`📸 Salvando imagem em: ${tipoDir}`);
      cb(null, tipoDir);
      
    } catch (error) {
      console.error('❌ Erro ao definir destino do arquivo:', error);
      cb(error as Error, '');
    }
  },
  
  filename: (req: MulterRequest, file: MulterFile, cb) => {
    try {
      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const randomNum = Math.round(Math.random() * 1000);
      const fileExtension = path.extname(file.originalname);
      const tipoVeiculo = file.tipoVeiculo || 'geral';
      
      // Nome do arquivo: tipo_timestamp_random.extensao
      const filename = `${tipoVeiculo}_${timestamp}_${randomNum}${fileExtension}`;
      
      console.log(`📝 Nome do arquivo gerado: ${filename}`);
      cb(null, filename);
      
    } catch (error) {
      console.error('❌ Erro ao gerar nome do arquivo:', error);
      cb(error as Error, '');
    }
  }
});

// Filtro para validar tipos de arquivo
const fileFilter = (req: MulterRequest, file: MulterFile, cb: multer.FileFilterCallback) => {
  // Tipos de imagem permitidos
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  // Extensões permitidas
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
    console.log(`✅ Arquivo aceito: ${file.originalname}`);
    cb(null, true);
  } else {
    console.log(`❌ Arquivo rejeitado: ${file.originalname} - Tipo: ${file.mimetype}`);
    cb(new Error(`Tipo de arquivo não permitido. Use apenas: ${allowedExtensions.join(', ')}`));
  }
};

// Configuração principal do multer
export const uploadConfig = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limite por arquivo
    files: 10 // Máximo 10 arquivos por upload
  }
});

// Middleware para upload único
export const uploadSingle = (fieldName: string = 'foto') => {
  return uploadConfig.single(fieldName);
};

// Middleware para múltiplos uploads
export const uploadMultiple = (fieldName: string = 'fotos', maxCount: number = 5) => {
  return uploadConfig.array(fieldName, maxCount);
};

// Middleware para campos múltiplos
export const uploadFields = (fields: { name: string; maxCount: number }[]) => {
  return uploadConfig.fields(fields);
};

// Função auxiliar para obter caminho completo do arquivo
export const obterCaminhoCompleto = (nomeArquivo: string, tipoVeiculo: TipoVeiculo): string => {
  const baseDir = path.join(process.cwd(), 'uploads');
  const tipoDir = tipoVeiculo === 'carro' ? 'Carro' : 
                  tipoVeiculo === 'moto' ? 'Moto' : 'Geral';
  return path.join(baseDir, tipoDir, nomeArquivo);
};

// Função para deletar arquivo
export const deletarArquivo = (nomeArquivo: string, tipoVeiculo: TipoVeiculo): boolean => {
  try {
    const caminhoCompleto = obterCaminhoCompleto(nomeArquivo, tipoVeiculo);
    
    if (fs.existsSync(caminhoCompleto)) {
      fs.unlinkSync(caminhoCompleto);
      console.log(`🗑️ Arquivo deletado: ${caminhoCompleto}`);
      return true;
    } else {
      console.warn(`⚠️ Arquivo não encontrado para deletar: ${caminhoCompleto}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao deletar arquivo:', error);
    return false;
  }
};

// Função para verificar se arquivo existe
export const arquivoExiste = (nomeArquivo: string, tipoVeiculo: TipoVeiculo): boolean => {
  const caminhoCompleto = obterCaminhoCompleto(nomeArquivo, tipoVeiculo);
  return fs.existsSync(caminhoCompleto);
};

// Middleware de tratamento de erros para multer
export const tratarErroMulter = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          error: 'Arquivo muito grande. Tamanho máximo: 5MB'
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          error: 'Muitos arquivos. Máximo permitido: 10 arquivos'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          error: 'Campo de arquivo inesperado'
        });
      default:
        return res.status(400).json({
          error: `Erro no upload: ${error.message}`
        });
    }
  }
  
  // Outros erros
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message || 'Erro desconhecido no upload'
    });
  }
  
  next();
};

console.log('🚀 Configuração do Multer carregada com sucesso!');
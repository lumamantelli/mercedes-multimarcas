/* eslint-disable prettier/prettier */
import { Router } from 'express';
import {
  deleteMoto,
  getMotoPorUsuario,
  getMotos,
  postMoto,
  putMoto,
  uploadFotoMoto,
  uploadMultiplasFotosMoto,
  configurarTipoMoto,
} from '../controllers/motoController';
import { uploadSingle, uploadMultiple, tratarErroMulter } from "../utils/multer";

const router = Router();

// Rotas básicas de motos
router.get('/motos', getMotos);
router.get('/motos/:usuarioId', getMotoPorUsuario);
router.post('/moto', postMoto);
router.delete('/motos/:id', deleteMoto);
router.put('/motos/:id', putMoto);

// Rotas para upload de fotos de motos
router.post("/motos/upload/foto", 
  configurarTipoMoto,            // Middleware para definir tipo como 'moto'
  uploadSingle('foto'),          // Middleware do multer para um arquivo
  uploadFotoMoto                 // Controller para processar o upload
);

router.post("/motos/upload/fotos", 
  configurarTipoMoto,            // Middleware para definir tipo como 'moto'
  uploadMultiple('fotos', 5),    // Middleware do multer para múltiplos arquivos (máx 5)
  uploadMultiplasFotosMoto       // Controller para processar múltiplos uploads
);

// Middleware de tratamento de erros para todas as rotas de upload
router.use(tratarErroMulter);

export default router;

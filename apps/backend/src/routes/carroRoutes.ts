/* eslint-disable prettier/prettier */
import { Router } from "express";
import { deleteCarro, getCarroPorId, getCarroPorUsuario, getCarros, postCarro, putCarro, uploadFotoCarro, uploadMultiplasFotosCarro, configurarTipoCarro } from "../controllers/carroController";
import { uploadSingle, uploadMultiple, tratarErroMulter } from "../utils/multer";

const route = Router();

// Rotas básicas de carros
route.get("/carros", getCarros);
route.get("/carros/:id", getCarroPorId);
route.get("/carros/:usuarioId", getCarroPorUsuario);
route.post("/carros", postCarro);
route.delete("/carros/:id", deleteCarro);
route.put("/carros/:id", putCarro);

// Rotas para upload de fotos de carros
route.post("/carros/upload/foto", 
  configurarTipoCarro,           // Middleware para definir tipo como 'carro'
  uploadSingle('foto'),          // Middleware do multer para um arquivo
  uploadFotoCarro                // Controller para processar o upload
);

route.post("/carros/upload/fotos", 
  configurarTipoCarro,           // Middleware para definir tipo como 'carro'
  uploadMultiple('fotos', 5),    // Middleware do multer para múltiplos arquivos (máx 5)
  uploadMultiplasFotosCarro      // Controller para processar múltiplos uploads
);

// Middleware de tratamento de erros para todas as rotas de upload
route.use(tratarErroMulter);

export default route;
'use client';

import { api } from '@/lib/apis/carroApi';
import { useState } from 'react';

// Tipos baseados no seu schema.prisma
type TipoVeiculo = 'carro' | 'moto' | 'caminhao' | 'maquina' | '';

export default function VeiculoConfPage() {
  const [tipo, setTipo] = useState<TipoVeiculo>('');
  const [loading, setLoading] = useState(false);
  const [imagens, setImagens] = useState<File[]>([]);
const [previews, setPreviews] = useState<string[]>([]);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const filesArray = Array.from(e.target.files);
    setImagens((prev) => [...prev, ...filesArray]);

    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }
};
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const formDataToSend = new FormData();
  
  // 1. Adicionar campos de texto
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  
  Object.keys(data).forEach(key => {
    formDataToSend.append(key, data[key]);
  });

  // 2. Adicionar as imagens
  imagens.forEach((file) => {
    formDataToSend.append('fotos', file);
  });

  try {
    let url = '';                  
    if (tipo === 'carro') {
     let url = api.carros;
    } else if (tipo === 'moto') {
     let url = api.motos;
    } else if (tipo === 'caminhao') {
     let url = api.caminhoes;
    } else if (tipo === 'maquina') {
     let url = api.maquinas;
    }
    const response = await fetch(url, {
      method: 'POST',
      // Não defina Content-Type manualmente ao usar FormData com arquivos!
      body: formDataToSend,
    });

    if (response.ok) {
        alert("Veículo e imagens cadastrados!");
        // Limpar estados
        setImagens([]);
        setPreviews([]);
        form.reset();
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="w-full px-20 p-4">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Cadastrar Novo Veículo</h1>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">Selecione o Tipo de Veículo</label>
        <select 
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={(e) => setTipo(e.target.value as TipoVeiculo)}
          value={tipo}
        >
          <option value="">Selecione...</option>
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
          <option value="caminhao">Caminhão</option>
          <option value="maquina">Máquina Agrícola</option>
        </select>
      </div>

      {tipo && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campos Comuns a todos os veículos no seu Schema [cite: 8, 9, 11, 13, 16] */}
          <div className="col-span-full font-semibold border-b pb-2">Informações Gerais</div>
          <input name="marca" placeholder="Marca" required className="input-style p-1 border-[1px] rounded-md" />
          <input name="modelo" placeholder="Modelo" required className="input-style p-1 border-[1px] rounded-md" />
          <input name="ano" type="number" placeholder="Ano" required className="input-style p-1 border-[1px] rounded-md" />
          <input name="preco" type="number" step="0.01" placeholder="Preço" required className="input-style p-1 border-[1px] rounded-md" />
          <input name="cidade" placeholder="Cidade" required className="input-style p-1 border-[1px] rounded-md" />
          <input name="estado" placeholder="Estado (Ex: MT)" required className="input-style p-1 border-[1px] rounded-md" />
          <input name="quilometragem" type="number" placeholder="Quilometragem" required className="input-style p-1 border-[1px] rounded-md" />
          
          {/* Campos Específicos por Tipo conforme seu Schema.prisma */}
          <div className="col-span-full font-semibold border-b pb-2 mt-4">Detalhes do {tipo}</div>
          
          {tipo === 'carro' && (
            <>
              <input name="cambio" placeholder="Câmbio" className="input-style  p-1 border-[1px] rounded-md" />
              <input name="combustivel" placeholder="Combustível" className="input-style p-1 border-[1px] rounded-md" />
              <input name="motor" placeholder="Motor" className="input-style p-1 border-[1px] rounded-md" /> 
            </>
          )}

          {tipo === 'moto' && (
            <>
              <input name="cilindrada" placeholder="Cilindrada" className="input-style  p-1 border-[1px] rounded-md" />
              <input name="estilo" placeholder="Estilo (Ex: Custom)" className="input-style p-1 border-[1px] rounded-md" />
              <input name="partida" placeholder="Tipo de Partida" className="input-style p-1 border-[1px] rounded-md" /> 
            </>
          )}

          {tipo === 'caminhao' && (
            <>
              <input name="carroceria" placeholder="Tipo de Carroceria" className="input-style p-1 border-[1px] rounded-md" />
              <input name="tracao" placeholder="Tração" className="input-style p-1 border-[1px] rounded-md" /> 
            </>
          )}

          {tipo === 'maquina' && (
            <>
              <input name="direcao" placeholder="Tipo de Direção" className="input-style  p-1 border-[1px] rounded-md" />
              <input name="motor" placeholder="Motor" className="input-style p-1 border-[1px] rounded-md" /> 
            </>
          )}

          <textarea name="sobre" placeholder="Descrição do veículo" className="col-span-full p-3 border rounded-lg h-32" />
<div className="col-span-full mt-6">
  <label className="block text-sm font-medium text-slate-700 mb-2">Fotos do Veículo</label>
  <div className="flex items-center justify-center w-full">
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <p className="mb-2 text-sm text-slate-500 font-semibold">Clique para enviar ou arraste</p>
        <p className="text-xs text-slate-400">PNG, JPG ou WEBP</p>
      </div>
      <input type="file" className="hidden" multiple onChange={handleImageChange} accept="image/*" />
    </label>
  </div>
  
  {/* Pré-visualização das fotos */}
  <div className="grid grid-cols-4 gap-4 mt-4">
    {previews.map((src, index) => (
      <div key={index} className="relative h-20 w-full">
        <img src={src} alt="Preview" className="h-full w-full object-cover rounded-md shadow-sm" />
      </div>
    ))}
  </div>
</div>
          <button 
            type="submit" 
            disabled={loading}
            className="col-span-full bg-[var(--vermelho)] hover:bg-red-800 text-white font-bold py-3 rounded-lg transition disabled:bg-slate-400"
          >
            {loading ? 'Criando...' : `Cadastrar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`}
          </button>
        </form>
      )}
    </div>
  );
}
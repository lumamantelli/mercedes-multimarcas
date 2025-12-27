export type Carro = {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  cidade: string;
  estado: string;
  quilometragem: number;
  cor: string;
  combustivel: string;
  motor: string;
  tracao: string;
  cambio: string;
  cabine: string;
  fplaca: string;
  ipva: string;
  licenciamento: string;
  revisoes: string;
  preco: number;
  status?: StatusVeiculo; // Optional, as you provide a default value
  troca: string;
  sobre: string;
  usuarioId: string;
  images?: string[];
};

export type Moto = {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  cidade: string;
  estado: string;
  quilometragem: number;
  cor: string;
  combustivel: string;
  partida: string;
  marchas: string;
  refrigeracao: string;
  freio: string;
  estilo: string;
  alimentacao: string;
  motor: string;
  cilindrada: string;
  preco: number;
  status: StatusVeiculo;
  troca: string;
  sobre: string;
  usuarioId: string;
  images?: string[];
};

export type Maquina = {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  cidade: string;
  estado: string;
  quilometragem: number;
  cor: string;
  combustivel: string;
  tracao: string;
  cabine: string;
  motor: string;
  direcao: string;
  preco: number;
  status: StatusVeiculo;
  troca: string;
  sobre: string;
  usuarioId: string;
  imagemUrl?: string[];
};

export type Caminhao = {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  cidade: string;
  estado: string;
  quilometragem: number;
  cor: string;
  combustivel: string;
  carroceria: string;
  ipva: string;
  licenciamento: string;
  cabine: string;
  cambio: string;
  tracao: string;
  preco: number;
  status: StatusVeiculo;
  troca: string;
  sobre: string;
  usuarioId: string;
  imagemUrl?: string[];
};

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface Veiculo {
  modelo: string; 
  marca: string; 
  ano: number; 
  cidade: string; 
  estado: string; 
  quilometragem: number; 
  preco: number; 
  images?: string[]
}

export type StatusVeiculo = "DISPONÍVEL" | "VENDIDO";

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle
} from 'lucide-react'; // Instale lucide-react para ícones
import { apiUser } from '@/lib/apis/usuarioApi';
import { FaCar, FaMotorcycle, FaTractor, FaTruckFront } from 'react-icons/fa6';
import { api } from '@/lib/apis/carroApi';
import { Caminhao, Carro, Maquina, Moto } from '@/types/auth';
interface Usuario {
  id: string;
  nome: string;
  email: string;
  cidade: string;
}

interface SearchResponse {
  carros: Carro[];
  motos: Moto[];
  maquinas: Maquina[];
  caminhoes: Caminhao[];
  total: number;
}


export default function AdminDashboard() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<SearchResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchDados();
    fetchVeiculos();
  }, []);

  async function fetchDados() {
    try {
      // O fetch deve incluir as credenciais para enviar o cookie authToken
      const res = await fetch(apiUser.usuarios, { 
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.status === 401) return router.push('/login');
      
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchVeiculos = async () => {
       try {
            const res = await fetch(api.allItems);
            if (!res.ok) {
              throw new Error("Erro ao buscar dados.");
            }
            const data: SearchResponse = await res.json();
            setDados(data); // Agora salvamos o objeto completo
          } catch (err) {
            console.error("Erro ao buscar dados:", err);
          } finally {
            setLoading(false);
          }
        }

  return (
    <div className="flex min-h-screen bg-gray-100">
   

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gerenciamento de Veículos</h1>
            <p className="text-slate-500">Visão geral e estatísticas</p>
          </div>
          <button className="bg-[var(--vermelho)] hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <PlusCircle size={20}/> Novo Veículo
          </button>
        </header>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 flex justify-start items-center gap-4 rounded-xl shadow-sm border border-slate-200">
            <FaCar className='text-[var(--vermelho)] text-3xl' />
            <div className='flex flex-col'>
            <p className="text-slate-500 text-sm uppercase font-semibold">Total de Carros</p>
            <p className="text-2xl font-bold">{dados?.carros.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 flex justify-start items-center gap-4 rounded-xl shadow-sm border border-slate-200">
            <FaMotorcycle className='text-[var(--vermelho)] text-3xl' />
            <div className='flex flex-col'>
            <p className="text-slate-500 text-sm uppercase font-semibold">Total de Motos</p>
            <p className="text-2xl font-bold">{dados?.motos.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 flex justify-start items-center gap-4 rounded-xl shadow-sm border border-slate-200">
            <FaTruckFront className='text-[var(--vermelho)] text-3xl' />
            <div className='flex flex-col'>
            <p className="text-slate-500 text-sm uppercase font-semibold">Total de Caminhões</p>
            <p className="text-2xl font-bold">{dados?.caminhoes.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 flex justify-start items-center gap-4 rounded-xl shadow-sm border border-slate-200">
            <FaTractor className='text-[var(--vermelho)] text-3xl' />
            <div className='flex flex-col'>
            <p className="text-slate-500 text-sm uppercase font-semibold">Total de Máquinas</p>
            <p className="text-2xl font-bold">{dados?.maquinas.length}</p>
            </div>
          </div>
          
          {/* Outros cards de métricas aqui */}
        </div>

        {/* Tabela de Dados */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500">Carregando dados...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-700">Nome</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Cidade</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">{user.nome}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 text-slate-600">{user.cidade}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:underline mr-4">Editar</button>
                      <button className="text-red-600 hover:underline">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
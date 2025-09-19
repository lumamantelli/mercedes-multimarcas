/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import CriarUsuarioInput from 'src/interfaces/usuarioInterface';
import { prisma } from '../prisma/prismaClient';
import { generateToken, TokenPayload } from '../utils/gerarToken';

type Usuario = {
  nome: string;
  email: string;
  senha: string;
 
};


export interface LoginInput {
  email: string;
  senha: string;
}

export interface LoginResponse {
  usuario: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string | null;
    cidade: string;
    estado: string;
    fotoUrl: string | null;
  };
  token: string;
}


export async function listarUsuarios(): Promise<Usuario[]> {
  try {
    const usuarios: Usuario[] = await prisma.usuario.findMany();
    return usuarios;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
    throw new Error(`Erro desconhecido: ${JSON.stringify(error)}`);
  }
}

export async function criarUsuario(data: CriarUsuarioInput) {
  const usuario = await prisma.usuario.create({
    data: {
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      telefone: data.telefone,
      endereco: data.endereco,
      cidade: data.cidade,
      estado: data.estado,
      fotoUrl: data.fotoUrl,
    },
  });
  return usuario;
}

export async function atualizarUsuario(id: string, data: Partial<CriarUsuarioInput>) {
  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        endereco: data.endereco,
        cidade: data.cidade,
        estado: data.estado,
        fotoUrl: data.fotoUrl,
      },
    });
    return usuarioAtualizado;
  }
  catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
}

export async function deletarUsuario(id: string) {
  try {
    const usuarioDeletado = await prisma.usuario.delete({
      where: { id },
    });
    return usuarioDeletado;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
}



export const usuarioService = {
  async updatePassword(id: string, plainPassword: string) {
    try {
      const hashed = await bcrypt.hash(plainPassword, 10);
      await prisma.usuario.update({
        where: { id },
        data: { senha: hashed },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao atualizar senha:', error.message);
        throw new Error(`Erro ao atualizar senha: ${error.message}`);
      } else {
        console.error('Erro desconhecido ao atualizar senha:', error);
        throw new Error('Erro desconhecido ao atualizar senha');
      }
    }
  },
};


export async function loginUsuario(data: LoginInput): Promise<LoginResponse> {
  try {
    // Buscar usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (!usuario) {
      throw new Error('Email ou senha incorretos');
    }

    // Verificar se a senha está correta
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha as string);
    if (!senhaCorreta) {
      throw new Error('Email ou senha incorretos');
    }

    // Gerar token JWT
    const payload: TokenPayload = {
      userId: usuario.id,
      email: usuario.email,
    };
    const token = generateToken(payload);

    // Retornar dados do usuário (sem a senha) e o token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...usuarioSemSenha } = usuario;

    return {
      usuario: usuarioSemSenha,
      token,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao fazer login:', error.message);
      throw new Error(`${error.message}`);
    } else {
      console.error('Erro desconhecido ao fazer login:', error);
      throw new Error('Erro desconhecido ao fazer login');
    }
  }
}

export function logoutUsuario(): { message: string } {
  try {
    // O logout é basicamente limpar o token do lado do cliente
    // Aqui podemos implementar lógica adicional se necessário (blacklist de tokens, etc.)
    return { message: 'Logout realizado com sucesso' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao fazer logout:', error.message);
      throw new Error(`Erro ao fazer logout: ${error.message}`);
    } else {
      console.error('Erro desconhecido ao fazer logout:', error);
      throw new Error('Erro desconhecido ao fazer logout');
    }
  }
}
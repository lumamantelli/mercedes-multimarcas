/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { atualizarUsuario, criarUsuario, deletarUsuario, listarUsuarios, LoginInput, loginUsuario, logoutUsuario } from '../services/usuarioService';
import CriarUsuarioInput from '../interfaces/usuarioInterface';

export async function postUsuario(req: Request, res: Response) {
  const { nome, email, senha, telefone, endereco, cidade, estado, fotoUrl } = req.body as CriarUsuarioInput;
  try {
    const usuario = await criarUsuario({ nome, email, senha, telefone, endereco, cidade, estado, fotoUrl });
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

export async function getUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

export async function putUsuario(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, email, senha, telefone, endereco, cidade, estado, fotoUrl } = req.body as CriarUsuarioInput;
  try {
    const usuarioAtualizado = await atualizarUsuario(id, { nome, email, senha, telefone, endereco, cidade, estado, fotoUrl });
    res.status(200).json(usuarioAtualizado);
  }
  catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

export async function deleteUsuario(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const usuarioDeletado = await deletarUsuario(id);
    res.status(200).json(usuarioDeletado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}


export async function postLogin(req: Request, res: Response) {
  const { email, senha } = req.body as LoginInput;

  try {
    // Validar dados de entrada
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Fazer login
    const result = await loginUsuario({ email, senha });

    // Configurar cookie com o token
    res.cookie('authToken', result.token, {
      httpOnly: true, // Cookie não acessível via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
      sameSite: 'strict', // Proteção CSRF
      maxAge: 4 * 60 * 60 * 1000, // 4 horas em milissegundos
    });

    // Retornar dados do usuário (sem o token no body para maior segurança)
    res.status(200).json({
      message: 'Login realizado com sucesso',
      usuario: result.usuario,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro no login:', error.message);
      
      // Se for erro de credenciais incorretas
      if (error.message.includes('Email ou senha incorretos')) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }
      
      return res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      console.error('Erro desconhecido no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export  function postLogout(req: Request, res: Response) {
  try {
    // Processar logout no service
    const result =  logoutUsuario();

    // Limpar o cookie de autenticação
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro no logout:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      console.error('Erro desconhecido no logout:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
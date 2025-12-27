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

  try{
  // CORREÇÃO: Adicione o await aqui
    const result = await loginUsuario({ email, senha });

    // Armazenar o token em um cookie HTTP-only (opcional, mas recomendado)
    res.cookie('authToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hora
    });

    // Retornar dados do usuário
    res.status(200).json({
      message: 'Login realizado com sucesso',
      usuario: result.usuario,
      token: result.token // Certifique-se de enviar o token se o front precisar dele manualmente
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
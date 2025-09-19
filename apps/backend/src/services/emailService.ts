/* eslint-disable prettier/prettier */
// services/emailService.ts
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer from 'nodemailer';


export const createTransporter = (): Transporter<SMTPTransport.SentMessageInfo> => {
    const transportOptions: SMTPTransport.Options = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'SEU_USER',
        pass: 'SUA_SENHA',
      },
    };
  
    try {
      return nodemailer.createTransport(transportOptions) as Transporter<SMTPTransport.SentMessageInfo>;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao criar transporter:', error.message);
        throw new Error(`Falha ao configurar o transporte de e-mail: ${error.message}`);
      } else {
        console.error('Erro desconhecido ao criar transporter:', error);
        throw new Error('Falha ao configurar o transporte de e-mail: Erro desconhecido');
      }
    }
  };


export const sendResetEmail = async (to: string, link: string) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: '"Suporte" <suporte@seusite.com>',
      to,
      subject: 'Recuperação de Senha',
      html: `
          <p>Você solicitou a recuperação de senha.</p>
          <p>Clique no link abaixo para redefinir:</p>
          <a href="${link}">${link}</a>
        `,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao enviar e-mail:', error.message);
      throw new Error(`Erro ao enviar e-mail: ${error.message}`);
    } else {
      console.error('Erro desconhecido ao enviar e-mail:', error);
      throw new Error('Erro desconhecido ao enviar e-mail');
    }
  }
};

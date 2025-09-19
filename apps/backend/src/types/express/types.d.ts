/* eslint-disable prettier/prettier */
declare namespace Express {
  interface Request {
    user: {
      id: string;
      grupo: string;
      tipo: 'PADRAO' | 'ADMINISTRADOR';
      permissoes: string[];
      revenda: {
        nome: string;
        id: string;
        slug: string;
      };
    };
  }
}
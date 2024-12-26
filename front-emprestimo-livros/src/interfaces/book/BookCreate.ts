export interface BookCreate {
    titulo: string;
    autor: string;
    isbn: string;
    disponivel: boolean;
    quantidadeExemplares: number;
    dataPublicacao: string;
  }
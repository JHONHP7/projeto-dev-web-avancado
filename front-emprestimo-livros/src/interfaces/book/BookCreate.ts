export interface BookCreate {
    titulo: string;
    autor: string;
    disponivel: boolean;
    quantidadeExemplares: number;
    dataPublicacao: string;
    genero: string;
  }
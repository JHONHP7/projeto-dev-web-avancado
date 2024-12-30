export interface BookUpdate {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  disponivel: boolean;
  dataPublicacao: string;
  quantidadeExemplares: number;
  genero: string;
}

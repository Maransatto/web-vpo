export class Category {
  constructor(
    public id_orcamento: number,
    public id_agrupamento: number,
    public nome: string,
    public valor_orcado: number,
    public valor_atividades: number,
    public valor_disponivel: number
  ) {
  }
}

export interface CreateTransactionInputDto {
  cliente_id: string;
  valor: number;
  tipo: "c" | "d";
  descricao: string;
}

export interface CreateTransactionOutputDto {
  limite: number;
  saldo: number;
}

export interface FindTransactionReportInput {
  cliente_id: string;
}

export interface FindTransactionReportOutput {
  saldo: AccountBalance;
  ultimas_transacoes: Transaction[];
}

export interface AccountBalance {
  total: number;
  data_extrato: string;
  limite: number;
}

export interface Transaction {
  valor: number;
  tipo: string;
  descricao: string;
  realizada_em: string;
}

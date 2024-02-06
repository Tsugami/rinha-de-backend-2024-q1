import type {
  FindTransactionReportInput,
  FindTransactionReportOutput,
} from "./dto/find-transaction-report.dto";

export const findTransactionReport = async (
  input: FindTransactionReportInput
): Promise<FindTransactionReportOutput> => {
  return {
    saldo: {
      total: 500,
      data_extrato: "2021-01-01",
      limite: 1000,
    },
    ultimas_transacoes: [
      {
        valor: 100,
        tipo: "c",
        descricao: "Depósito",
        realizada_em: "2021-01-01",
      },
      {
        valor: 50,
        tipo: "d",
        descricao: "Saque",
        realizada_em: "2021-01-02",
      },
    ],
  };
};

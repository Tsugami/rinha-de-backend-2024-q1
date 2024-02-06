import type {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from "./dto/create-transaction.dto";

export const createTransaction = async (
  input: CreateTransactionInputDto
): Promise<CreateTransactionOutputDto> => {
  return {
    limite: 1000,
    saldo: 500,
  };
};

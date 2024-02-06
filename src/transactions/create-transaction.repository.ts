import { NotFoundError } from "elysia";
import { db } from "../lib/db";
import type {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from "./dto/create-transaction.dto";

export const createTransaction = async (
  input: CreateTransactionInputDto
): Promise<CreateTransactionOutputDto> => {
  const account = await db.account.findUnique({
    where: { id: input.cliente_id },
  });

  if (!account) {
    throw new NotFoundError("Account not found");
  }

  // TODO check by database before
  // if (input.tipo === "d" && input.valor > account.saldo + account.limite) {
  //   throw new NOT("Insufficient funds");
  // }

  return db.$transaction(async (tx) => {
    const isDebit = input.tipo === "d";
    // const isOverdraft = isDebit && input.valor > account.saldo + account.limite;

    const sender = await tx.account.update({
      data: {
        [isDebit ? "limite" : "saldo"]: {
          increment: input.valor,
        },
      },
      where: {
        id: input.cliente_id,
      },
    });

    const result = await tx.transaction.create({
      data: {
        account_id: sender.id,
        valor: input.valor,
        tipo: input.tipo,
      },
      select: {
        account: {
          select: {
            limite: true,
            saldo: true,
          },
        },
      },
    });

    return {
      limite: Number(result.account.limite),
      saldo: Number(result.account.saldo),
    };
  });
};

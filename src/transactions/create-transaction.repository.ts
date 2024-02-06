import { NotFoundError } from "elysia";
import { db } from "../lib/db";
import type {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from "./dto/create-transaction.dto";
import { Prisma } from "@prisma/client";

export const createTransaction = async (
  input: CreateTransactionInputDto
): Promise<CreateTransactionOutputDto> => {
  return db.$transaction(async (tx) => {
    const isDebit = input.tipo === "d";
    // const isOverdraft = isDebit && input.valor > account.saldo + account.limite;
    try {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Account not found");
        }
        // console.log(error.code + );
      }
      throw error;
    }
  });
};

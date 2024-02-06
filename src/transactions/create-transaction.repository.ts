import { NotFoundError } from "elysia";
import { db } from "../lib/db";
import type {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from "./dto/create-transaction.dto";
import { Prisma } from "@prisma/client";
import { UnprocessableEntityError } from "../lib/UnprocessableEntityError";

export const createTransaction = async (
  input: CreateTransactionInputDto
): Promise<CreateTransactionOutputDto> => {
  return db.$transaction(async (tx) => {
    try {
      const sender = await tx.account.update({
        data: {
          saldo: {
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
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new UnprocessableEntityError("Insufficient funds");
      }

      throw error;
    }
  });
};

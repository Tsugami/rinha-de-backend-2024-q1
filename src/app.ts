import { Elysia, t } from "elysia";
import { createTransaction } from "./transactions/create-transaction.repository";
import { UnprocessableEntityError } from "./lib/UnprocessableEntityError";

export const app = new Elysia()
  .onError(({ error, set }) => {
    if (error instanceof UnprocessableEntityError) {
      set.status = 422;
      return error.message;
    }

    console.error(error);
    set.status = 500;
    return "Internal server error";
  })
  .post(
    "/clientes/:id/transacoes",
    ({ params: { id }, body }) => {
      return createTransaction({
        cliente_id: id,
        descricao: body.descricao,
        tipo: body.tipo,
        valor: body.valor,
      });
    },
    {
      body: t.Object({
        valor: t.Number(),
        tipo: t.Enum(t.Literal("c"), t.Literal("d")),
        descricao: t.String(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

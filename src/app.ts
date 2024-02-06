import { Elysia, t } from "elysia";
import { createTransaction } from "./transactions/create-transaction.repository";

export const app = new Elysia().post(
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

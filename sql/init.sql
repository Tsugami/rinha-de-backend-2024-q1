-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM('c', 'd');

-- CreateTable
CREATE TABLE "accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "saldo" BIGINT NOT NULL CHECK (valor > 0),
    "limite" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "valor" BIGINT NOT NULL,
    "tipo" "TransactionType" NOT NULL,
    "realizada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" INTEGER NOT NULL
);

-- AddForeignKey
ALTER TABLE "transactions"
ADD CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

DO $$
INSERT INTO
    "accounts" (id, saldo, limite)
VALUES (1, 0, 100000),
    (2, 0, 80000),
    (3, 0, 1000000),
    (4, 0, 10000000),
    (5, 0, 500000);

END;

$$;
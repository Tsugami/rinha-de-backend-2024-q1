import { app } from "./app";

const PORT = process.env.PORT || 8081;

app.listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

curl -v -X POST \
    -H "Content-Type: application/json" \
    -d '{"valor": 1000,"tipo": "c","descricao": "nova transação"}' \
    http://localhost:8081/clientes/1/transacoes
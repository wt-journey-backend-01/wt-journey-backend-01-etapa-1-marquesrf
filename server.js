const path = require("path");
const express = require("express");

const PORT = 3000;
const app = express();
const lanches = [
  {
    id: 1,
    nome: "DevBurger Clássico",
    ingredientes:
      "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial",
  },
  {
    id: 2,
    nome: "Burger de Bacon",
    ingredientes:
      "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue",
  },
  {
    id: 3,
    nome: "Commit Veggie",
    ingredientes:
      "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas",
  },
];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/lanches", (req, res) => {
  res.json(lanches);
});

app.get("/agradecimentos", (req, res) => {
  const { nome, ingredientes } = req.query;
  res.sendFile(path.join(__dirname, "views", "agradecimentos.html"));
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Contato Recebido</title>
      <link rel="stylesheet" href="/styles/style.css">
    </head>
    <body>
      <h1>Dados recebidos!</h1>
      <p>Obrigado por entrar em contato conosco, ${nome}! Seguem as informações que enviou.</p>
      <ul>
        <li><strong>Nome:</strong> ${nome}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Assunto:</strong> ${assunto}</li>
        <li><strong>Mensagem:</strong> ${mensagem}</li>
      </ul>
      <a href="/">Voltar ao cardápio</a>
    </body>
    </html>
  `);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});
app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

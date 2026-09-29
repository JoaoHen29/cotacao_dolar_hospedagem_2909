const express = require("express");
const path = require("path");

const app = express();

// O Render define a porta pela variável de ambiente PORT.
// No seu computador, usa a 3000.
const PORT = process.env.PORT || 3000;

// Serve os arquivos da pasta "public" (HTML, CSS e JS)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal: entrega o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

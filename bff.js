const express = require("express");
const axios = require("axios");
const cors = require("cors");
 
const app = express();
app.use(cors());
app.use(express.json());
 
const API_URL = "http://localhost:3000/poupancas";
 
// Listar poupanças
app.get("/api/poupancas", async (req, res) => {
  try {
    const { data } = await axios.get(API_URL);
    const resultado = data.map(p => ({
      valor: p.valor,
      data: new Date(p.data).toLocaleDateString("pt-BR"),
    }));
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar poupanças." });
  }
});
 
// Criar poupança
app.post("/api/poupancas", async (req, res) => {
  const { valor } = req.body;
  if (!valor) return res.status(400).json({ erro: "Valor é obrigatório." });
 
  const novaPoupanca = {
    valor: parseFloat(valor),
    data: new Date().toISOString().split("T")[0],
  };
 
  try {
    const { data } = await axios.post(API_URL, novaPoupanca);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar poupança." });
  }
});
 
app.listen(3001, () => console.log("BFF rodando em http://localhost:3001"));
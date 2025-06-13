const express = require("express");
const cors = require("cors");
const db = require("./db"); // corrigido

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // já faz o papel do body-parser moderno
app.use(express.static("public"));

// Enviar mensagem
app.post("/api/mensagem", (req, res) => {
    const { de, para, texto } = req.body;

    if (!de || !para || !texto) {
        return res.status(400).send("Dados incompletos.");
    }

    db.run(
        "INSERT INTO mensagens (remetente_id, destinatario_id, texto) VALUES (?, ?, ?)",
        [de, para, texto],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Erro ao salvar mensagem.");
            }
            res.status(200).send("Mensagem enviada com sucesso!");
        }
    );
});

// Listar mensagens
app.get("/api/mensagens", (req, res) => {
    db.all("SELECT * FROM mensagens ORDER BY data_envio DESC", [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao buscar mensagens.");
        }
        res.json(rows);
    });
});

// Servidor escutando
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
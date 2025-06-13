const express = require('express');
const router = express.Router();
const db =require("../db");

///rota de cadastro//

router.post('/cadastro', (req,res) => {
    const{ email, senha, tipo, nome, crm, especialidade, data_nascimento } =req.body;

    if (!email || !senha || !tipo || !nome) {
        return res.status(400).send("Campos obrigatórios faltando.");

    }

//Inserção no Banco
db.run('INSERT INTO usuarios  (email, senha, tipo, nome, crm, especialidade, data_nascimento) VALUES (?,?,?,?,?,?,?)'
    , [email, senha, tipo, nome, crm || null, especialidade || null]
) 
});
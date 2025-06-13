const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('banco.db');

// Criação das tabelas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        email TEXT UNIQUE, 
        senha TEXT, 
        tipo TEXT CHECK(tipo IN ('paciente', 'medico')),
        nome TEXT,
        crm TEXT,                         -- só médicos
        especialidade TEXT,               -- só médicos
        data_nascimento TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS mensagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        remetente_id INTEGER,
        destinatario_id INTEGER,
        texto TEXT,
        data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(remetente_id) REFERENCES usuarios(id),
        FOREIGN KEY(destinatario_id) REFERENCES usuarios(id)
    )`);
});

module.exports = db;
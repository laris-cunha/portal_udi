var express = require('express');
var router = express.Router();
const db = require('../db');

// GET home page
router.get('/', async function(req, res, next) {
  try {
    const busca = await db.query("SELECT * FROM livros ORDER BY ano DESC");
    res.render('index', { title: 'Portal do Livro', livros: busca.rows});
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar livros');
  }
});

// GET cadastrar
router.get('/cadastrar', async function(req, res, next) {
  try {
    res.render('cadastrar', { title: 'Cadastrar Livro' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar página de cadastro');
  }
});
// GET detalhar
router.get('/detalhar/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const busca = await db.query("SELECT * FROM livros WHERE id = $1", [id]);
    res.render('detalhar', { title: 'Detalhes do Livro', livro: busca.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar detalhes do livro');
  }
});

// Método POST
router.post('/cadastrar', async function(req, res, next) {
  const { titulo, autor, ano, genero, capa } = req.body;
  try {
    await db.query("INSERT INTO livros (titulo, autor, ano, genero, capa) VALUES ($1, $2, $3, $4, $5)",
    [titulo, autor, ano, genero, capa]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao adicionar livro');
  }
});

module.exports = router;
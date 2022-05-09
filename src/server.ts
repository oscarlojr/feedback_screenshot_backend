import express from 'express'

const app = express();

app.use(express.json());

//  GET, POST, PUT, PATCH, DELETE

// GET =  Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

app.post('/feedbacks',(req, res) => {
  console.log(req.body);
  return res.send('Hello Word');
})

app.listen(3333,() => {
  console.log('HTTP server running!');
});
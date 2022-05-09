import express from 'express'
import nodemailer from "nodemailer"
import { prisma } from './prisma';

const app = express();

app.use(express.json());


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a8af83f96266bf",
    pass: "25a18f40a0fd07"
  }
});

//  GET, POST, PUT, PATCH, DELETE

// GET =  Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

app.post('/feedbacks',async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Oscar Junior <oscarlojr@gmail.com>',
    subject: 'Novo Feedback enviado',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  });

  return res.status(201).json({ data: feedback});
})

app.listen(3333,() => {
  console.log('HTTP server running!');
});
const express = require('express')
const bodyParser = require('body-parser')

var jogos = []

const app = express()

app.use(bodyParser.json())

app.post('/api/jogos', (requisicao, resposta) => {
    try {
        const novoJogo = requisicao.body.jogo
        const novaPlataforma = requisicao.body.plataforma
        if (!novoJogo || !novaPlataforma) {
            throw new Error('Deve ser informado um jogo e a sua plataforma')
        } else if (jogos.filter((jogo) => jogo.jogo === novoJogo && jogo.plataforma === novaPlataforma).length > 0) {
            throw new Error('Jogo ja esta cadastrado')
        } else {
            jogos.push(requisicao.body)
            resposta.send(JSON.stringify(requisicao.body))
        }
    } catch (erro) {
        resposta.status(400).send(JSON.stringify({ mensagem: erro.message }))
    }
})

app.get('/api/jogos', (requisicao, resposta) => {
    resposta.send(JSON.stringify(jogos))
})

app.listen(3000, () => {
    console.log('A API esta funcionando')
})
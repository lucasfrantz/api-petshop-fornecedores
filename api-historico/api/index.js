const express = require('express')
const bodyParser = require('body-parser')

var sites = []

const app = express()

app.use(bodyParser.json())

app.post('/api/historico', (requisicao, resposta) => {
    try {
        const novoSite = requisicao.body.site
        const novaDataAcesso = requisicao.body.dataAcesso
        if (!site || !dataAcesso) {
            throw new Error('Deve ser informado um site e sua data de acesso')
        } else if (sites.filter((site) => site.site === novoSite && site.dataAcesso === novaDataAcesso).length > 0) {
            throw new Error('Site ja esta cadastrado com essa data')
        } else {
            jogos.push(requisicao.body)
            resposta.status(201)
            resposta.send(JSON.stringify(requisicao.body))
        }
    } catch (erro) {
        resposta.status(400)
        resposta.send(JSON.stringify({ mensagem: erro.message }))
    }
})

app.get('/api/historico', (requisicao, resposta) => {
    resposta.status(200)
    resposta.send(JSON.stringify(sites))
})

app.listen(3000, () => {
    console.log('A API esta funcionando')
})
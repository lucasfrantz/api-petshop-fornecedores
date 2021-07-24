const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor
const Fornecedor = require('./Fornecedor')

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'), ['categoria'])
    resposta.send(serializador.serializar(resultados))
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        console.log(dadosRecebidos)
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'))
        resposta.send(serializador.serializar(fornecedor))
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador
const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const TabelaProduto = require('./produtos/TabelaProduto')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor
const SerializadorProduto = require('../../Serializador').SerializadorProduto

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'), ['categoria', 'empresa'])
    resposta.send(serializador.serializar(resultados))
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        console.log(dadosRecebidos)
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'), ['categoria', 'empresa'])
        resposta.send(serializador.serializar(fornecedor))
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:idFornecedor', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})


roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id })
        await fornecedor.carregar()
        resposta.status(200)
        const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'), ['categoria', 'empresa', 'email', 'dataCriacao', 'dataAtualizacao', 'versao'])
        resposta.send(serializador.serializar(fornecedor))
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204)
        resposta.end()
    }
    catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:idFornecedor/calcular-reposicao-de-estoque', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})


roteador.post('/:idFornecedor/calcular-reposicao-de-estoque', async (requisicao, resposta, proximo) => {
    try {
        const fornecedor = new Fornecedor({
            id: requisicao.params.idFornecedor
        })
        await fornecedor.carregar()
        const produtosSemEstoque = await TabelaProduto.listar(fornecedor.id, { estoque: 0 })
        const serializador = new SerializadorProduto(resposta.getHeader('Content-Type'), ['categoria', 'empresa'])
        resposta.status(200)
        resposta.send(
            {
                mensagem: `${produtosSemEstoque.length} precisam de reposicao de estoque`
            }
        )



    } catch (erro) {
        proximo(erro)
    }
})

const roteadorProdutos = require('./produtos')

const verificarFornecedor = async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id })
        await fornecedor.carregar()
        requisicao.fornecedor = fornecedor
        proximo()
    } catch (erro) {
        proximo(erro)
    }
}

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos)

module.exports = roteador
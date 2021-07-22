const Modelo = require('./ModeloTabelaProduto')
const NaoEncontrado = require('../../../erros/NaoEncontrado')
module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            raw: true,
            where: {
                fornecedor: idFornecedor
            }
        })
    },
    inserir(dados) {
        return Modelo.create(dados)
    },
    remover(idProduto, idFornecedor) {
        return Modelo.destroy(
            {
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            }
        )

    }
}
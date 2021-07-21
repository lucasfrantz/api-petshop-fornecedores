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
    }
}
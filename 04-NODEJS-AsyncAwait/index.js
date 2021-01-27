/*
  0 - Obter um usuario
  1 - Obter o numero de telefone de um usuario a partir de seu id
  2 - Obter o endereco do usuario pelo id
*/
// importamos um moodulo interno do node.js

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('Deu ruim de verdade'))
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date(),
      })
    }, 1000)
  })

}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        numero: '11990022',
        ddd: 11,
      })
    }, 2000);
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Rua dos bobos',
      numero: 0,
    })
  }, 2000);
}

main();

async function main() {
  try {
    console.time('medida-promise');
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ]);

    const telefone = resultado[0];
    const endereco = resultado[1];

    console.log(`
    Nome: ${usuario.nome}
    Endereço: ${endereco.rua}, ${endereco.numero} 
    Telefone: (${telefone.ddd}) - ${telefone.numero}
  `);
    console.timeEnd('medida-promise');

  } catch (error) {
    console.log("Deu ruim");
  }
}

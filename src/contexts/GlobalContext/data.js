var initial_date = new Date()
export const estadoGlobal = {
  empresasAbertas: true,
  setor: '' ,
  porte: '',
  natureza: '',
  descricao_atividade: '',
  municipio_empresa: '',
  secao_atividade: '',
  ano: (initial_date.getMonth() >= 1 && initial_date.getDate() >= 3) ? initial_date.getFullYear() : initial_date.getFullYear()-1, 
}
console.log(estadoGlobal.ano )
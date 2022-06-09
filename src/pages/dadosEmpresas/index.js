import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Filters from '../../client/filters'
import Municipio from '../../components/Graficos/municipio'
import Mes from "../../components/Graficos/mes"
import Botoes from '../../components/Botoes'
import Porte from '../../components/Graficos/tipo-empresa/porte'
import Setor from '../../components/Graficos/tipo-empresa/setor'
import Natureza from '../../components/Graficos/tipo-empresa/natureza'
import AtividadeEmpresa from '../../components/Graficos/tipo-empresa/atividade-empresa'
import { ContextGlobal } from '../../contexts/GlobalContext/context'
import { getDataEmpresasAbertas, getDataEmpresasAtivas } from '../../services/pinot'
import './style.css'
import './styleGlobal.css'

export default ({tipo}) => {
  const context = useContext(ContextGlobal)
  const [quantidade, setQuantidade] = useState(null)

  useEffect(() => {
    const getQtdAbertas = async () => {
      var filtros = {classificacao: "", ...context.state};
      const response = await getDataEmpresasAbertas(filtros);
      if(context.state.empresasAbertas == true) await setQuantidade(response.values[0].toLocaleString())
    }
  
    const getQtdAtivas = async () => {
      var filtros = {classificacao: "", ...context.state};
      const response = await getDataEmpresasAtivas(filtros);
      if(context.state.empresasAbertas == false) await setQuantidade(response.values[0]);
    }
  
    getQtdAbertas()
    getQtdAtivas()
  }, [context])

  return (
    <div className='wrap'>
      <Header />
      <Filters />
      <div className='main'>
        <Botoes tipo={tipo} />
      <div className='content-data'>
          <div className='content-tipoEmpresa'>
            {(window.innerWidth >= 320 && window.innerWidth < 768) ? <div className="total-empresasAbertas">
              <p>{`Total de Empresas ${context.state.empresasAbertas ? 'Abertas' : 'Ativas'}`}</p>
              <p>{quantidade !== null && quantidade.toLocaleString('pt-br')}</p>
            </div> : null}
            <div className='tipoEmpresa'>
              <Porte />
              {context.state.empresasAbertas == true && <Setor />}
              {context.state.empresasAbertas == false && <AtividadeEmpresa />}
              <Natureza />
            </div>
            <Municipio />
          </div>
          {context.state.empresasAbertas !== false && context.state.mes === '' && <Mes />}
        </div>
      </div> 
    </div>
  );
}

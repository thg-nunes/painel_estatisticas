import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { Navigate } from 'react-router'
import { Loading } from '../../components/loading'

import { TemplateChart } from '../../templates/chart'
import { TemplateLinks } from '../../templates/links'
import { TemplateTable } from '../../templates/table'

import { getDatasOfChartsAndFilters } from '../../services/pinot'
import { FilterContext } from '../../contexts/filtersContext/contextProvider'

import * as Styled from './styled'
import { MapMaranhao } from '../../components/mapMaranhao'
import { TemplateFilter } from '../../templates/filter'
import { Header } from '../../components/header'

export const OpenCompanies = () => {
  const { state } = useContext(FilterContext)
  const [filtersVisible, setFiltersVisible] = useState(false)
  
  const { data, isLoading, error } = useQuery(['response', state], async () => {
    const response = await getDatasOfChartsAndFilters(state)
    return response.data
  }, {
    staleTime: 1000 * 10 * 60 // 10 minutes
  })

  return (
    <Styled.Container>
      <Header setFiltersVisible={setFiltersVisible} filtersVisible={filtersVisible} />
      {isLoading ? <Loading /> : 
        error ? <Navigate to='/' /> :
        data && (
          <Styled.Content>
            <Styled.ContentTemplate>
              <TemplateFilter
                sectorFilterData={data.filtersData.setor}
                porteFilterData={data.filtersData.porte}
                natureFilterData={data.filtersData.natureza}
                setionFilterData={data.filtersData.secao_atividade}
                activityFilterData={data.filtersData.descricao_atividade}
                countyFilterData={data.filtersData.municipio_empresa}
                filtersVisible={filtersVisible}
              />
  
              <Styled.StyleContent filtersVisible={filtersVisible}> 
                <TemplateLinks />
  
                <Styled.ChartsStyle>
                  <div className='charts-and-tables'>
                    <Styled.ChartsFirstSection>
                      {window.innerWidth <= 540 && (
                        <Styled.QuantityTotal>
                          <p>Total de Empresas {state.empresasAbertas ? 'Abertas' : 'Ativas'}</p>
                          <p>{data.graphicsData.quantity[0][0].toLocaleString('pt-BR')}</p>
                        </Styled.QuantityTotal>
                      )}
                      <TemplateChart
                        chartType='Porte'
                        chartData={data.graphicsData.porte}
                      />
                      <TemplateChart
                        chartType='Setor'
                        chartData={data.graphicsData.setor}
                      />
  
                      <TemplateTable 
                        tableType='Natureza'
                        tableData={data.graphicsData.natureza}
                      />
                    </Styled.ChartsFirstSection>
  
                    <Styled.MapSection>
                      {window.innerWidth > 540 && (
                        <Styled.QuantityTotal>
                          <p>Total de Empresas {state.empresasAbertas ? 'Abertas' : 'Ativas'}</p>
                          <p>{data.graphicsData.quantity[0][0].toLocaleString('pt-BR')}</p>
                        </Styled.QuantityTotal>
                      )}
                      <MapMaranhao dataToMap={data.graphicsData.municipio_empresa} />
                    </Styled.MapSection>
                  </div>
  
                  <TemplateChart chartData={data.graphicsData.mes} chartType='Mês' />
                </Styled.ChartsStyle> 
              </Styled.StyleContent>
            </Styled.ContentTemplate>
          </Styled.Content>
        )
      }
    </Styled.Container>
  )
}
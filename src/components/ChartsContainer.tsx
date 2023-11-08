import { useState } from 'react'
import { ChartsContainerWrapper } from '../assets/wrappers'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import AreaChartComponent from './AreaChart'
import BarChartComponent from './BarChart'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState<boolean>(true)
  const { monthlyApplications } = useSelector(
    (state: RootState) => state.allJobs
  )

  return (
    <ChartsContainerWrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChartComponent monthlyApplications={monthlyApplications} />
      ) : (
        <AreaChartComponent monthlyApplications={monthlyApplications} />
      )}
    </ChartsContainerWrapper>
  )
}

export default ChartsContainer

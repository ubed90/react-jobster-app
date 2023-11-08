import { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../Store'
import { showStats } from '../../features/jobs/allJobsSlice'
import { useSelector } from 'react-redux'
import { ChartsContainer, Loading, StatsContainer } from '../../components'

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (state: RootState) => state.allJobs
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(showStats())
  }, [])

  if (isLoading) return <Loading center />

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats

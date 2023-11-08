import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../Store'
import { JobsContainerWrapper } from '../../assets/wrappers'
import { Job, Loading } from '..'
import { useEffect } from 'react'
import { getAllJobs } from '../../features/jobs/allJobsSlice'
import PageBtnContainer from '../PageBtnContainer'

const Jobs = () => {
  const {
    isLoading,
    jobs,
    page,
    numOfPages,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((state: RootState) => state.allJobs)
  const dispatch = useAppDispatch()

  // * Get All Jobs
  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading)
    return (
      <JobsContainerWrapper>
        <Loading />
      </JobsContainerWrapper>
    )

  if (jobs.length === 0)
    return (
      <JobsContainerWrapper>
        <h2>No Jobs to display...</h2>
      </JobsContainerWrapper>
    )

  return (
    <JobsContainerWrapper>
      <h5>
        {totalJobs} Job{totalJobs > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job}></Job>
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </JobsContainerWrapper>
  )
}

export default Jobs

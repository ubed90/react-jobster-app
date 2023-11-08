import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../Store'
import { ChangeEvent, FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { DashboardFormWrapper } from '../../assets/wrappers'
import { FormRow, FormRowSelect } from '../../components'
import {
  clearValues,
  createJob,
  handleChange,
  updateJob,
} from '../../features/jobs/jobsCrudSlice'

const AddJob = () => {
  const {
    company,
    editJobId,
    isEditing,
    isLoading,
    jobLocation,
    jobType,
    jobTypeOptions,
    position,
    status,
    statusOptions,
  } = useSelector((state: RootState) => state.job)

  const dispatch = useAppDispatch()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!position || !company || !jobLocation) {
      toast.error('Please Fill out All Fields!')
      return
    }

    if (isEditing)
      return dispatch(
        updateJob({
          jobId: editJobId,
          job: { company, jobLocation, jobType, position, status },
        })
      )

    dispatch(createJob({ company, position, jobType, status, jobLocation }))
  }

  const handleJobInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name
    const value = event.target.value

    dispatch(handleChange({ name, value }))
  }

  // * Logic to Fill Automatically the Location Field with User Location
  const { user } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({ name: 'jobLocation', value: user?.location || '' })
      )
    }
  }, [])

  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        <div className="form-center">
          {/* POSITION */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* Company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* JobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            label="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* Status */}
          <FormRowSelect
            name="status"
            options={statusOptions}
            value={status}
            handleChange={handleJobInput}
          />
          {/* Job Type */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            label="Job Type"
            options={jobTypeOptions}
            handleChange={handleJobInput}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(dispatch(clearValues()))}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-block submit-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </DashboardFormWrapper>
  )
}

export default AddJob

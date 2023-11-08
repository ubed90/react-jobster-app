import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IJob } from '../../model/job'
import { useAppDispatch } from '../../Store'
import { JobCardWrapper } from '../../assets/wrappers'
import JobInfo from './JobInfo'
import moment from 'moment'
import { deleteJob, setEditJob } from '../../features/jobs/jobsCrudSlice'

const Job: React.FC<IJob> = ({
  company,
  jobLocation,
  jobType,
  position,
  status,
  createdAt,
  _id,
}) => {
  const dispatch = useAppDispatch()

  const date = moment(createdAt).format('MMM Do, YYYY')

  return (
    <JobCardWrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditJob({
                    company,
                    jobLocation,
                    jobType,
                    position,
                    status,
                    editJobId: _id,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id as string))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </JobCardWrapper>
  )
}

export default Job

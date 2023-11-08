import React from 'react'
import { JobInfoWrapper } from '../../assets/wrappers'

interface IJobInfoProps {
  icon: React.ReactNode
  text: string
}

const JobInfo: React.FC<IJobInfoProps> = ({ icon, text }) => {
  return (
    <JobInfoWrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </JobInfoWrapper>
  )
}

export default JobInfo

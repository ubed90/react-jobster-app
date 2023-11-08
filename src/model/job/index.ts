export interface IJob {
  position: string
  company: string
  jobLocation: string
  jobType: string
  status: string
  createdAt?: string
  _id?: string
}

export interface IFilters {
  search: string
  searchStatus: string
  searchType: string
  sort: string
  sortOptions: string[]
}

export interface IAllJobs {
  isLoading: boolean
  jobs: IJob[]
  totalJobs: number
  numOfPages: number
  page: number
}

export interface IStats {
  stats: {
    declined: number
    interview: number
    pending: number
  }
  monthlyApplications: { date: string; count: number }[]
}

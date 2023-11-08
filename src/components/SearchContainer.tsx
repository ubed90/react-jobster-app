import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { SearchContainerWrapper } from '../assets/wrappers'
import { FormRow, FormRowSelect } from '.'
import {
  clearFilters,
  handleFiltersChange,
} from '../features/jobs/allJobsSlice'

const SearchContainer = () => {
  // * LOCAL SEARCH FOR DEBOUNCE
  const [localSearch, setLocalSearch] = useState<string>('')

  const dispatch = useAppDispatch()

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((state: RootState) => state.allJobs)

  const { jobTypeOptions, statusOptions } = useSelector(
    (state: RootState) => state.job
  )

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // * PREVIOUSLY REQUIRED
    // if (isLoading) return

    dispatch(
      handleFiltersChange({
        name: event.target.name,
        value: event.target.value,
      })
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }

  // * DEBOUNCE FUNCTION
  const debounce = () => {
    console.log('DEBOUNCEDDD')
    let timeoutID: number | undefined
    return (event: ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(event.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        dispatch(
          handleFiltersChange({
            name: event.target.name,
            value: event.target.value,
          })
        )
      }, 1000)
    }
  }

  // * TO TACKLE RE-RENDERING AND RETRIGGERING DEBOUNCE WHILE RERENDERS
  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <SearchContainerWrapper>
      <form onSubmit={handleSubmit} className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <FormRow
            name="search"
            type="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRowSelect
            name="searchStatus"
            label="Status"
            value={searchStatus}
            options={['all', ...statusOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="searchType"
            label="Type"
            value={searchType}
            options={['all', ...jobTypeOptions]}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            options={sortOptions}
            handleChange={handleSearch}
          />

          <button
            type="button"
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={() => {
              setLocalSearch('')
              dispatch(clearFilters())
            }}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </SearchContainerWrapper>
  )
}

export default SearchContainer

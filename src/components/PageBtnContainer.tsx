import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { PageBtnContainerWrapper } from '../assets/wrappers'
import { handlePageChange } from '../features/jobs/allJobsSlice'

const PageBtnContainer = () => {
  const dispatch = useAppDispatch()

  const { numOfPages, page } = useSelector((state: RootState) => state.allJobs)

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) newPage = 1

    dispatch(handlePageChange(newPage))
  }
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) newPage = numOfPages
    dispatch(handlePageChange(newPage))
  }

  return (
    <PageBtnContainerWrapper>
      <button onClick={prevPage} className="prev-btn" type="button">
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            className={page === pageNumber ? 'pageBtn active' : 'pageBtn'}
            onClick={() => dispatch(handlePageChange(pageNumber))}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button onClick={nextPage} className="next-btn" type="button">
        <HiChevronDoubleRight />
        Next
      </button>
    </PageBtnContainerWrapper>
  )
}

export default PageBtnContainer

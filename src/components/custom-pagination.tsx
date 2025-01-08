import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface IProps {
  handleSearch: (e?: React.FormEvent, page?: number) => void,
  currentPage: number,
  totalPages: number,
}

export default function CustomPagination({ handleSearch, currentPage, totalPages }: IProps) {
  function handlePageChange(page: number) {
    handleSearch(undefined, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (<Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (currentPage > 1) handlePageChange(currentPage - 1)
          }}
          className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
        />
      </PaginationItem>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const pageNumber = i + 1
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(pageNumber)
              }}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        )
      })}
      {totalPages > 5 && (
        <>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(totalPages)
              }}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        </>
      )}
      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (currentPage < totalPages) handlePageChange(currentPage + 1)
          }}
          className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}
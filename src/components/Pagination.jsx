const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const safeTotalPages = Math.min(totalPages || 1, 500)
  const pages = []
  let start = Math.max(1, currentPage - 2)
  let end = Math.min(safeTotalPages, currentPage + 2)

  if (currentPage <= 3) {
    start = 1
    end = Math.min(5, safeTotalPages)
  }
  if (currentPage >= safeTotalPages - 2) {
    start = Math.max(1, safeTotalPages - 4)
    end = safeTotalPages
  }

  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>← Previous</button>
      {pages.map(page => (
        <button key={page} className={currentPage === page ? 'active-page' : ''} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
      <button disabled={currentPage === safeTotalPages} onClick={() => onPageChange(currentPage + 1)}>Next →</button>
    </div>
  )
}

export default Pagination
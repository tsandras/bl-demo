import { useCallback, useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange } : PaginationProps) => {
  const displayedPages: number[] = useMemo(() => {
    if (totalPages > 5) {
      if (currentPage < 3) {
        return [1,2,3,4,5];
      } else if (currentPage > totalPages - 2) {
        return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } 
      return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    } else {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  }, [currentPage, totalPages])
  
  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }, [onPageChange, totalPages]);

  return (
    <ul className="flex gap-2 items-center m-2">
      <li
        className="pagination-item"
        onClick={() => handlePageChange(1)}
      >
        {'<<'}
      </li>
      <li
        className="pagination-item"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {'<'}
      </li>
      {displayedPages[0] !== 1 &&
        <li>...</li>
      }
      {displayedPages.map((page) => (
        <li
          key={page}
          className={`pagination-item ${currentPage === page ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </li>
      ))}
      {displayedPages[displayedPages.length-1] !== totalPages &&
        <li>...</li>
      }
      <li
        className="pagination-item"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {'>'}
      </li>
      <li
        className="pagination-item"
        onClick={() => handlePageChange(totalPages)}
      >
        {'>>'}
      </li>
    </ul>
  );
};

export default Pagination;
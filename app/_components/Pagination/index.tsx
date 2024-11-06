"use client"

import { useState, useEffect } from 'react';

interface PaginationProps {
  totalPages: number,
  currentPage: number,
  total: number,
  visibleContentAmount: number,
  onPageChange: (page: number) => void
}

export function Pagination({ totalPages, currentPage, onPageChange, total, visibleContentAmount }: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    setVisiblePages(calculateVisiblePages(totalPages, currentPage));
  }, [totalPages, currentPage]);

  function calculateVisiblePages(totalPages: number, currentPage: number, maxVisiblePages = 5) {
    maxVisiblePages = maxVisiblePages % 2 === 0 ? maxVisiblePages + 1 : maxVisiblePages;
  
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
  
    return visiblePages;
  }

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between mt-6 w-[535px] ">
      <section>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-xs rounded-md bg-gray-200 hover:bg-gray-300 
          disabled:opacity-50 mr-4 font-[family-name:var(--font-montserrat)]"
        >
          Anterior
        </button>
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded-full mx-1 ${
              page === currentPage ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-xs rounded-md bg-gray-200 hover:bg-gray-300 
          disabled:opacity-50 ml-4 font-[family-name:var(--font-montserrat)]"
        >
          Próximo
        </button>
      </section>

      <span className="ml-2 text-xs font-[family-name:var(--font-montserrat)]">Mostrando {visibleContentAmount} de {total} resultados</span>
    </div>
  );
}
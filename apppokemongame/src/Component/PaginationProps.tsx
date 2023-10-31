import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const paginationRange = 7; // Número de páginas que deseas mostrar a la vez

    const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
    const endPage = Math.min(totalPages, startPage + paginationRange - 1);

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div className="pagination">
            <button
                className={`btn btn-outline-primary mr-2 ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`btn ${currentPage === page ? "btn-primary" : "btn-outline-primary"} mr-2`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`btn btn-outline-primary ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;

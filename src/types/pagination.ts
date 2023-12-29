export interface Pagination {
    total: number;
    currentPage: number;
    totalPages: number;
    nextPage: number | null;
    previousPage: number | null;
}

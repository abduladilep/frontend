export function applyPagination(collected, page, rowsPerPage) { 
  return collected.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

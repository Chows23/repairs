
export default function paginate(AllRepairs, pageSize, currentPage) {
  const startIndex = (currentPage - 1) * pageSize;
  return AllRepairs.slice(startIndex, startIndex + pageSize);
}

export default function Pagination({
  currentPage,
  maxPage,
}: {
  currentPage: number;
  maxPage: number;
}) {
  const prevArrowBtn = (
    <button
      className={`join-item btn ${currentPage === 0 ? "disabled" : null}`}
    >
      «
    </button>
  );
  const firstPageBtn = (
    <button
      className={`join-item btn ${currentPage === 0 ? "btn-active" : null}`}
    >
      1
    </button>
  );
  const beginningEllipsis =
    currentPage > 1 ? (
      <button className="join-item btn btn-disabled">…</button>
    ) : null;
  const currentIntermediatePage =
    currentPage > 0 && currentPage < maxPage ? (
      <button className="join-item btn btn-active">{currentPage + 1}</button>
    ) : null;
  const endingEllipsis =
    maxPage > 1 && currentPage < maxPage - 1 ? (
      <button className="join-item btn btn-disabled">…</button>
    ) : null;
  const lastPageBtn =
    maxPage > 0 ? (
      <button
        className={`join-item btn ${currentPage === maxPage ? "btn-active" : null}`}
      >
        {maxPage + 1}
      </button>
    ) : null;
  const nextPageBtn = (
    <button
      className={`join-item btn ${currentPage === maxPage ? "disabled" : null}`}
    >
      »
    </button>
  );
  return (
    <div className="join">
      {prevArrowBtn}
      {firstPageBtn}
      {beginningEllipsis}
      {currentIntermediatePage}
      {endingEllipsis}
      {lastPageBtn}
      {nextPageBtn}
    </div>
  );
}

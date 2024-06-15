import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const prevPageBtn = (
    <Link
      href={createPageURL(currentPage > 1 ? currentPage - 1 : 1)}
      className={`join-item btn ${currentPage === 1 ? "btn-disabled" : null}`}
    >
      «
    </Link>
  );
  const firstPageBtn = (
    <Link
      href={createPageURL(1)}
      className={`join-item btn ${currentPage === 1 ? "btn-active" : null}`}
    >
      1
    </Link>
  );
  const beginningEllipsis =
    currentPage > 2 ? (
      <div className="join-item btn btn-disabled">…</div>
    ) : null;
  const currentIntermediatePage =
    currentPage > 1 && currentPage < totalPages ? (
      <Link
        href={createPageURL(currentPage)}
        className="join-item btn btn-active"
      >
        {currentPage}
      </Link>
    ) : null;
  const endingEllipsis =
    totalPages > 2 && currentPage < totalPages - 1 ? (
      <div className="join-item btn btn-disabled">…</div>
    ) : null;
  const lastPageBtn =
    totalPages > 1 ? (
      <Link
        href={createPageURL(totalPages)}
        className={`join-item btn ${currentPage === totalPages ? "btn-active" : null}`}
      >
        {totalPages}
      </Link>
    ) : null;
  const nextPageBtn = (
    <Link
      href={createPageURL(
        currentPage === totalPages ? totalPages : currentPage + 1,
      )}
      className={`join-item btn ${currentPage === totalPages ? "btn-disabled" : null}`}
    >
      »
    </Link>
  );
  return (
    <div className="join">
      {prevPageBtn}
      {firstPageBtn}
      {beginningEllipsis}
      {currentIntermediatePage}
      {endingEllipsis}
      {lastPageBtn}
      {nextPageBtn}
    </div>
  );
}

'use client';

import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

type ListPaginationProps = {
  total: number
  limit?: number
  defaultCurrent?: number
  style?: React.CSSProperties | undefined
}

export default function ListPagination({ style,...props }: ListPaginationProps) {
  const { total, limit, defaultCurrent } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = defaultCurrent || DEFAULT_PAGE
  const pageSize = limit || DEFAULT_LIMIT
  const showTotal = (total) => `Общее количество: ${total}`;

  let isPageSizeChanged = false;

  const handlePageSizeChange = (current, size) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('limit', size.toString());

    const newCurrentPage = Math.min(current, Math.ceil(total / size));
    if (newCurrentPage > 1) {
      newSearchParams.set('page', newCurrentPage.toString());
    } else {
      newSearchParams.delete('page');
    }

    isPageSizeChanged = true;

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    if (isPageSizeChanged) {
      isPageSizeChanged = false;
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (page > 1) {
      newSearchParams.set('page', page.toString());
    } else {
      newSearchParams.delete('page');
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (<>
    {total > pageSize && (
      <Pagination
        total={total}
        showTotal={showTotal}
        defaultPageSize={pageSize}
        defaultCurrent={currentPage}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        style={{ ...style }}
      />
    )}
  </>);
}
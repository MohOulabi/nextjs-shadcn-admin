import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationItemsProps {
  totalPages: number;
  currentPage: number;
  maxVisiblePages?: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export function PaginationItems({
  totalPages,
  currentPage,
  maxVisiblePages = 5,
  onPageChange,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  canNextPage,
}: PaginationItemsProps) {
  const renderPaginationItems = () => {
    const items = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => onPageChange(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => onPageChange(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key='ellipsis-start' />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => onPageChange(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key='ellipsis-end' />);
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousPage} isActive={canPreviousPage} />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext onClick={onNextPage} isActive={canNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

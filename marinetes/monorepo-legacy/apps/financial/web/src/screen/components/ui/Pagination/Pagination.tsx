import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { PaginationItem } from './PaginationItem';
import { Container, Button, Dots, Main } from './styles';
import type { PaginationProps } from './types';

const siblingsCount = 1;

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export const Pagination = ({
  pages,
  itemsPerPage: _,
  currentPage,
  onPageChange,
  onNextPage,
  onPreviousPage,
}: PaginationProps): JSX.Element => {
  const firstPage = 1;
  const lastPage = pages;

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  return (
    <Container>
      <Button disabled={currentPage === firstPage}>
        <FiChevronLeft
          size="30px"
          color="var(--color-light-favorite)"
          onClick={onPreviousPage}
        />
      </Button>

      <Main>
        {currentPage > 1 + siblingsCount && (
          <Dots>
            <PaginationItem onPageChange={onPageChange} number={1} />

            {currentPage > 2 + siblingsCount && <p>...</p>}
          </Dots>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map(page => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <Dots>
            {currentPage + 1 * siblingsCount < lastPage && <p>...</p>}

            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </Dots>
        )}
      </Main>

      <Button disabled={currentPage === pages}>
        <FiChevronRight
          size="30px"
          color="var(--color-light-favorite)"
          onClick={onNextPage}
        />
      </Button>
    </Container>
  );
};

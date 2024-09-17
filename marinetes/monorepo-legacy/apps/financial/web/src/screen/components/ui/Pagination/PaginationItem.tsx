import { Page } from './styles';
import { PaginationItemProps } from './types';

export const PaginationItem = ({
  number,
  isCurrent = false,
  onPageChange,
}: PaginationItemProps): JSX.Element => {
  if (isCurrent) {
    return <Page isSelect>{number}</Page>;
  }

  return <Page onClick={() => onPageChange(number)}>{number}</Page>;
};

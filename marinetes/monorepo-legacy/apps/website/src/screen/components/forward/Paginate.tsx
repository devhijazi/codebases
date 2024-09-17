import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

interface Props
  extends Omit<
    ReactPaginateProps,
    | 'pageRangeDisplayed'
    | 'marginPagesDisplayed'
    | 'nextLabel'
    | 'previousLabel'
    | 'containerClassName'
    | 'previousLinkClassName'
    | 'nextLinkClassName'
    | 'disabledClassName'
    | 'activeClassName'
  > {}

export const Paginate = (props: Props): JSX.Element => (
  <ReactPaginate
    {...props}
    pageRangeDisplayed={2}
    marginPagesDisplayed={1}
    nextLabel="→"
    previousLabel="←"
    containerClassName="react-paginate"
    previousLinkClassName="react-paginate-link"
    nextLinkClassName="react-paginate-link"
    disabledClassName="react-paginate-link-disabled"
    activeClassName="react-paginate-link-active"
  />
);

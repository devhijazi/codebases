/* eslint-disable no-nested-ternary */

import { useAsync } from '@hitechline/reactools';
import type {
  UserDocument,
  UserListDocument,
} from '@marinetes/types/dtos/financial/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoIosAlert } from 'react-icons/io';

import { api } from '@/modules/services/api';
import { apply } from '@/resources/cases/apply';
import { Logged } from '@/resources/cases/Logged';
import { FilterButton } from '@/screen/components/ui/FilterButton';
import { Pagination } from '@/screen/components/ui/Pagination';
import { Spinner } from '@/screen/components/ui/Spinner';
import { Table } from '@/screen/components/ui/Table';
import { DefaultLayout } from '@/screen/layouts/DefaultLayout';

import { CustomerTableRow } from './components/CustomerTableRow';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  Input,
  Message,
  Main,
  Footer,
} from './styles';

const itemsPerPage = 12;

export const Customers = apply(
  (): JSX.Element => {
    const [inReset, setInReset] = useState(false);

    const [query, setQuery] = useState('');

    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [customers, setCustomers] = useState<UserDocument[]>([]);

    const fetchCustomers = useCallback(
      async (page: number, search?: string): Promise<UserListDocument> => {
        const { data: apiData } = await api.get<UserListDocument>('users', {
          params: { search, page, itemsPerPage },
        });

        return apiData;
      },
      [],
    );

    const { loading } = useAsync(async () => {
      const apiData = await fetchCustomers(1);

      setPages(apiData.pages);
      setCustomers(apiData.items);
    });

    const filterCustomers = useCallback((value: string) => {
      setQuery(value);
    }, []);

    const reset = useCallback(async () => {
      try {
        setInReset(true);
        setCurrentPage(1);
        setCustomers([]);

        const apiData = await fetchCustomers(1, query);

        setPages(apiData.pages);
        setCustomers(apiData.items);
      } finally {
        setInReset(false);
      }
    }, [fetchCustomers, query]);

    const pageChange = useCallback(
      async (page: number) => {
        const data = await fetchCustomers(page);

        setCurrentPage(page);
        setCustomers(data.items);
      },
      [fetchCustomers],
    );

    const nextPage = useCallback(() => {
      if (currentPage === pages) return;
      pageChange(currentPage + 1);
    }, [currentPage, pages, pageChange]);

    const previousPage = useCallback(() => {
      if (currentPage === 1) return;
      pageChange(currentPage - 1);
    }, [currentPage, pageChange]);

    const customerTableElement = useMemo(() => {
      const headers = ['Nome', 'Email', 'Telefone', 'CPF', <></>];
      const rows = customers.map(customer => (
        <CustomerTableRow key={customer.id} customer={customer} />
      ));

      return <Table headers={headers} rows={rows} />;
    }, [customers]);

    useEffect(() => {
      if (loading) {
        return;
      }

      reset();
    }, [loading, reset]);

    return (
      <Container className="bowl-content padding-y">
        <Content>
          <Header>
            <HeaderContent>
              <FilterButton />
            </HeaderContent>

            <Input
              placeholder="Pesquisar..."
              disabled={!customers.length && !query}
              onChange={e => filterCustomers(e.target.value)}
            />
          </Header>

          {loading || inReset ? (
            <Message>
              <Spinner size="60px" />
            </Message>
          ) : customers.length > 0 ? (
            <>
              <Main>{customerTableElement}</Main>

              <Footer>
                <Pagination
                  pages={pages}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={pageChange}
                  onNextPage={nextPage}
                  onPreviousPage={previousPage}
                />
              </Footer>
            </>
          ) : (
            <Message>
              <IoIosAlert size="80px" color="var(--color-strong-grey)" />

              <p>
                {query
                  ? 'Nenhum cliente encontrado!'
                  : 'Nenhum cliente criado!'}
              </p>
            </Message>
          )}
        </Content>
      </Container>
    );
  },
  {
    layout: DefaultLayout,
    cases: [Logged],
  },
);

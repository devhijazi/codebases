/* eslint-disable no-nested-ternary */

import { useAsync } from '@hitechline/reactools';
import type {
  ScheduleDocument,
  ScheduleListDocument,
} from '@marinetes/types/dtos/financial/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { IoIosAlert } from 'react-icons/io';

import { api } from '@/modules/services/api';
import { apply } from '@/resources/cases/apply';
import { Logged } from '@/resources/cases/Logged';
import { Pagination } from '@/screen/components/ui/Pagination';
import { Spinner } from '@/screen/components/ui/Spinner';
import { Table } from '@/screen/components/ui/Table';
import { DefaultLayout } from '@/screen/layouts/DefaultLayout';

import { ServiceTableRow } from './components/ServiceTableRow';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  FilterButton,
  Input,
  Message,
  Main,
  Footer,
} from './styles';

const itemsPerPage = 12;

export const Services = apply(
  (): JSX.Element => {
    const [inReset, setInReset] = useState(false);

    const [query, setQuery] = useState('');

    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [services, setServices] = useState<ScheduleDocument[]>([]);

    const fetchServices = useCallback(
      async (page: number, search?: string): Promise<ScheduleListDocument> => {
        const { data: apiData } = await api.get<ScheduleListDocument>(
          'schedules/list',
          { params: { search, page, itemsPerPage } },
        );

        return apiData;
      },
      [],
    );

    const { loading } = useAsync(async () => {
      const apiData = await fetchServices(1);

      setPages(apiData.pages);
      setServices(apiData.items);
    });

    const filterServices = useCallback((value: string) => {
      setQuery(value);
    }, []);

    const reset = useCallback(async () => {
      try {
        setInReset(true);
        setCurrentPage(1);
        setServices([]);

        const apiData = await fetchServices(1, query);

        setPages(apiData.pages);
        setServices(apiData.items);
      } finally {
        setInReset(false);
      }
    }, [fetchServices, query]);

    const pageChange = useCallback(
      async (page: number) => {
        const data = await fetchServices(page);

        setCurrentPage(page);
        setServices(data.items);
      },
      [fetchServices],
    );

    const nextPage = useCallback(() => {
      if (currentPage === pages) return;
      pageChange(currentPage + 1);
    }, [currentPage, pages, pageChange]);

    const previousPage = useCallback(() => {
      if (currentPage === 1) return;
      pageChange(currentPage - 1);
    }, [currentPage, pageChange]);

    const serviceTableElement = useMemo(() => {
      const headers = ['Data', 'Status'];
      const rows = services.map(service => (
        <ServiceTableRow key={service.id} service={service} />
      ));

      return <Table headers={headers} rows={rows} />;
    }, [services]);

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
              <FilterButton disabled={!services.length && !query}>
                <HiOutlineAdjustments size={25} color="white" />
              </FilterButton>
            </HeaderContent>

            <Input
              placeholder="Pesquisar..."
              disabled={!services.length && !query}
              onChange={e => filterServices(e.target.value)}
            />
          </Header>

          {loading || inReset ? (
            <Message>
              <Spinner size="60px" />
            </Message>
          ) : services.length > 0 ? (
            <>
              <Main>{serviceTableElement}</Main>

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
                  ? 'Nenhum serviço encontrado!'
                  : 'Nenhum serviço agendado!'}
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

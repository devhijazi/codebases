/* eslint-disable no-nested-ternary */

import { useAsync } from '@hitechline/reactools';
import type {
  DiaristListDocument,
  DiaristPartialDocument,
} from '@marinetes/types/dtos/financial/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoIosAlert } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { api } from '@/modules/services/api';
import { apply } from '@/resources/cases/apply';
import { Logged } from '@/resources/cases/Logged';
import { Pagination } from '@/screen/components/ui/Pagination';
import { Spinner } from '@/screen/components/ui/Spinner';
import { Table } from '@/screen/components/ui/Table';
import { DefaultLayout } from '@/screen/layouts/DefaultLayout';

import { DiaristTableRow } from './components/DiaristTableRow';
import { FilterButton } from './components/FilterButton';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  RegisterButton,
  Input,
  Message,
  Main,
  Footer,
} from './styles';

const itemsPerPage = 12;

export const Diarists = apply(
  (): JSX.Element => {
    const { push } = useHistory();

    const [inReset, setInReset] = useState(false);

    const [activeRegister, setActiveRegister] = useState(false);
    const [preRegister, setPreRegister] = useState(false);
    const [byDate, setByDate] = useState(true);
    const [query, setQuery] = useState('');

    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [diarists, setDiarists] = useState<DiaristPartialDocument[]>([]);

    const redirectToDiaristCreation = useCallback(() => {
      push('/diarists/create');
    }, [push]);

    const fetchDiarists = useCallback(
      async (
        page: number,
        search?: string,
        filters?: Record<'activeRegister' | 'preRegister' | 'byDate', boolean>,
      ): Promise<DiaristListDocument> => {
        const { data: apiData } = await api.get<DiaristListDocument>(
          'diarists',
          { params: { search, page, itemsPerPage, ...filters } },
        );

        return apiData;
      },
      [],
    );

    const { loading } = useAsync(async () => {
      const apiData = await fetchDiarists(1);

      setPages(apiData.pages);
      setDiarists(apiData.items);
    });

    const searchDiarists = useCallback((value: string) => {
      setQuery(value);
    }, []);

    const filterActiveRegister = useCallback(() => {
      setActiveRegister(!activeRegister);
    }, [activeRegister]);

    const filterPreRegister = useCallback(() => {
      setPreRegister(!preRegister);
    }, [preRegister]);

    const filterByDate = useCallback(() => {
      setByDate(!byDate);
    }, [byDate]);

    const reset = useCallback(async () => {
      try {
        setInReset(true);
        setCurrentPage(1);
        setDiarists([]);

        const apiData = await fetchDiarists(1, query, {
          activeRegister,
          preRegister,
          byDate,
        });

        setPages(apiData.pages);
        setDiarists(apiData.items);
      } finally {
        setInReset(false);
      }
    }, [fetchDiarists, query, activeRegister, preRegister, byDate]);

    const pageChange = useCallback(
      async (page: number) => {
        const data = await fetchDiarists(page);

        setCurrentPage(page);
        setDiarists(data.items);
      },
      [fetchDiarists],
    );

    const nextPage = useCallback(() => {
      if (currentPage === pages) {
        return;
      }

      pageChange(currentPage + 1);
    }, [currentPage, pages, pageChange]);

    const previousPage = useCallback(() => {
      if (currentPage === 1) {
        return;
      }

      pageChange(currentPage - 1);
    }, [currentPage, pageChange]);

    const diaristTableElement = useMemo(() => {
      const headers = ['Nome', 'Documento', 'Email', 'Status', ''];
      const rows = diarists.map(diarist => (
        <DiaristTableRow key={diarist.id} diarist={diarist} />
      ));

      return <Table headers={headers} rows={rows} />;
    }, [diarists]);

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
              <FilterButton
                activeRegister={activeRegister}
                preRegister={preRegister}
                byDate={byDate}
                onFilterActiveRegister={filterActiveRegister}
                onFilterPreRegister={filterPreRegister}
                onFilterByDate={filterByDate}
              />

              <RegisterButton onClick={redirectToDiaristCreation}>
                Cadastrar <IoAddOutline size={30} />
              </RegisterButton>
            </HeaderContent>

            <Input
              placeholder="Pesquisar..."
              disabled={!diarists.length && !query}
              onChange={e => searchDiarists(e.target.value)}
            />
          </Header>

          {loading || inReset ? (
            <Message>
              <Spinner size="60px" />
            </Message>
          ) : diarists.length > 0 ? (
            <>
              <Main>{diaristTableElement}</Main>

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
                  ? 'Nenhuma diarista encontrada!'
                  : 'Nenhuma diarista cadastrada!'}
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

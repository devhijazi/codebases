/* eslint-disable no-nested-ternary */

import { useAsync } from '@hitechline/reactools';
import type {
  EmployeeDocument,
  EmployeeListDocument,
} from '@marinetes/types/dtos/financial/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { IoIosAlert } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';

import { api } from '@/modules/services/api';
import { apply } from '@/resources/cases/apply';
import { Logged } from '@/resources/cases/Logged';
import { Pagination } from '@/screen/components/ui/Pagination';
import { Spinner } from '@/screen/components/ui/Spinner';
import { Table } from '@/screen/components/ui/Table';
import { DefaultLayout } from '@/screen/layouts/DefaultLayout';

import { EmployeeTableRow } from './components/EmployeeTableRow';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  FilterButton,
  RegisterButton,
  Input,
  Message,
  Main,
  Footer,
} from './styles';

const itemsPerPage = 12;

export const Employees = apply(
  (): JSX.Element => {
    const [inReset, setInReset] = useState(false);

    const [query, setQuery] = useState('');

    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [employees, setEmployees] = useState<EmployeeDocument[]>([]);

    const fetchEmployees = useCallback(
      async (page: number, search?: string): Promise<EmployeeListDocument> => {
        const { data: apiData } = await api.get<EmployeeListDocument>(
          'employees/list',
          { params: { search, page, itemsPerPage } },
        );

        return apiData;
      },
      [],
    );

    const { loading } = useAsync(async () => {
      const apiData = await fetchEmployees(1);

      setPages(apiData.pages);
      setEmployees(apiData.items);
    });

    const filterEmployees = useCallback((value: string) => {
      setQuery(value);
    }, []);

    const reset = useCallback(async () => {
      try {
        setInReset(true);
        setCurrentPage(1);
        setEmployees([]);

        const apiData = await fetchEmployees(1, query);

        setPages(apiData.pages);
        setEmployees(apiData.items);
      } finally {
        setInReset(false);
      }
    }, [fetchEmployees, query]);

    const pageChange = useCallback(
      async (page: number) => {
        const data = await fetchEmployees(page);

        setCurrentPage(page);
        setEmployees(data.items);
      },
      [fetchEmployees],
    );

    const nextPage = useCallback(() => {
      if (currentPage === pages) return;
      pageChange(currentPage + 1);
    }, [currentPage, pages, pageChange]);

    const previousPage = useCallback(() => {
      if (currentPage === 1) return;
      pageChange(currentPage - 1);
    }, [currentPage, pageChange]);

    const employeeTableElement = useMemo(() => {
      const headers = ['Nome', 'E-mail', 'Ocupação', <></>];
      const rows = employees.map(employee => (
        <EmployeeTableRow key={employee.id} employee={employee} />
      ));

      return <Table headers={headers} rows={rows} />;
    }, [employees]);

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
              <FilterButton disabled={!employees.length && !query}>
                <HiOutlineAdjustments size={25} color="white" />
              </FilterButton>

              <RegisterButton>
                Cadastrar <IoAddOutline size={30} />
              </RegisterButton>
            </HeaderContent>

            <Input
              placeholder="Pesquisar..."
              disabled={!employees.length && !query}
              onChange={e => filterEmployees(e.target.value)}
            />
          </Header>

          {loading || inReset ? (
            <Message>
              <Spinner size="60px" />
            </Message>
          ) : employees.length > 0 ? (
            <>
              <Main>{employeeTableElement}</Main>

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
                  ? 'Nenhum usuário encontrado!'
                  : 'Nenhum usuário cadastrado!'}
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

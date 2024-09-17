import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

import {
  Box,
  BoxFooter,
  BoxHeader,
  BoxMain,
  ButtonSelect,
  Article,
} from './styles';

export const BoxBalance = (): JSX.Element => {
  const [selected, setSelected] = useState('Today');

  const handleSelected = (value: string): void => {
    setSelected(value);
  };

  return (
    <Box>
      <BoxHeader>
        <p>Balanço</p>
        <p>
          02/2022 <BsChevronDown />
        </p>
      </BoxHeader>

      <BoxMain>
        <Article>
          <h1>R$ 5.000,00</h1>
          <p>Entrada Serviços</p>
        </Article>

        <Article>
          <h1>R$ 4.000,00</h1>
          <p>Outras Entradas</p>
        </Article>

        <Article isNegative>
          <h1>R$ 3.000,00</h1>
          <p>Saídas</p>
        </Article>

        <Article>
          <h1>R$ 6.000,00</h1>
          <p>Lucros</p>
        </Article>
      </BoxMain>

      <BoxFooter>
        <ButtonSelect
          isSelect={selected === 'Today'}
          onClick={() => handleSelected('Today')}
        >
          Hoje
        </ButtonSelect>

        <ButtonSelect
          isSelect={selected === 'Month'}
          onClick={() => handleSelected('Month')}
        >
          Mês
        </ButtonSelect>

        <ButtonSelect
          isSelect={selected === 'Year'}
          onClick={() => handleSelected('Year')}
        >
          Ano
        </ButtonSelect>
      </BoxFooter>
    </Box>
  );
};

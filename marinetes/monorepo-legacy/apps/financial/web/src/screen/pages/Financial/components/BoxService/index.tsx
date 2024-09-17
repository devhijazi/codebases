import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

import { Box, BoxFooter, BoxHeader, BoxMain, ButtonSelect } from './styles';

export const BoxService = (): JSX.Element => {
  const [selected, setSelected] = useState('Today');

  const handleSelected = (value: string): void => {
    setSelected(value);
  };

  return (
    <Box>
      <BoxHeader>
        <p>
          Serviços <br /> <strong>Mês</strong>
        </p>
        <p>
          02/2022 <BsChevronDown />
        </p>
      </BoxHeader>

      <BoxMain>
        <div>
          <p>1162</p>

          <p className="desc">Finalizados</p>
        </div>

        <hr />

        <div className="down">
          <article>
            <p>11</p>

            <p className="desc">Em andamento </p>
          </article>

          <article className="right">
            <p>326</p>

            <p className="desc">Programados</p>
          </article>
        </div>
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

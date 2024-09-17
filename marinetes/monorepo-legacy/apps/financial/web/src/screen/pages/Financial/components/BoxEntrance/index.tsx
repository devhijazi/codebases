import { useState } from 'react';

import { Box, BoxFooter, BoxHeader, BoxMain, ButtonSelect } from './styles';

export const BoxEntrance = (): JSX.Element => {
  const [selected, setSelected] = useState('Today');

  const handleSelected = (value: string): void => {
    setSelected(value);
  };

  return (
    <Box>
      <BoxHeader>
        <p>
          Entrada Serviços <br /> <strong>Hoje</strong>
        </p>
        <p>23/02/2022</p>
      </BoxHeader>

      <BoxMain>
        <div>
          <p>
            R$ 19.400<span>,00</span>
          </p>

          <p className="desc">Total</p>
        </div>

        <hr />

        <div className="down">
          <article>
            <p>
              <strong>R$</strong> 3.888 <span>,00</span>
            </p>

            <p className="desc">Split In </p>
          </article>

          <article className="right">
            <p>
              <strong>R$</strong> 15.512
              <span>,00</span>
            </p>

            <p className="desc">Split Out</p>
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

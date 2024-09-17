import { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';

import {
  Box,
  BoxHeader,
  DivSelect,
  Select,
  DivInfo,
  BoxMain,
  BoxFooter,
  ButtonSelect,
  Info,
  InfoDate,
  InfoTitle,
  InfoPrice,
  Input,
} from './styles';

export const BoxInfo = (): JSX.Element => {
  const [selected, setSelected] = useState('Servicos');
  const [selectedDay, setSelectedDay] = useState('Today');

  const data = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <Box>
      <BoxHeader>
        <DivSelect>
          <Select
            isSelect={selected === 'Servicos'}
            onClick={() => setSelected('Servicos')}
          >
            Serviços
          </Select>

          <Select
            isSelect={selected === 'Entrada'}
            onClick={() => setSelected('Entrada')}
          >
            Entrada
          </Select>

          <Select
            isSelect={selected === 'Saida'}
            onClick={() => setSelected('Saida')}
          >
            Saída
          </Select>
        </DivSelect>

        <DivInfo>
          <p>
            02/2022 <BsChevronDown />
          </p>

          <button type="button">Informar</button>
        </DivInfo>

        <Input width="100%" placeholder="Pesquisar..." />
      </BoxHeader>

      <BoxMain>
        {data.map(d => (
          <Info key={d}>
            <div>
              <InfoDate>24/02/2022</InfoDate>
              <InfoTitle>
                Título da entrada... <InfoPrice>R$ 250,00</InfoPrice>
              </InfoTitle>
            </div>
            <AiOutlineArrowRight
              color="#7FBD3B"
              style={{ width: 25, height: 25 }}
            />
          </Info>
        ))}
      </BoxMain>

      <BoxFooter>
        <ButtonSelect
          isSelect={selectedDay === 'Today'}
          onClick={() => setSelectedDay('Today')}
        >
          Hoje
        </ButtonSelect>

        <ButtonSelect
          isSelect={selectedDay === 'Month'}
          onClick={() => setSelectedDay('Month')}
        >
          Mês
        </ButtonSelect>

        <ButtonSelect
          isSelect={selectedDay === 'Year'}
          onClick={() => setSelectedDay('Year')}
        >
          Ano
        </ButtonSelect>
      </BoxFooter>
    </Box>
  );
};

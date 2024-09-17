import { AiOutlineArrowUp } from 'react-icons/ai';
import { Bar, BarChart, Tooltip, XAxis } from 'recharts';

import { Box, BoxFooter, BoxHeader, BoxMain, Section } from './styles';

export const BoxPerformance = (): JSX.Element => {
  const data = [
    {
      name: 'Page A',
      uv: 3000,
      pv: 2000,
    },
  ];

  return (
    <Box>
      <BoxHeader>
        <p>
          Desempenho <br /> <strong> Relação ao mês passado </strong>
        </p>
      </BoxHeader>

      <BoxMain>
        <Section>
          <h1>4%</h1>
          <AiOutlineArrowUp
            color="#7FBD3B"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </Section>

        <Section>
          <BarChart width={134} height={190} data={data} barSize={28}>
            <Tooltip />
            <XAxis dataKey="name" hide />
            <Bar dataKey="uv" fill="#7FBD3B" />
            <Bar dataKey="pv" fill="#BDBDBD" />
          </BarChart>
        </Section>
      </BoxMain>

      <BoxFooter>
        <div>
          <h1>1162</h1>
          <p>02/2022</p>
        </div>

        <div>
          <h1 style={{ color: '#BDBDBD' }}>1115</h1>
          <p>01/2022</p>
        </div>
      </BoxFooter>
    </Box>
  );
};

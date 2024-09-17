import { BarChart, Bar, Tooltip, XAxis } from 'recharts';

import {
  Container,
  DivData,
  DivGraphic,
  Title,
  TotalNumber,
  DivInfo,
} from './styles';

interface DataOptions {
  left: {
    value: number;
    label: string;
  };
  right: {
    value: number;
    label: string;
  };
}

interface CardProps {
  title: string;
  dataOptions: DataOptions;
}

export function CardGraphic({ title, dataOptions }: CardProps): JSX.Element {
  const words = title.split(' ');
  const lastWord = words.pop();

  const { left, right } = dataOptions;

  const data = [
    {
      name: title,
      [left.label]: left.value,
      [right.label]: right.value,
    },
  ];

  return (
    <Container>
      <DivData>
        <Title>
          {words.map(word => word)} <strong>{lastWord}</strong>
        </Title>
        <TotalNumber>{left.value + right.value}</TotalNumber>

        <DivInfo>
          <article>
            <h2>{left.value}</h2>
            <p>{left.label}</p>
          </article>

          <article>
            <h2 className="left">{right.value}</h2>
            <p>{right.label}</p>
          </article>
        </DivInfo>
      </DivData>

      <DivGraphic>
        <BarChart width={134} height={190} data={data} barSize={28}>
          <Tooltip />
          <XAxis dataKey="name" hide />
          <Bar dataKey={left.label} fill="#7FBD3B" />
          <Bar dataKey={right.label} fill="#BDBDBD" />
        </BarChart>
      </DivGraphic>
    </Container>
  );
}

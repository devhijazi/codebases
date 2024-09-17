import { Statistic } from 'antd';

import { Container, Header, Content, Hr, Footer } from './styles';

interface DataOptions {
  total: {
    value: number;
    label: string;
  };
  left?: {
    value: number;
    label: string;
  };
  right?: {
    value: number;
    label: string;
  };
}

interface CardProps {
  title: string;
  dataOptions: DataOptions;
  isPercentage?: boolean;
}

export function Card({
  title,
  dataOptions,
  isPercentage,
}: CardProps): JSX.Element {
  const words = title.split(' ');
  const lastWord = words.pop();

  const { total, left, right } = dataOptions;

  return (
    <Container>
      <Header>
        <h1>
          {words.map(word => word)} <strong>{lastWord}</strong>
        </h1>
      </Header>

      <Content>
        {isPercentage ? (
          <Statistic
            value={total.value}
            valueStyle={{ color: '#64b60a' }}
            suffix="%"
          />
        ) : (
          <Statistic value={total.value} valueStyle={{ color: '#64b60a' }} />
        )}
        <span>{total.label}</span>

        {/* {isPercentage && (
          <Statistic
            value={total.value}
            suffix="%"
            valueStyle={{ color: '#64b60a' }}
          />
        )}
        <Statistic value={total.value} valueStyle={{ color: '#64b60a' }} />
        */}
      </Content>

      <Hr />

      <Footer>
        <div>
          <span>{left?.value}</span>
          <p>{left?.label}</p>
        </div>

        <div>
          <span>{right?.value}</span>
          <p>{right?.label}</p>
        </div>
      </Footer>
    </Container>
  );
}

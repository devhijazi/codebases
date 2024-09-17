import { Container, Message } from './styles';

interface LogProps {
  index: number;
  sender: {
    type: string;
    name: string;
  };
  message: string;
  receiver: {
    type: string;
    name: string;
  };
}

export function Log({
  index,
  sender,
  message,
  receiver,
}: LogProps): JSX.Element {
  const [firstWord, ...words] = message.split(' ');

  return (
    <Container index={index}>
      <div>
        <h3>{sender.type}</h3>
        <p>{sender.name}</p>
      </div>

      <Message>
        <strong>{firstWord}</strong> {words.map(word => `${word} `)}
      </Message>

      <div>
        <h3>{receiver.type}</h3>
        <p>{receiver.name}</p>
      </div>

      <div>
        <h3>Data e Hora</h3>
        <p>11:57h - 16/12/2021</p>
      </div>
    </Container>
  );
}

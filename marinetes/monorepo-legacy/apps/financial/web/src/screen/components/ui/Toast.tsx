import { toast } from 'react-toastify';

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export function Toast({ type = 'success', message }: Props): React.ReactText {
  function generateId(): string {
    const numbers = [];

    for (let c = 1; c <= 5; c += 1) {
      const number = Math.floor(Math.random() * 10);
      numbers.push(number);
    }
    const id = numbers.join('');
    return id;
  }

  const toastContent = toast[type];
  return toastContent(message, { toastId: generateId() });
}

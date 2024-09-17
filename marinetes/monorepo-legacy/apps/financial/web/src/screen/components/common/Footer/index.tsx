import { Container } from './styles';

export function Footer(): JSX.Element {
  return (
    <Container>
      <div id="main">
        <section id="left">
          <img src="/assets/logo.png" alt="Marinetes Logo" />
        </section>
        {/* 
        <section id="right">
          <p>Powered by</p>
          <img src="/assets/hitechline.png" alt="Hitechline Logo" />
        </section> */}
      </div>

      <div id="footer">
        <p>Todos os direitos reservados</p>
        <div>
          <p>
            Powered by <a href="www.hitechline.com.br">Hitechline</a>
          </p>
        </div>
      </div>
    </Container>
  );
}

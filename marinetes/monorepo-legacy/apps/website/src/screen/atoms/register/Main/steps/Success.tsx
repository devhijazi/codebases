export const RegisterComplete = (): JSX.Element => (
  <div className="bowl-content flex flex-col items-center justify-center gap-10">
    <div>
      <img src="/images/done_register.png" alt="Done" />
    </div>

    <h1 className="text-4xl font-bold text-favorite">Prontinho</h1>
    <p className="text-center text-sm md:text-xl">
      Enviamos um e-mail com as instruções e documentos necessários
      <br /> para a finalização do seu cadastro.
    </p>
  </div>
);

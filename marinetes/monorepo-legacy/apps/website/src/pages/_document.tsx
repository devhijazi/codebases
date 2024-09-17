import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head />

        <body>
          <Main />
          <NextScript />

          <meta
            name="adopt-website-id"
            content="6b8312ef-e16f-4e19-92d7-ebfc3a60ded5"
          />

          <script src="//tag.goadopt.io/injector.js?website_code=6b8312ef-e16f-4e19-92d7-ebfc3a60ded5" />
        </body>
      </Html>
    );
  }
}

export default Document;

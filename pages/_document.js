import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/assets/js/jquery-3.5.1.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
          <script src="/assets/js/bootstrap.min.js"></script>
        </body>
      </Html>
    );
  }
}
export default MyDocument;

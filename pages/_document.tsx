import Document, { Html, Head, Main, NextScript } from "next/document";
import UmamiTracker from "../components/UmamiTracker";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-alabaster">
          <Main />
          <NextScript />
          <UmamiTracker />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

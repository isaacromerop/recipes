import Head from "next/head";
import "semantic-ui-css/semantic.min.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recipes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Recipes API</h1>
      </main>
    </div>
  );
}

import Head from 'next/head';
import ConfigState from "../context/config/configState";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <div
    style={{ background: "white", width: "100vw", height: "100vh" }}
    
  >
    <ConfigState>
      <Head>
        <title>Next js Dashboard</title>
      </Head>
      <Component {...pageProps} />
    </ConfigState>
    </div>
  );
}

export default MyApp;

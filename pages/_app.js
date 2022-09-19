import "../styles/globals.css";
import ConfigState from "../context/config/configState";
function MyApp({ Component, pageProps }) {
  return (
    <div
    style={{ background: "white", width: "100vw", height: "100vh" }}
    
  >
    <ConfigState>
      <Component {...pageProps} />
    </ConfigState>
    </div>
  );
}

export default MyApp;

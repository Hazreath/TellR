import "../styles/globals.css"; // this one is global for all app
import "../styles/bulma.min.css";
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;

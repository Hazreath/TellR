import "../styles/globals.css"; // this one is global for all app

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;

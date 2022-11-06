import Head from "next/head";
import DebugNavBar from "../components/DebugNavbar";
import Script from "next/script";
import Image from "next/Image";
import styles from "../styles/Home.module.css";

export default function Test() {
    // alert("ok");
    let c = (
        <div className="test">
            <Head>
                <title>TellR test</title>
            </Head>
            <DebugNavBar></DebugNavBar>
            <h1 className="title is-1">Test</h1>

            <figure className="image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
            </figure>
            {/* <Script
                src="https://code.jquery.com/jquery-3.6.1.min.js"
                strategy="onLoad"
                integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
                onLoad={() => console.log(`jquery`)}
                crossorigin="anonymous"
            />
            <Script
                src="/scripts/pokemon-yellow.js"
                strategy="lazyOnload"
                onLoad={() => console.log(`script loaded correctly, lets play`)}
            /> */}
            <DebugNavBar></DebugNavBar>
            <main className={styles.main}>
                <h1 className="title is-1 tellr-title">TellR</h1>
                <Image
                    src="/images/profile.jpg"
                    height={200}
                    width={200}
                    alt="moa"
                />
            </main>
            {/* <script>alert('coucou')</script> */}
        </div>
    );
    return c;
}

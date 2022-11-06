import Link from "next/link";
import styles from "./debugnavbar.module.css";
export default function DebugNavBar() {
    let c = (
        <div className={styles.container}>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/test">Test</Link>
            </nav>
        </div>
    );

    return c;
}

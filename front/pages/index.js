import Head from "next/head";
import Image from "next/image";
import DebugNavBar from "../components/DebugNavbar";
import Script from "next/script";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import {getDiariesForOwner, putDiary} from "../library/apiCalls";
import axios from "axios";
import {decryptContent, encryptContent} from "../library/Encryption";

export default function Home() {
    const STUB_USER = { id: "Benji" };
    const [journalContent, setJournalContent] = useState(null);
    const [user, setUser] = useState(STUB_USER);
    const [pass, setPass] = useState("pass")
    const keysPressed = {}

    // FIRST LOADING
    useEffect(() => {
        // Chargement journal pour l'utilisateur
        getDiariesForOwner(user.id).then((data) => {
            // data.content = decryptContent(data.content,pass)
            setJournalContent(...data);
        });

        console.log("journalContent", journalContent);
    }, []);

    // Every refresh
    useEffect(() => {
        if (journalContent) {
            let textarea = document.getElementById("journalContent");
            textarea.scrollTop = textarea.scrollHeight;
        }
    }, [journalContent]);

    let onTyping = async (e) => {
        if (!keysPressed[e.key]) {
            console.log('KEY PRESSED : ', e.key, '/', e.keyCode)
            keysPressed[e.key] = true
        }

        // TODO CTRL +S => sav en BD
        if (keysPressed["Control"] && keysPressed["s"]) {
            e.preventDefault()
            console.log('Saving to DB ...')
            let encryptedContent = encryptContent(journalContent.content,pass)
            console.log(encryptedContent)
            await putDiary(journalContent._id,encryptedContent )
        }

    };

    return (
        <div className={styles.container}>
            <Head>
                <title>TellR Home</title>
                <meta
                    name="description"
                    content="TellR"
                />
                <link rel="icon" href="/images/favicon.ico" />
            </Head>

            {/* <DebugNavBar></DebugNavBar> */}
            <main className={styles.main}
                  onKeyDown={onTyping}
                  onKeyUp={(e) => {
                      console.log('KEY RELEASED : ', e.key,'/',e.keyCode)
                      keysPressed[e.key] = false
                  }}
            >
                <h1 className={styles.tellrTitle + " title is-1 tellr-title"}>
                    TellR
                </h1>

                {journalContent !== null && (
                    <React.Fragment>
                        {/* <div
                            className={styles.journalBackground}
                            id="journalBackground"
                        ></div> */}
                        <textarea
                            className={
                                styles.journalContent + " textarea " //is-loading
                            }
                            id="journalContent"

                            value={journalContent.content}
                            onChange={(e) => {
                                let newJournal = {...journalContent}
                                newJournal.content = e.target.value
                                setJournalContent(newJournal)
                            }}
                        ></textarea>
                    </React.Fragment>
                )}
            </main>
        </div>
    );
}

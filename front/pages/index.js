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
    const NO_JOURNAL_SELECTED = -1
    const [journals, setJournals] = useState(null)
    const [journalContent, setJournalContent] = useState(null);
    const [user, setUser] = useState(STUB_USER);
    const [pass, setPass] = useState("pass")
    const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(null)
    const keysPressed = {}

    // FIRST LOADING
    useEffect(() => {
        // Get all journals for user
        getDiariesForOwner(user.id).then((data) => {
            console.log('journals loaded : ',data)
            setJournals(data)
        });

        // console.log("journalContent", journalContent);
    }, []);

    useEffect(() => {
        console.log("SELECTED ",selectedDiaryIndex)
        if (selectedDiaryIndex == NO_JOURNAL_SELECTED) {
            // Reset journal content
            setJournalContent(null)
        // Get selected journal content
        } else if (journals && selectedDiaryIndex != null) {
            decryptContent(journals[selectedDiaryIndex].content,pass)
                .then((decrypted) => {
                    journals[selectedDiaryIndex].content = decrypted
                    setJournalContent(journals[selectedDiaryIndex]);
                })
        }

    }, [journals,selectedDiaryIndex]/*[selectedDiaryIndex]*/)
    // Every refresh
    useEffect(() => {
        if (journalContent ) {
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
            let encryptedContent = await encryptContent(journalContent.content,pass)
            console.log(encryptedContent)
            await putDiary(journalContent._id,encryptedContent)
        }
    };

    let onJournalSelectChange = (e) => {
        console.log(e.target.value)
        setSelectedDiaryIndex(e.target.value)
    }
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

                <select onChange={onJournalSelectChange} className={"select"}>
                    <option key='null' value={NO_JOURNAL_SELECTED}>-</option>
                    {
                        journals && journals.map(
                            (j,index) => <option key={j._id} value={index}>{j.cover}</option>
                        )
                    }
                </select>
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

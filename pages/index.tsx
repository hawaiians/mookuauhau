import Head from "next/head";
import neo4j, { Session } from "neo4j-driver";
import React, { useState } from "react";
import Input from "../components/Input";
import Button, { ButtonSize } from "../components/Button";

export default function HomePage() {
  const [currentSession, setSession] = useState<Session>();
  const [currentResult, setResult] = useState<String>();

  function handleConnection() {
    let url = (document.getElementById("url") as HTMLInputElement).value;
    let username = (document.getElementById("username") as HTMLInputElement)
      .value;
    let password = (document.getElementById("password") as HTMLInputElement)
      .value;
    try {
      let driver = neo4j.driver(url, neo4j.auth.basic(username, password));
      setSession(driver.session({ defaultAccessMode: neo4j.session.READ }));
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    } catch {
      alert(
        "Unable to connect to the database, please check your credentials and try again"
      );
    }
  }

  function handleQuery() {
    let query = (document.getElementById("query") as HTMLInputElement).value;
    currentSession
      .run(query)
      .then((result) => {
        console.log(result);
        setResult(JSON.stringify(result));
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => currentSession.close());
  }

  return (
    <>
      <Head>
        <title>Hackathon 2022</title>
        <meta
          name="description"
          content="Hawaiians in Technology and Purple Mai'a Hackathon 2022"
        />
        <link rel="icon" href="/hammah.png" />
      </Head>

      <div style={{ position: "fixed" }} className="middle-centered-container">
        {currentSession ? (
          <div className="query-wrapper">
            <p>Enter a Cypher query to retrieve data</p>
            <div style={{ marginBottom: "2rem", width: "75%" }}>
              <Input name="query" placeholder="query" />
            </div>
            {currentResult ? <p className="results">{currentResult}</p> : null}
            <Button
              size={ButtonSize.Small}
              customWidth="15rem"
              onClick={handleQuery}
              type="submit"
            >
              Submit
            </Button>
          </div>
        ) : (
          <div className="sign-in-wrapper">
            <p>Enter the neo4j credentials to enter</p>
            <div style={{ marginBottom: "2rem", width: "75%" }}>
              <Input name="url" placeholder="url" />
            </div>
            <div style={{ marginBottom: "2rem", width: "75%" }}>
              <Input name="username" placeholder="username" />
            </div>
            <div style={{ marginBottom: "2rem", width: "75%" }}>
              <Input name="password" placeholder="password" />
            </div>
            <Button
              size={ButtonSize.Small}
              customWidth="15rem"
              onClick={handleConnection}
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}

        <style jsx>{`
          p {
            font-size: 2rem;
            margin-bottom: 3rem;
            text-align: center;
          }
          .results {
            font-size: 1rem;
            max-width: 100%;
            height: 30rem;
            overflow: scroll;
          }
          .middle-centered-container {
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .sign-in-wrapper {
            width: 35rem;
            height: 25rem;
            font-size: 1rem;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }
          .query-wrapper {
            width: 35rem;
            max-height: 40rem;
            font-size: 1rem;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }
          @media screen and (max-width: 40rem) {
            p {
              font-size: 1rem;
            }
            .sign-in-wrapper {
              width: 25rem;
              height: 18.75rem;
            }
          }
        `}</style>
      </div>
    </>
  );
}

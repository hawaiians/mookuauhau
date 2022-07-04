import Head from "next/head";
import neo4j, { Session } from "neo4j-driver";
import React, { useState } from "react";
import Input from "../components/Input";
import Button, { ButtonSize } from "../components/Button";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";

const FILMS_QUERY = gql`
  query MyQuery {
    kanaka(limit: 10) {
      name
    }
  }
`;

export default function HomePage() {
  const [currentSession, setSession] = useState<Session>();
  const [currentResult, setResult] = useState<String>();
  const { data, loading, error } = useQuery(FILMS_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  function handleQuery() {
    let query = (document.getElementById("query") as HTMLInputElement).value;
    setResult(JSON.stringify(data));
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
        <div className="query-wrapper">
          <p>Enter a GraphQL query</p>
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
          }
        `}</style>
      </div>
    </>
  );
}

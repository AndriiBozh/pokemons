import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );

      setPokemon(await response.json());
    }
    if (id) {
      getPokemon();
    }
  }, []);

  if (!pokemon) {
    return null;
  }
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">Go Home</Link>
      </div>
      <h2>{pokemon.name}</h2>
      <div>{pokemon.type.join(", ")}</div>
      <img
        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
        alt={pokemon.name}
      />

      {/* {JSON.stringify(pokemon)} */}
    </div>
  );
}

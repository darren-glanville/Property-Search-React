import type { NextPage } from "next";
import Head from "next/head";

import Header from "../components/Header";
import Search from "../components/Search";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Property search tool</title>
                <meta name="description" content="Immo Front End Task" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header />
                <Search />
            </main>
        </>
    );
};

export default Home;

import Head from "next/head";

export function Meta({ title, description, keywords }) {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Lucas Gomes" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
        </Head>
    );
}

Meta.defaultProps = {
    title: "Wallet",
    description: "Dashboard de uma carteira online para controle de contas",
    keywords: "dashboard, wallet, carteira, controle de contas",
}
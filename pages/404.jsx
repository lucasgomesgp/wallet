import Image from "next/image";
import { useRouter } from "next/router";
import {Meta} from "../src/components/Meta"
import styles from "../styles/404.module.scss";

export default function Custom404(){
    const router = useRouter();
    return(
        <>
        <Meta title="Not Found" />
        <div className={styles.container}>
            <h1>Desculpe, mas essa página não existe!</h1>
            <Image layout="intrinsic" width={300} height={300} src="/not_found.svg" alt="Página não encontrada" />
            <button onClick={()=> router.push("/")} className={styles.back}>Voltar</button>
        </div>
        </>
    );
}
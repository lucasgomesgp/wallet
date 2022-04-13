import { useRouter } from "next/router";
import { MdEqualizer } from "react-icons/md";
import styles from "./styles.module.scss";

export function ListOperation({ type, path }) {
    const router = useRouter();
    function handleRedirectToListOuts() {
        router.push(path);
    }
    return (
        <section className={styles.container} onClick={handleRedirectToListOuts}>
            <h3 className={styles.title}>
                {type === "entry" ? "Listar entradas" : "Listar saídas"}
            </h3>
            <div className={styles.icon}>
                <MdEqualizer size={40} color="#8712E0" />
            </div>
        </section>
    );
}
import { useRouter } from "next/router";
import { HiPlusCircle } from "react-icons/hi";
import styles from "./styles.module.scss";

export function CardCreate({ type, path }) {
    const router = useRouter();
    function handleNewOperation() {
        router.push(path);
    }
    return (
        <section className={styles.container} onClick={handleNewOperation}>
            <h3 className={styles.title}>
                {type === "entry" ? "Nova entrada" : "Nova saída"}
            </h3>
            <div className={type === "entry"
                ?
                [`${styles.icon} ${styles.green}`]
                :
                [`${styles.icon} ${styles.red}`]}>
                <HiPlusCircle size={40} color="#FFFFFF" />
            </div>
        </section>
    );
}
import styles from "./styles.module.scss";
import { HiPlusCircle } from "react-icons/hi";

export function CardCreate({ type }) {
    return (
        <section className={styles.container}>
            <h3 className={styles.title}>
                {type === "entry" ? "Nova entrada" : "Nova saída"}
            </h3>
            <div className={type === "entry"
                ? [`${styles.icon} ${styles.red}`]
                : [`${styles.icon} ${styles.green}`]}>
                <HiPlusCircle size={40} color="#FFFFFF" />
            </div>
        </section>
    );
}
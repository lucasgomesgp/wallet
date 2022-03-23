import { Meta } from "../Meta";
import styles from "./styles.module.scss";

export function Loading() {
    return (
        <>
            <Meta title="Loading" />
            <div className={styles.loading}></div>
        </>
    )
}

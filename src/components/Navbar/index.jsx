import Link from "next/link";
import { MdDashboard, MdOutlineAutorenew, MdMonetizationOn } from "react-icons/md";
import styles from "./styles.module.scss";

export function Navbar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.menu}>
        <li className={`${styles.item} ${styles.active}`}>
          <MdDashboard size={30} className={styles.icon} color="white" />
          <Link href="/dashboard" className={styles.itemMenu}>
            Dashboard
          </Link>
          <span />
        </li>
        <li className={styles.item}>
          <MdMonetizationOn size={30} className={styles.icon} />
          <Link href="/entry" className={styles.itemMenu}>
            Entradas
          </Link>
        </li>
        <li className={styles.item}>
          <MdOutlineAutorenew size={30} className={styles.icon} />
          <Link href="/out" className={styles.itemMenu}>
            Saídas
          </Link>
        </li>
      </ul>
      <ul className={styles.exitMenu}>
        <li className={styles.item}>
          <Link href="/" className={styles.itemMenu}>
            Sair
          </Link>
        </li>
      </ul>
    </nav>
  )
}

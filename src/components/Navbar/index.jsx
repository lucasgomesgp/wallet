import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { MdDashboard, MdOutlineAutorenew, MdMonetizationOn } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../app/auth-slice";
import styles from "./styles.module.scss";

export function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Deslogado com sucesso!");
    router.push("/");
  }
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
          <button href="/" className={styles.itemMenu} onClick={handleLogout}>
            Sair
          </button>
        </li>
      </ul>
    </nav>
  )
}

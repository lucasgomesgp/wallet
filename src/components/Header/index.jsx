import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import walletImg from "../../../public/icons/wallet_sm.svg";
import { logout } from "../../app/auth-slice";
import styles from "./styles.module.scss";

export function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { displayName, photoURL } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    window.location.pathname = "/";
  }

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  }
  return (
    <header className={styles.header}>
      <Link href="/dashboard">
        <div className={styles.logo}>
          <Image src={walletImg} objectFit="contain" />
          <h2 className={styles.title}>Wallet</h2>
        </div>
      </Link>
      <div className={styles.exitArea}>
        <Image src={photoURL || "/icon.png"} className={styles.image} width={40} height={40} objectFit="contain" />
        <h3 className={styles.name}>{displayName || "Bem vindo!"}</h3>
        <IoMdArrowDropdownCircle size={30} className={styles.toggleMenu} onClick={handleToggleMenu} />
        {toggleMenu ? (
          <ul className={styles.menuToggle}>
            <li className={styles.item}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={styles.item}>
              <Link href="/dashboard/entry">Entradas</Link>
            </li>
            <li className={styles.item}>
              <Link href="/dashboard/out">Saídas</Link>
            </li>
            <li className={styles.item}>
              <button onClick={handleLogout}>Sair</button>
            </li>
          </ul>
        ) : ""}
      </div>
    </header>
  )
}

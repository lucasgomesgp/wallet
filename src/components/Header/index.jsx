import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import walletImg from "../../../public/icons/wallet_sm.svg";
import { logout } from "../../app/auth-slice";
import styles from "./styles.module.scss";

export function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    router.push("/");
  }

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  }
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/dashboard">
          <a>
            <Image src={walletImg} objectFit="contain" />
          </a>
        </Link>
        <h2 className={styles.title}>Wallet</h2>
      </div>
      <div className={styles.exitArea}>
        <div className={styles.image} />
        <h3 className={styles.name}>Nome</h3>
        <IoMdArrowDropdownCircle size={30} className={styles.toggleMenu} onClick={handleToggleMenu} />
        {toggleMenu ? (
          <ul className={styles.menuToggle}>
            <li className={styles.item}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={styles.item}>
              <Link href="/entry">Entradas</Link>
            </li>
            <li className={styles.item}>
              <Link href="/out">Saídas</Link>
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

import Image from "next/image";
import Link from "next/link";
import walletImg from "../../../public/icons/wallet_sm.svg";
import styles from "./styles.module.scss";

export function Header() {
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
      <h1>Exit</h1>
    </header>
  )
}

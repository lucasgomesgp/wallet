import { useContext } from "react";
import {
  MdHome,
  MdOutlineAttachMoney,
  MdCardTravel,
  MdAssessment,
  MdExitToApp,
} from "react-icons/md";
import userDefaultImg from "../../assets/icons/user_default.png";
import { AuthContext } from "../../hooks/useAuth";
import styles from "./styles.module.scss";

export function Menu() {
  const { userLogged, exitApp } = useContext(AuthContext);
  return (
    <header className={styles.container}>
      <div className={styles.user}>
        <img
          src={userLogged.avatar_url ? userLogged.avatar_url : userDefaultImg}
          alt="Perfil do usuário"
          className={styles.userImg}
        />
        <p className={styles.subTitle}>
          {userLogged.fullName ? userLogged.fullName : "Bem vindo!"}
        </p>
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <span href="/dashboard" className={styles.titleMenu}>
            <MdHome size={25} />
            Dashboard
            <span></span>
          </span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.titleMenu}>
            <MdOutlineAttachMoney size={25} />
            Gastos
          </span>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuTitle}>
              <a href="/dashboard/gastos/listar">Listar</a>
            </li>
            <li className={styles.subMenuTitle}>
              <a href="/dashboard/gastos/criar">Criar</a>
            </li>
          </ul>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.titleMenu}>
            <MdCardTravel size={25} />
            Poupança
          </span>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuTitle}>
              <a href="/dashboard/poupanca/listar">Listar</a>
            </li>
            <li className={styles.subMenuTitle}>
              <a href="/dashboard/poupanca/criar">Criar</a>
            </li>
          </ul>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.titleMenu}>
            <MdAssessment size={25} />
            <span>Relatórios</span>
          </span>
          <ul className={styles.subMenu}>
            <li className={styles.subMenuTitle}>
              <a href="/dashboard/relatorios/gastos">Gastos</a>
            </li>
            <li className={styles.subMenuTitle}>
              <a href="/dashboard/relatorios/poupanca">Poupança</a>
            </li>
          </ul>
        </li>
      </ul>
      <div className={styles.exitApp} onClick={exitApp}>
        <MdExitToApp size={25} color="#FFFFFF" />
        Sair
      </div>
    </header>
  );
}

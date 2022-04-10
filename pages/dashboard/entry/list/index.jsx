import { Header } from "../../../../src/components/Header";
import { Meta } from "../../../../src/components/Meta";
import { Navbar } from "../../../../src/components/Navbar";
import protectedRoute from "../../../../src/components/ProtectedRoute";
import { ListItem } from "../../../../src/components/ListItem";
import styles from "./styles.module.scss";

function ListEntry() {
  return (
    <>
      <Meta title="List Entry's" />
      <Header />
      <Navbar />
      <table className={styles.container}>
        <thead className={styles.title}>
          <tr className={styles.line}>
            <td>Data</td>
            <td>Descrição</td>
            <td>Valor</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <ListItem date="02/02/2018" description="Teste" value="R$2000" />
        </tbody>
      </table>
    </>
  );
}
export default protectedRoute(ListEntry);

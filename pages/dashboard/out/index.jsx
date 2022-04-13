import { Header } from "../../../src/components/Header";
import { Meta } from "../../../src/components/Meta";
import { CardCreate } from "../../../src/components/CardCreate";
import { ListOperation } from "../../../src/components/ListOperation";
import protectedRoute from "../../../src/components/ProtectedRoute";
import styles from "./styles.module.scss";
import { Navbar } from "../../../src/components/Navbar";

function Out() {
  return (
    <>
      <Meta title="Out" />
      <Header />
      <Navbar />
      <main className={styles.operations}>
        <ListOperation type="out" path="/dashboard/out/list"/>
        <CardCreate type="out" path="/dashboard/out/new" />
      </main>
    </>
  )
}
export default protectedRoute(Out);

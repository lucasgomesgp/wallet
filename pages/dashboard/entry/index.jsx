import { CardCreate } from "../../../src/components/CardCreate";
import { Header } from "../../../src/components/Header";
import { ListOperation } from "../../../src/components/ListOperation";
import { Meta } from "../../../src/components/Meta";
import { Navbar } from "../../../src/components/Navbar";
import protectedRoute from "../../../src/components/ProtectedRoute";
import styles from "./styles.module.scss";

function Entry() {
  return (
    <>
      <Meta title="Entry" />
      <Header />
      <Navbar />
      <main className={styles.operations}>
        <ListOperation type="entry" path="/dashboard/entry/list"/>
        <CardCreate type="entry" path="/dashboard/entry/new"/>
      </main>
    </>
  )
}
export default protectedRoute(Entry);

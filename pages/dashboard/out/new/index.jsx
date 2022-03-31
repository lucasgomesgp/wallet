
import { Header } from "../../../../src/components/Header";
import { Meta } from "../../../../src/components/Meta";
import { Navbar } from "../../../../src/components/Navbar";
import protectedRoute from "../../../../src/components/ProtectedRoute";
import styles from "./styles.module.scss";

function NewOut() {
  return (
    <>
      <Meta title="NewOut" />
      <Header />
      <Navbar />
    </>
  )
}
export default protectedRoute(NewOut);

import { FormOperation } from "../../../../src/components/FormOperation";
import { Header } from "../../../../src/components/Header";
import { Meta } from "../../../../src/components/Meta";
import { Navbar } from "../../../../src/components/Navbar";
import protectedRoute from "../../../../src/components/ProtectedRoute";
import styles from "./styles.module.scss";

function NewEntry() {
  return (
    <>
      <Meta title="New Entry" />
      <Header />
      <Navbar />
      <FormOperation type="entry" />
    </>
  );
}
export default protectedRoute(NewEntry);

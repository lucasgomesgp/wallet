import { useEffect } from "react";
import { Header } from "../../../../src/components/Header";
import { Meta } from "../../../../src/components/Meta";
import { Navbar } from "../../../../src/components/Navbar";
import protectedRoute from "../../../../src/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../../../src/components/Table";
import { getEntrysOrOuts } from "../../../../src/app/operations-slice";
import styles from "./styles.module.scss";

function ListEntry() {
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();
  const entrys = useSelector((state) => state.operations.entry);

  useEffect(() => {
    dispatch(getEntrysOrOuts({ userId, type: "entry" }));
  }, []);

  return (
    <>
      <Meta title="List Entry's" />
      <Header />
      <Navbar />
      <Table data={entrys} title="Listagem de entradas" />
    </>
  );
}
export default protectedRoute(ListEntry);

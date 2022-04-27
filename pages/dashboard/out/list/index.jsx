import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntrysOrOuts } from "../../../../src/app/operations-slice";
import { Header } from "../../../../src/components/Header";
import { Meta } from "../../../../src/components/Meta";
import { Navbar } from "../../../../src/components/Navbar";
import protectedRoute from "../../../../src/components/ProtectedRoute";
import { Table } from "../../../../src/components/Table";
import styles from "./styles.module.scss";

function ListOut() {
  const outflow = useSelector((state) => state.operations.outflow);
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntrysOrOuts({ userId, type: "out" }));
  }, []);
  return (
    <>
      <Meta title="List Out's" />
      <Header />
      <Navbar />
      <Table data={outflow} type="out" title="Listagem de saídas" />
    </>
  );
}
export default protectedRoute(ListOut);

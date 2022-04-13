
import { useState } from "react";
import { Header } from "../../../../src/components/Header";
import { Meta } from "../../../../src/components/Meta";
import { Navbar } from "../../../../src/components/Navbar";
import protectedRoute from "../../../../src/components/ProtectedRoute";
import { Table } from "../../../../src/components/Table";
import styles from "./styles.module.scss";

function ListOut() {
  const [outs, setOuts] = useState([
    {
      date: "2022-04-10T17:18",
      description: "Teste",
      id: "5b44f1c2-4651-4f01-b6a3-ac9ba246cd69",
      value: "8000",
    },
  ]);
  return (
    <>
      <Meta title="List Out's" />
      <Header />
      <Navbar />
      <Table data={outs} title="Listagem de saídas" />
    </>
  )
}
export default protectedRoute(ListOut);

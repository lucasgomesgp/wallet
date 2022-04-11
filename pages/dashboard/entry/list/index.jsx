import { Header } from "../../../../src/components/Header";
import { Meta } from "../../../../src/components/Meta";
import { Navbar } from "../../../../src/components/Navbar";
import protectedRoute from "../../../../src/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEntrysOrOuts } from "../../../../src/app/operations-slice";
import { database } from "../../../../services/firebase.config";
import { onValue, ref } from "firebase/database";
import { Table } from "../../../../src/components/Table";
import styles from "./styles.module.scss";

function ListEntry() {
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();
  // const entrys = useSelector((state) => state.operations.entry);
  const [entrys, setEntrys] = useState([
    {
      date: "2022-04-10T17:18",
      description: "Teste",
      id: "5b44f1c2-4651-4f01-b6a3-ac9ba246cd69",
      value: "8000",
    },
    {
      date: "2022-04-10T17:18",
      description: "Teste",
      id: "5b44f1c2-4651-4f01-b6a3-ac9ba246cd61",
      value: "8000",
    },
  ]);

  // useEffect(() => {
  //   const operationRef = ref(database, `operations/${userId}/${"entry"}`);
  //   onValue(operationRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       console.log(data);
  //       return;
  //     }
  //   });
  // }, []);

  return (
    <>
      <Meta title="List Entry's" />
      <Header />
      <Navbar />
      <Table data={entrys} />
    </>
  );
}
export default protectedRoute(ListEntry);

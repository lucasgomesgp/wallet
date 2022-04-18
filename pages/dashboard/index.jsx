import { useEffect, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Meta } from "../../src/components/Meta";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Header } from "../../src/components/Header";
import { Navbar } from "../../src/components/Navbar";
import styles from "./styles.module.scss";
import Operation from "../../src/components/Operation";
import protectedRoute from "../../src/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getValuesToHome } from "../../src/app/operations-slice";
import { formatMoney } from "../../helpers/currency";

function Dashboard() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const entry = useSelector((state) => state.operations.entry);
  const total = useSelector((state) => state.operations.total);
  const totalEntrys = useSelector((state) => state.operations.totalEntrys);
  const totalOuts = useSelector((state) => state.operations.totalOuts);
  
  useEffect(() => {
    dispatch(getValuesToHome({ userId }));
  }, []);
  // const [entryData, setEntryData] = useState({
  //   labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Setembro", "Outubro", "Novembro", "Dezembro"],
  //   datasets: [
  //     {
  //       label: 'Entradas',
  //       data: [10, 500, 100, 310],
  //       borderColor: 'green',
  //       backgroundColor: 'green',
  //     },
  //   ]
  // });
  // const [outData, setOutData] = useState({
  //   labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Setembro", "Outubro", "Novembro", "Dezembro"],
  //   datasets: [
  //     {
  //       label: 'Saídas',
  //       data: [10, 500, 100, 310],
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ]
  // });
  return (
    <>
      <Meta title="Dashboard" />
      <Header />
      <Navbar />
      <main className={styles.container}>
        <section className={styles.central}>
          <section className={styles.graph}>
            <div className={styles.values}>
              <div className={styles.total} style={total < 0 ? {backgroundColor: "red"}: {backgroundColor: "green"}}>
                <div className={styles.texts}>
                  <h3 className={styles.title}>Total</h3>
                  <FaMoneyCheckAlt size={40} color="white" />
                </div>
                <p className={styles.money}>
                  {total ? formatMoney(total) : "R$0"}
                </p>
              </div>
              <Operation text="Entradas" type="entry" value={totalEntrys} />
              <Operation text="Saídas" type="out" value={totalOuts} />
            </div>
            <div className={styles.entry}>
              {/* <Line data={entryData} /> */}
            </div>
            <div className={styles.out}>{/* <Line data={outData} /> */}</div>
          </section>
        </section>
      </main>
    </>
  );
}

export default protectedRoute(Dashboard);

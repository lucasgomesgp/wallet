import { useEffect, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Meta } from "../../src/components/Meta";
import "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
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
  const [labels, setLabels] = useState([]);
  const userId = useSelector((state) => state.auth.user.uid);
  const entry = useSelector((state) => state.operations.entry);
  const out = useSelector((state) => state.operations.outflow);

  const total = useSelector((state) => state.operations.total);
  const totalEntrys = useSelector((state) => state.operations.totalEntrys);
  const totalOuts = useSelector((state) => state.operations.totalOuts);

  let flow = () => {
    let quant = 0;
    if (entry.length >= out.length) {
      quant = entry.length;
      console.log(entry.length);
    } else {
      quant = out.length;
    }
    for (let index = 0; index < quant; index++) {
      setLabels([...labels, "R$"]);
    }
  };
  useEffect(() => {
    dispatch(getValuesToHome({ userId }));
    flow();
  }, []);

  const graphPie = {
    labels: ["Entradas", "Saídas"],
    options: {
      plugins: {
        title: {
          display: true,
          text: "Fluxo de atividades",
        },
      },
    },
    datasets: [
      {
        data: [totalEntrys, totalOuts],
        backgroundColor: ["green", "red"],
        borderColor: ["green", "red"],
      },
    ],
  };

  const lineGraph = {
    labels: [labels],
    responsive: true,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Última entrada e saída",
        },
      },
    },
    datasets: [
      {
        label: "Entradas",
        data: entry.map((current) => current.value) || 0,
        borderColor: "rgb(12, 215, 49)",
        backgroundColor: "rgb(7, 162, 36)",
      },

      {
        label: "Saídas",
        data: out.map((current) => current.value) || 0,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <Meta title="Dashboard" />
      <Header />
      <Navbar />
      <main className={styles.container}>
        <section className={styles.central}>
          <section className={styles.graph}>
            <div className={styles.values}>
              <div
                className={styles.total}
                style={
                  total < 0
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "green" }
                }
              >
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
            <div className={styles.graphs}>
              <div className={styles.graphPie}>
                {totalEntrys && totalOuts ? (
                  <Doughnut options={graphPie.options} data={graphPie} />
                ) : (
                  "Carregando..."
                )}
              </div>
              <div className={styles.lineGraph}>
                {totalEntrys && totalOuts ? (
                  <Line options={lineGraph.options} data={lineGraph} />
                ) : (
                  "Carregando..."
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default protectedRoute(Dashboard);

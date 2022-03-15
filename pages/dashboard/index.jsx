import { useState } from "react";
import { Meta } from "../../src/components/Meta";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Header } from "../../src/components/Header";
import { Navbar } from "../../src/components/Navbar";
import styles from "./styles.module.scss";

export default function Dashboard() {
  const [entryData, setEntryData] = useState({
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [
      {
        label: 'Entradas',
        data: [10, 500, 100, 310],
        borderColor: 'green',
        backgroundColor: 'green',
      },
    ]
  });
  const [outData, setOutData] = useState({
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [
      {
        label: 'Saídas',
        data: [10, 500, 100, 310],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
  });
  return (
    <>
      <Meta title="Dashboard" />
      <main className={styles.container}>
        <Header />
        <section className={styles.central}>
          <Navbar />
          <section className={styles.graph}>
            <div className={styles.entry}>
              <Line data={entryData} />
            </div>
            <div className={styles.out}>
              <Line data={outData} />
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
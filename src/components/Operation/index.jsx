import { BsFillArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { formatMoney } from "../../../helpers/currency";
import CountUp from "react-countup";
import styles from "./styles.module.scss";

export default function Operation({ type, text, value }) {
  return (
    <div className={styles.container}>
      <div className={styles.texts}>
        <h3 className={styles.title}>{text}</h3>
        <div
          className={styles.typeArea}
          style={
            type === "entry"
              ? { backgroundColor: "#50FB00" }
              : { backgroundColor: "#FB0000" }
          }
        >
          {type === "entry" ? (
            <BsFillArrowUpCircleFill
              size={40}
              color="white"
              style={{ marginTop: "0.2rem" }}
            />
          ) : (
            <BsArrowDownCircleFill
              size={40}
              color="white"
              style={{ marginTop: "0.2rem" }}
            />
          )}
        </div>
      </div>
      <p className={styles.money}>
        R$
        {value ? (
          <CountUp start={0} end={value} decimals={2} separator="." />
        ) : (
          "0"
        )}
      </p>
    </div>
  );
}

import moment from "moment";
import { ListItem } from "../ListItem";
import { formatMoney } from "../../../helpers/currency";
import styles from "./styles.module.scss";

export function Table({ data }) {
  return (
    <table className={styles.container}>
      <caption className={styles.caption}>Listagem</caption>
      <thead className={styles.title}>
        <tr className={styles.line}>
          <td>Data</td>
          <td>Descrição</td>
          <td>Valor</td>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        {data.length > 1 &&
          data.map(({ date, description, value, id }) => (
            <ListItem
              date={moment(date).format("DD/MM/YY [às] HH:mm")}
              description={description}
              value={formatMoney(value)}
              key={id}
            />
          ))}
      </tbody>
    </table>
  );
}

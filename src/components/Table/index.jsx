import moment from "moment";
import { ListItem } from "../ListItem";
import { formatMoney } from "../../../helpers/currency";
import styles from "./styles.module.scss";
import { Loading } from "../Loading";

export function Table({ data, title }) {
  return (
    <table className={styles.container}>
      <caption className={styles.caption}>{title}</caption>
      <thead className={styles.title}>
        <tr className={styles.line}>
          <td>Data</td>
          <td>Descrição</td>
          <td>Valor</td>
          <td>Ações</td>
        </tr>
      </thead>
      {data.length > 0 ? (
        <tbody>
          {data.map(({ date, description, value, id }) => (
            <ListItem
              date={moment(date).format("DD/MM/YY [às] HH:mm")}
              description={description}
              value={formatMoney(value)}
              key={id}
            />
          ))}
        </tbody>
      ) : (
        <Loading />
      )}
    </table>
  );
}

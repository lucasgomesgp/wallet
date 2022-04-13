import moment from "moment";
import { ListItem } from "../ListItem";
import { formatMoney } from "../../../helpers/currency";
import styles from "./styles.module.scss";
import { Loading } from "../Loading";

export function Table({ data, type, title }) {
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
      {data !== undefined ? (
        <tbody>
          {data.map(({ date, description, value, id, key }) => (
            <ListItem
              date={moment(date).format("DD/MM/YY [às] HH:mm")}
              description={description}
              value={formatMoney(value)}
              type={type}
              id={key}
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

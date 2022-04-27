import { ListItem } from "../ListItem";
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
              date={date}
              description={description}
              value={value}
              type={type}
              id={key}
              key={id}
              uuid={id}
            />
          ))}
        </tbody>
      ) : (
        <Loading />
      )}
    </table>
  );
}

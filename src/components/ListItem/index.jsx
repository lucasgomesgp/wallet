
import { TiEdit, TiTrash } from "react-icons/ti";
import styles from "./styles.module.scss";
export function ListItem({date, description, value}) {
  return (
    <tr className={styles.line}>
      <td>{date}</td>
      <td>{description}</td>
      <td>{value}</td>
      <td>
        <button className={styles.editBtn}>
          <TiEdit size={30} color="#2F12E0" />
        </button>
        <button className={styles.removeBtn}>
          <TiTrash size={30} color="#FB0000" />
        </button>
      </td>
    </tr>
  );
}

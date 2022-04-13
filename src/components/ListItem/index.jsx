import { TiEdit, TiTrash } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { removeEntryOrOuts } from "../../app/operations-slice";
import styles from "./styles.module.scss";
export function ListItem({ date, description, value, type, id }) {
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeEntryOrOuts({ userId, type, key: id }));
  };
  return (
    <tr className={styles.line}>
      <td>{date}</td>
      <td>{description}</td>
      <td>{value}</td>
      <td>
        <button className={styles.editBtn}>
          <TiEdit size={30} color="#2F12E0" />
        </button>
        <button className={styles.removeBtn} onClick={handleDelete}>
          <TiTrash size={30} color="#FB0000" />
        </button>
      </td>
    </tr>
  );
}

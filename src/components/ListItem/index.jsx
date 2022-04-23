import { useState } from "react";
import { TiEdit, TiTrash } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { removeEntryOrOuts } from "../../app/operations-slice";
import { Modal } from "../Modal";
import styles from "./styles.module.scss";

export function ListItem({ date, description, value, type, id }) {
  const [status, setToggleStatus] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.uid);

  const handleDelete = () => {
    dispatch(removeEntryOrOuts({ userId, type, key: id }));
  };

  const handleEdit = () => {
    setToggleStatus(!status);
  };
  return (
    <>
      <tr className={styles.line}>
        <td>{date}</td>
        <td>{description}</td>
        <td>{value}</td>
        <td>
          <button className={styles.editBtn} onClick={handleEdit}>
            <TiEdit size={35} color="#2F12E0" />
          </button>
          <button className={styles.removeBtn} onClick={handleDelete}>
            <TiTrash size={35} color="#FB0000" />
          </button>
        </td>
      </tr>
      {status ? (
        <Modal
          idItem={id}
          type={type}
          key={id}
          description={description}
          date={date}
          value={value}
          statusModal={status}
        />
      ) : (
        ""
      )}
    </>
  );
}

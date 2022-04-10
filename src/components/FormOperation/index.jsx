import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEntryOrOutOperation } from "../../app/operations-slice";
import styles from "./styles.module.scss";

export function FormOperation({ type }) {
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createEntryOrOutOperation({ userId, type, value, description, date })
    );
    setDate("");
    setValue("");
    setDescription("");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>
        Nova {type === "entry" ? "entrada" : "saída"}
      </h3>
      <input
        type="datetime-local"
        name="date"
        placeholder="Data"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <input
        type="text"
        name="value"
        placeholder="Valor"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <textarea
        name="descricao"
        cols="30"
        rows="10"
        placeholder="Descrição"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <button className={styles.btnSend}>Enviar</button>
    </form>
  );
}

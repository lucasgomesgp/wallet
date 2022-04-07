import styles from "./styles.module.scss";

export function FormOperation({ type }) {
  return (
    <form className={styles.form}>
      <h3 className={styles.title}>
        Nova {type === "entry" ? "entrada" : "saída"}
      </h3>
      <input type="datetime-local" name="date" placeholder="Data" />
      <input type="text" name="value" placeholder="Valor" />
      <textarea
        name="descricao"
        cols="30"
        rows="10"
        placeholder="Descrição"
      ></textarea>
      <button className={styles.btnSend}>Enviar</button>
    </form>
  );
}

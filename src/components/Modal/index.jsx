import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

export function Modal({ isOpen, type, idItem }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {};
  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h3 className={styles.title}>Edição</h3>
        <input
          className={styles.formControl}
          {...register("date")}
          type="datetime-local"
        />
        <input
          className={styles.formControl}
          {...register("value")}
          placeholder="Valor"
          type="text"
        />
        <textarea
          className={styles.description}
          {...register("description")}
          placeholder="Descrição"
          type="text"
        ></textarea>
        <button type="submit" className={styles.btn}>
          Atualizar
        </button>
      </form>
    </main>
  );
}

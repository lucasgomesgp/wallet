import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import * as yup from "yup";
import styles from "./styles.module.scss";

export function Modal({ idItem, type, description, value, date, statusModal }) {
  const [status, setStatus] = useState(statusModal);
  const { register, handleSubmit } = useForm();

  const schema = yup.object({
    date: yup.string().required("A data é obrigatória!"),
    value: yup.string().required("O valor é obrigatório!"),
    description: yup.string().required("A descrição é obrigatória!"),
    type: yup.string().required("O tipo é obrigatório!"),
  });

  const onSubmit = (data) => {};

  function closeModal() {
    setStatus(false);
  }

  return (
    <>
      {status ? (
        <main className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <button className={styles.btnExit} onClick={closeModal}>
              <CgClose color="white" size={20} />
            </button>
            <h3 className={styles.title}>Edição</h3>
            <input
              className={styles.formControl}
              {...register("type")}
              type="text"
              value={type === "entry" ? "Entrada" : "Saída"}
              disabled
            />
            <input
              className={styles.formControl}
              {...register("date")}
              type="datetime-local"
              value={date}
            />
            <input
              className={styles.formControl}
              {...register("value")}
              placeholder="Valor"
              type="text"
              value={value}
            />
            <textarea
              className={styles.description}
              {...register("description")}
              placeholder="Descrição"
              type="text"
              value={description}
            ></textarea>
            <button type="submit" className={styles.btn}>
              Atualizar
            </button>
          </form>
        </main>
      ) : (
        ""
      )}
    </>
  );
}

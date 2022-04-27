import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateEntrysOrOuts } from "../../app/operations-slice";
import styles from "./styles.module.scss";

export function Modal({
  idItem,
  uuid,
  type,
  description,
  value,
  date,
  statusModal,
}) {
  const [status, setStatus] = useState(statusModal);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);

  const schema = yup.object({
    date: yup.string().required("A data é obrigatória!"),
    value: yup.string().required("O valor é obrigatório!"),
    description: yup.string().required("A descrição é obrigatória!"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const { value, description, date } = data;
    dispatch(
      updateEntrysOrOuts({
        userId,
        type,
        uuid,
        idOperation: idItem,
        date,
        value,
        description,
      })
    );
    closeModal();
  };

  function closeModal() {
    setStatus(!status);
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
              type="text"
              value={type === "entry" ? "Entrada" : "Saída"}
              disabled
            />
            <input
              className={styles.formControl}
              {...register("date")}
              type="datetime-local"
              defaultValue={date}
            />
            {errors.date?.message && (
              <p className={styles.errorSmall}>{errors.date?.message}</p>
            )}
            <input
              className={styles.formControl}
              {...register("value")}
              placeholder="Valor"
              type="text"
              defaultValue={value}
            />
            {errors.value?.message && (
              <p className={styles.errorSmall}>{errors.value?.message}</p>
            )}
            <textarea
              className={styles.description}
              {...register("description")}
              placeholder="Descrição"
              type="text"
              defaultValue={description}
            ></textarea>
            {errors.description?.message && (
              <p className={styles.errorSmall}>{errors.description?.message}</p>
            )}
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

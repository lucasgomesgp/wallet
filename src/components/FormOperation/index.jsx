import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createEntryOrOutOperation } from "../../app/operations-slice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";

export function FormOperation({ type }) {
  const userId = useSelector((state) => state.auth.user.uid);
  const dispatch = useDispatch();
  const schema = yup.object({
    date: yup.string().required("A data é obrigatória!"),
    value: yup.string().required("O valor é obrigatório!"),
    description: yup.string().required("A descrição é obrigatória!"),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { value, description, date } = data;
    dispatch(
      createEntryOrOutOperation({ userId, type, value, description, date })
    );
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>
        Nova {type === "entry" ? "entrada" : "saída"}
      </h3>
      <input
        type="datetime-local"
        name="date"
        {...register("date")}
        placeholder="Data"
      />
      {<p className={styles.error}>{errors.date?.message}</p>}
      <input
        type="text"
        name="value"
        placeholder="Valor"
        {...register("value")}
      />
      {<p className={styles.error}>{errors.value?.message}</p>}
      <textarea
        name="descricao"
        cols="30"
        rows="10"
        placeholder="Descrição"
        {...register("description")}
      ></textarea>
      {<p className={styles.error}>{errors.description?.message}</p>}
      <button className={styles.btnSend}>Enviar</button>
    </form>
  );
}

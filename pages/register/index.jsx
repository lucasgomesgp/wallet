import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { MdEmail, MdContacts, MdRemoveRedEye, MdLock } from "react-icons/md";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Meta } from "../../src/components/Meta";
import newImg from "../../public/new.svg";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../src/app/auth-slice";

export default function Register() {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordRepeated: ""
  });
  let schema = Yup.object().shape({
    passwordRepeated: Yup.string().min(8, "Repetir senha deve ter no mínimo 8 dígitos").required("Repetir a senha é obrigatório")
      .oneOf([Yup.ref("password"), null], "Senhas diferentes!"),
    password: Yup.string().min(8, "A senha deve ter no mínimo 8 dígitos").required("Senha é obrigatório"),
    email: Yup.string().email().required("Email é obrigatório"),
    fullName: Yup.string().required("Nome é obrigatório")
  });

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const { email, password, fullName, passwordRepeated } = input;
      await schema.validate({ fullName, email, password, passwordRepeated });
      dispatch(createNewUser({ email, password, fullName }));
    } catch (err) {
      toast.error(err.message);

    }
  }
  return (
    <>
      <Meta title="Register" />
      <main className={styles.container}>
        <div className={styles.wallet}>
          <h1 className={styles.title}>WALLET - Criar conta</h1>
          <Image layout="intrinsic" width={700} height={500} src={newImg} alt="Wallet" />
        </div>
        <form className={`${styles.form} form-bg`} onSubmit={handleSubmit}>
          <h3 className={styles.titleRegister}>Informações</h3>
          <div className={styles.back}>
            <Link href="/">
              <a>
                <BsFillArrowLeftSquareFill size={30} className={styles.arrowBack} />
              </a>
            </Link>
            <Link href="/">Voltar</Link>
          </div>
          <div className={`input-form`}>
            <div className="form-before">
              <MdContacts
                size={25}
                color="#8712E0"
                className="form-before-child"
              />
            </div>
            <input
              type="text"
              autoComplete="off"
              name="fullName"
              id="fullName"
              placeholder="Nome completo"
              value={input.fullName}
              onChange={(event) => { setInput({ ...input, fullName: event.target.value }) }}
            />
          </div>
          <div className={`input-form`}>
            <div className="form-before">
              <MdEmail size={25} color="#8712E0" className="form-before-child" />
            </div>
            <input
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              placeholder="Email"
              value={input.email}
              onChange={(event) => { setInput({ ...input, email: event.target.value }) }}
            />
          </div>
          <div className={`input-form`}>
            <div className="form-before">
              <MdRemoveRedEye
                size={25}
                color="#8712E0"
                className="form-before-child"
              />
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              value={input.password}
              onChange={(event) => { setInput({ ...input, password: event.target.value }) }}
            />
          </div>
          <div className={`input-form`}>
            <div className="form-before">
              <MdLock size={25} color="#8712E0" className="form-before-child" />
            </div>
            <input
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              placeholder="Repetir senha"
              value={input.passwordRepeated}
              onChange={(event) => { setInput({ ...input, passwordRepeated: event.target.value }) }}
            />
          </div>
          <div className={styles.terms}>
            <label style={{ marginLeft: "1rem" }}>
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span>Eu aceito os</span> <Link href="/terms">Termos de uso</Link>
            </label>
          </div>
          <button
            type="submit"
            className={`${styles.register} btn`}
            disabled={isChecked ? false : true}
          >
            Criar
          </button>
        </form>
      </main>
    </>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const navogateFunc = () => navigate("/sign-in");
    onSubmit(e, formData, navogateFunc);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <input
            name="email"
            type="email"
            className="auth__input"
            placeholder="Email"
            onChange={handleChange}
          ></input>
          <input
            name="password"
            type="password"
            className="auth__input"
            placeholder="Пароль"
            onChange={handleChange}
          ></input>
        </div>
        <button className="auth__submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегестрированны? Войти
      </Link>
    </div>
  );
}

export default Register;

import GoogleButton from "../GoogleButton/GoogleButton";
import "./LoginForm.css";

function LoginForm() {
  return (
    <div className="right-panel">

      <div className="login-card">

        <h1 className="login-title">Giriş Yap</h1>

        <p className="login-subtitle">
          Devam etmek için bilgilerinizi girin.
        </p>

        <label>E-POSTAN NEDİR?</label>

        <input
          type="email"
          placeholder="isim@email.com"
        />

        <div className="password-row">
          <label>VE ŞİFREN?</label>
          <a href="#">Unuttum</a>
        </div>

        <input
          type="password"
          placeholder="********"
        />

        <button className="login-btn">
          Giriş Yap
        </button>

        <div className="divider">
          <span></span>
          <p>VEYA</p>
          <span></span>
        </div>

        <GoogleButton />

      </div>

      <p className="register-text">
        Hesabınız yok mu?
        <a href="#"> Kayıt Ol</a>
      </p>

    </div>
  );
}

export default LoginForm;
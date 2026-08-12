import GoogleButton from "./GoogleButton";

function RegisterForm() {
  return (
    <div className="register-wrapper">

      <div className="register-card">

        <h1 className="login-title">
          Hesap Oluştur
        </h1>

        <p className="login-subtitle">
          Voia dünyasına katılmak için bilgilerinizi girin.
        </p>

        <label>ADINIZ VE SOYADINIZ?</label>

        <input
          type="text"
          placeholder="Selin Aydın"
        />

        <label>E-POSTA ADRESİNİZ?</label>

        <input
          type="email"
          placeholder="isim@email.com"
        />

        <label>TELEFON NUMARANIZ?</label>

        <input
          type="tel"
          placeholder="+90 5XX XXX XX XX"
        />

        <label>ŞİFRENİZ?</label>

        <input
          type="password"
          placeholder="********"
        />

        <button className="login-btn">
          Kayıt Ol
        </button>

        <div className="divider">
          <span></span>
          <p>VEYA</p>
          <span></span>
        </div>

        <GoogleButton />

      </div>

      <p className="register-text">
        Zaten hesabınız var mı?
        <a href="/login"> Giriş Yap</a>
      </p>

    </div>
  );
}

export default RegisterForm;
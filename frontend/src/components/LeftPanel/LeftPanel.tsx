import microphone from "../../assets/microphone.svg";
import reminder from "../../assets/reminder.svg";
import world from "../../assets/world.svg";
import lock from "../../assets/lock.svg";
import ShaderBackground from "../ShaderBackground/ShaderBackground";
import "./LeftPanel.css";

function LeftPanel() {
  return (
    <div className="left-panel">

      <ShaderBackground />

      <div className="left-content">

        <div className="logo-circle">
          <img src={microphone} alt="Microphone" />
        </div>

        <h1 className="logo">Voia</h1>

        <h2 className="title">
          Çok Dilli Kişisel Ses Asistanınız
        </h2>

        <p className="description">
          Voia ile hayatınızı sesinizle yönetin.
          6 farklı dil desteğiyle notlar alın,
          hatırlatıcılar kurun ve aramalarınızı
          sadece konuşarak gerçekleştirin.
        </p>

        <div className="features">

          <div className="feature">
            <div className="feature-icon">
              <img src={reminder} alt="Reminder" />
            </div>

            <div>
              <h3>Akıllı Hatırlatıcılar</h3>
              <p>Zamanı sesinizle yönetin.</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <img src={world} alt="World" />
            </div>

            <div>
              <h3>6 Dil Desteği</h3>
              <p>Global iletişim gücü.</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <img src={microphone} alt="Microphone" />
            </div>

            <div>
              <h3>Sesli Aramalar</h3>
              <p>Eller serbest kontrol.</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <img src={lock} alt="Lock" />
            </div>

            <div>
              <h3>Güvenli Giriş</h3>
              <p>Sesiniz kimliğinizdir.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LeftPanel;
import google from "../../assets/google.svg";
import "./GoogleButton.css";

function GoogleButton() {
  return (
    <button className="google-btn">
      <img src={google} alt="Google" />
      <span>Google ile Devam Et</span>
    </button>
  );
}

export default GoogleButton;
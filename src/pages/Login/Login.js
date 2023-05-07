// SCSS
import "./Login.scss";

// Packages
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
// images
import Logo from "../../assets/logo/Logo.svg";
import Lines from "../../assets/Images/Lines.svg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <main className="login">
      {/* Left side */}
      <motion.section
        className="login__left"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 1 }}
      >
        <video className="login__video-background" autoPlay muted loop>
          <source
            src={`http://localhost:8080/videos/LoginVideo${
              Math.random().toPrecision(1) * 10
            }`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="login__overlay"></div>
        <img className="login__logo-left" src={Logo} alt="Logo" />

        <div className="login__text-wrapper-left">
          <motion.h1
            className="l ogin__heading-left"
            variants={{
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Enter to the world of your knowledge
          </motion.h1>
          <motion.p
            className="login__text-left"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Step into a Realm of Boundless Knowledge and Track Your Literary
            Adventures with our Feature-Rich Book Tracking Dashboard. Immerse
            yourself in a world where reading becomes a transformative
            experience
          </motion.p>
        </div>
        <img className="login__curved-lines" src={Lines} alt="Curved Lines" />
      </motion.section>
      {/* Right side */}
      <motion.section
        className="login__right"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Mobile right side Logo */}
        <img className="login__logo-right" src={Logo} alt="Logo" />
        <div className="login__text-wrapper-right">
          <h2 className="login__heading-right">Welcome Back!</h2>
          <p className="login__text-right">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
        {/* form */}
        <div className="login__form">
          <form>
            <div className="login__input-wrapper">
              <input
                className="login__email-input"
                type="email"
                name="email"
                placeholder="Email"
              />
              <div className="login__password-input-wrapper">
                <input
                  className="login__password-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <div
                  className={"login__show-password-icon"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
              <Link className="login__forgot-password-label">
                Forgot Password
              </Link>
              <button className="login__submit-button">Login</button>
            </div>
          </form>
          <div className="login__federation">
            <div className="login__separator">
              <div className="login__line"></div>
              <div className="login__text">or</div>
              <div className="login__line"></div>
            </div>
            <div className="login__federation-button-wrapper">
              <button className="login__google-login-button" type="button">
                <GoogleIcon />
                Continue with Google
              </button>
              <button className="login__apple-login-button" type="button">
                <AppleIcon />
                Continue with Apple
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

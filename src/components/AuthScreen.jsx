import React, { useState } from "react";
import { Crown, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useStore } from "../store/PartiyaStore.jsx";
import { HeroBoard } from "./Board.jsx";
import { Field } from "./Field.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthScreen({ mode, setMode, setView }) {
  const { state, dispatch } = useStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(mode === "login" ? "demo@partiya.app" : "");
  const [password, setPassword] = useState(mode === "login" ? "partiya1" : "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function switchMode(next) {
    setMode(next);
    setError("");
    if (next === "signup") setNotice("");
  }

  function submitSignup(e) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Adını və soyadını daxil et.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Düzgün e-poçt ünvanı daxil et (məs. ad@gmail.com).");
      return;
    }
    if (state.users.some((u) => u.email === email.trim())) {
      setError("Bu e-poçt artıq qeydiyyatdan keçib. Daxil ol.");
      return;
    }
    if (password.length < 4) {
      setError("Şifrə ən azı 4 simvoldan ibarət olmalıdır.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Yazdığın iki şifrə üst-üstə düşmür. Yenidən yoxla.");
      return;
    }

    dispatch({
      type: "SIGNUP",
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      password,
    });

    // Qeydiyyat bitdi — birbaşa dashboard-a yox, "Daxil ol" formuna atırıq.
    setNotice("Qeydiyyat tamamlandı! İndi e-poçt və şifrənlə daxil ol.");
    setMode("login");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  }

  function submitLogin(e) {
    e.preventDefault();
    setError("");
    setNotice("");

    if (!EMAIL_RE.test(email.trim())) {
      setError("Düzgün e-poçt ünvanı daxil et.");
      return;
    }
    const ok = state.users.some((u) => u.email === email.trim() && u.password === password);
    if (!ok) {
      setError("E-poçt və ya şifrə səhvdir. Yenidən yoxla.");
      return;
    }
    dispatch({ type: "LOGIN", email: email.trim(), password });
    setView("dashboard");
  }

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <HeroBoard />
      </div>

      <div className="auth-right">
        <div className="brand"><Crown size={19} /><span>Partiya</span></div>
        <h1>Hər partiya<br />eyni yerdən<br /><em>başlayır.</em></h1>
        <p className="lede">
          Partiya — dostlarınla yazışma üsulu ilə oynadığın şahmat oyunlarının
          jurnalı. Hərəkəti yaz, növbəni rəqibinə ötür, nəticəni gözlə.
        </p>

        <div className="auth-card">
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={mode === "login"}
                    className={mode === "login" ? "tab active" : "tab"}
                    onClick={() => switchMode("login")}>Daxil ol</button>
            <button role="tab" aria-selected={mode === "signup"}
                    className={mode === "signup" ? "tab active" : "tab"}
                    onClick={() => switchMode("signup")}>Qeydiyyat</button>
          </div>

          {notice && mode === "login" && (
            <div className="notice-text"><CheckCircle2 size={15} />{notice}</div>
          )}

          {mode === "signup" ? (
            <form onSubmit={submitSignup} className="auth-form">
              <div className="name-row">
                <Field icon={User} type="text" placeholder="Ad" value={firstName}
                       onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
                <Field icon={User} type="text" placeholder="Soyad" value={lastName}
                       onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
              </div>
              <Field icon={Mail} type="email" placeholder="E-poçt (Gmail)" value={email}
                     onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              <div className="field">
                <Lock size={16} className="field-icon" aria-hidden="true" />
                <input type={showPass ? "text" : "password"} placeholder="Şifrə" value={password}
                       onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                <button type="button" className="pass-toggle" onClick={() => setShowPass((s) => !s)}
                        aria-label={showPass ? "Şifrəni gizlət" : "Şifrəni göstər"}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Field icon={Lock} type={showPass ? "text" : "password"} placeholder="Şifrəni təkrarla"
                     value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                     autoComplete="new-password" />

              {error && <div className="error-text">{error}</div>}

              <button type="submit" className="btn-primary">
                Hesab yarat <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={submitLogin} className="auth-form">
              <Field icon={Mail} type="email" placeholder="E-poçt (Gmail)" value={email}
                     onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              <div className="field">
                <Lock size={16} className="field-icon" aria-hidden="true" />
                <input type={showPass ? "text" : "password"} placeholder="Şifrə" value={password}
                       onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                <button type="button" className="pass-toggle" onClick={() => setShowPass((s) => !s)}
                        aria-label={showPass ? "Şifrəni gizlət" : "Şifrəni göstər"}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && <div className="error-text">{error}</div>}

              <button type="submit" className="btn-primary">
                Daxil ol <ArrowRight size={16} />
              </button>
            </form>
          )}

          {mode === "login" && !notice && (
            <p className="demo-hint">Nümunə hesab dolduruldu — birbaşa daxil ol.</p>
          )}
        </div>
      </div>
    </div>
  );
}

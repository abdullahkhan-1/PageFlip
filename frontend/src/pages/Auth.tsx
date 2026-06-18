import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email for a confirmation link!')
    }

    setLoading(false)
  }

  return (
    <div className="auth-library">
      <style>{`
        .auth-library {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-x: hidden;
          overflow-y: auto;
          padding: clamp(0.75rem, 3vw, 2rem);
          box-sizing: border-box;
          background:
            radial-gradient(circle at 50% 48%, rgba(212, 168, 83, 0.26) 0%, rgba(74, 14, 14, 0.22) 18%, rgba(45, 27, 78, 0.2) 36%, rgba(10, 10, 15, 0.96) 66%),
            linear-gradient(115deg, #050509 0%, #0a0a0f 42%, #160b27 100%);
          color: #f0e6d3;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          perspective: 1000px;
        }

        .auth-library::before,
        .auth-library::after {
          content: "";
          position: absolute;
          top: -8%;
          bottom: -8%;
          width: min(26vw, 300px);
          opacity: 0.82;
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.94), rgba(10, 8, 20, 0.34), rgba(10, 10, 15, 0)),
            repeating-linear-gradient(
              90deg,
              rgba(20, 11, 13, 0.92) 0 12px,
              rgba(74, 14, 14, 0.56) 12px 18px,
              rgba(14, 9, 19, 0.96) 18px 30px,
              rgba(45, 27, 78, 0.38) 30px 35px,
              rgba(6, 5, 11, 0.96) 35px 48px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(212, 168, 83, 0.08) 0 4px,
              transparent 4px 86px,
              rgba(0, 0, 0, 0.7) 86px 92px
            );
          box-shadow:
            inset -28px 0 40px rgba(0, 0, 0, 0.86),
            inset 0 0 70px rgba(0, 0, 0, 0.72),
            28px 0 90px rgba(45, 27, 78, 0.24),
            0 0 120px rgba(0, 0, 0, 0.94);
          pointer-events: none;
        }

        .auth-library::before {
          left: 0;
        }

        .auth-library::after {
          right: 0;
          transform: scaleX(-1);
        }

        .auth-vignette,
        .auth-candle-glow,
        .library-depth {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .auth-vignette {
          z-index: 6;
          background:
            radial-gradient(circle at center, rgba(0, 0, 0, 0) 28%, rgba(0, 0, 0, 0.68) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0) 24%, rgba(0, 0, 0, 0.88));
        }

        .auth-candle-glow {
          z-index: 2;
          background:
            radial-gradient(circle at 50% 53%, rgba(212, 168, 83, 0.44) 0%, rgba(212, 168, 83, 0.14) 19%, rgba(74, 14, 14, 0.16) 34%, rgba(10, 10, 15, 0) 63%),
            radial-gradient(circle at 28% 68%, rgba(212, 168, 83, 0.22) 0%, rgba(212, 168, 83, 0.05) 17%, transparent 32%),
            radial-gradient(circle at 72% 68%, rgba(212, 168, 83, 0.22) 0%, rgba(212, 168, 83, 0.05) 17%, transparent 32%);
          opacity: 0.78;
        }

        .library-depth {
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(10, 10, 15, 0.92), transparent 18%, transparent 82%, rgba(10, 10, 15, 0.92)),
            repeating-linear-gradient(
              90deg,
              transparent 0 82px,
              rgba(212, 168, 83, 0.035) 82px 84px,
              transparent 84px 172px
            );
        }

        .library-arch {
          position: absolute;
          z-index: 2;
          top: 5%;
          left: 50%;
          width: min(52vw, 620px);
          height: min(70vh, 650px);
          max-height: calc(100dvh - 2rem);
          transform: translateX(-50%);
          border: 1px solid rgba(212, 168, 83, 0.1);
          border-bottom: 0;
          border-radius: 50% 50% 4px 4px;
          background:
            radial-gradient(ellipse at center, rgba(45, 27, 78, 0.32), rgba(10, 10, 15, 0.1) 45%, rgba(0, 0, 0, 0.62) 100%),
            linear-gradient(90deg, transparent 0 47%, rgba(212, 168, 83, 0.06) 49% 51%, transparent 53% 100%);
          box-shadow:
            inset 0 0 80px rgba(0, 0, 0, 0.9),
            0 0 70px rgba(45, 27, 78, 0.24);
          pointer-events: none;
        }

        .shelf-cluster {
          position: absolute;
          z-index: 3;
          top: 6%;
          bottom: 5%;
          width: clamp(150px, 23vw, 280px);
          display: grid;
          grid-template-rows: repeat(6, 1fr);
          gap: 2.2vh;
          pointer-events: none;
        }

        .shelf-left {
          left: max(1rem, 3vw);
          transform: rotateY(18deg) skewY(-1deg);
          transform-origin: left center;
        }

        .shelf-right {
          right: max(1rem, 3vw);
          transform: rotateY(-18deg) skewY(1deg);
          transform-origin: right center;
        }

        .book-row {
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: clamp(2px, 0.35vw, 4px);
          padding: 0 clamp(7px, 1vw, 12px) 9px;
          border-bottom: 5px solid rgba(53, 29, 18, 0.9);
          box-shadow:
            0 9px 18px rgba(0, 0, 0, 0.62),
            inset 0 -1px 0 rgba(212, 168, 83, 0.12);
        }

        .book-row::before {
          content: "";
          position: absolute;
          inset: auto 0 -7px;
          height: 8px;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.8), rgba(212, 168, 83, 0.14), rgba(0, 0, 0, 0.82));
        }

        .book {
          width: var(--w, clamp(9px, 1.1vw, 14px));
          height: var(--h, clamp(34px, 6vh, 54px));
          border-radius: 2px 2px 0 0;
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.05), transparent 24%, rgba(0, 0, 0, 0.28) 78%),
            var(--c, #4a0e0e);
          box-shadow:
            inset 1px 0 0 rgba(240, 230, 211, 0.08),
            inset -1px 0 0 rgba(0, 0, 0, 0.34),
            0 0 8px rgba(0, 0, 0, 0.5);
          opacity: 0.88;
        }

        .book:nth-child(2n) { --c: #2d1b4e; --h: clamp(30px, 5.2vh, 46px); }
        .book:nth-child(3n) { --c: #302012; --h: clamp(38px, 6.6vh, 62px); --w: clamp(8px, 0.95vw, 11px); }
        .book:nth-child(4n) { --c: #1c1928; --h: clamp(34px, 5.7vh, 50px); --w: clamp(11px, 1.35vw, 17px); }
        .book:nth-child(5n) { --c: #5b2119; --h: clamp(36px, 6.1vh, 58px); --w: clamp(9px, 1vw, 13px); }

        .candle {
          position: absolute;
          z-index: 5;
          bottom: 14%;
          width: 28px;
          height: 98px;
          border-radius: 8px 8px 3px 3px;
          background:
            linear-gradient(90deg, rgba(71, 44, 25, 0.32), rgba(240, 230, 211, 0.9), rgba(128, 88, 49, 0.45)),
            #f0e6d3;
          box-shadow:
            0 0 32px rgba(212, 168, 83, 0.22),
            inset -7px 0 10px rgba(74, 14, 14, 0.14);
        }

        .candle-left {
          left: 25%;
        }

        .candle-right {
          right: 25%;
          height: 78px;
          bottom: 15%;
        }

        .candle::before {
          content: "";
          position: absolute;
          left: 50%;
          top: -31px;
          width: 18px;
          height: 34px;
          transform: translateX(-50%);
          border-radius: 52% 48% 50% 50%;
          background:
            radial-gradient(circle at 50% 68%, #fff5bd 0 15%, #d4a853 34%, rgba(139, 56, 22, 0.82) 58%, transparent 72%);
          filter: drop-shadow(0 0 10px rgba(212, 168, 83, 0.82));
        }

        .candle::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -8px;
          width: 54px;
          height: 14px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(45, 24, 14, 0.96);
          box-shadow: 0 0 22px rgba(212, 168, 83, 0.18);
        }

        .flying-page,
        .dust-mote,
        .flying-book,
        .owl {
          position: absolute;
          z-index: 4;
          pointer-events: none;
        }

        .flying-page {
          width: 24px;
          height: 31px;
          border-radius: 2px 6px 3px 2px;
          background:
            linear-gradient(100deg, rgba(240, 230, 211, 0.16), rgba(212, 168, 83, 0.22)),
            linear-gradient(90deg, transparent 48%, rgba(74, 14, 14, 0.28) 50%, transparent 53%);
          box-shadow: 0 0 24px rgba(212, 168, 83, 0.2);
          opacity: 0.16;
          transform: rotate(-12deg) skewY(8deg);
        }

        .page-one {
          left: 8%;
          top: 22%;
        }

        .page-two {
          right: 13%;
          top: 18%;
          opacity: 0.12;
        }

        .page-three {
          left: 17%;
          bottom: 22%;
          opacity: 0.17;
        }

        .page-four {
          right: 20%;
          bottom: 16%;
          opacity: 0.11;
        }

        .page-five {
          left: 49%;
          top: 12%;
          opacity: 0.1;
        }

        .flying-book {
          width: 54px;
          height: 36px;
          border-radius: 4px;
          background:
            linear-gradient(90deg, rgba(240, 230, 211, 0.2) 0 3px, transparent 3px 50%, rgba(0, 0, 0, 0.32) 51% 53%, transparent 53% 100%),
            linear-gradient(135deg, #4a0e0e, #23142f 62%, #100c14);
          box-shadow:
            0 0 24px rgba(212, 168, 83, 0.16),
            inset 0 0 0 1px rgba(212, 168, 83, 0.16);
          opacity: 0.64;
        }

        .flying-book::before,
        .flying-book::after {
          content: "";
          position: absolute;
          top: 7px;
          width: 22px;
          height: 22px;
          border: 1px solid rgba(212, 168, 83, 0.22);
          border-radius: 3px;
          background: rgba(240, 230, 211, 0.05);
        }

        .flying-book::before {
          left: 4px;
          transform: skewY(9deg);
        }

        .flying-book::after {
          right: 4px;
          transform: skewY(-9deg);
        }

        .book-one {
          left: 11%;
          top: 34%;
        }

        .book-two {
          right: 10%;
          top: 58%;
          width: 44px;
          height: 30px;
          opacity: 0.5;
        }

        .book-three {
          left: 66%;
          top: 25%;
          width: 42px;
          height: 29px;
          opacity: 0.46;
        }

        .owl {
          width: 46px;
          height: 20px;
          opacity: 0.24;
          filter: drop-shadow(0 0 12px rgba(212, 168, 83, 0.18));
        }

        .owl::before,
        .owl::after {
          content: "";
          position: absolute;
          top: 3px;
          width: 28px;
          height: 13px;
          border-radius: 70% 8% 70% 8%;
          background: rgba(240, 230, 211, 0.42);
        }

        .owl::before {
          left: 0;
          transform: rotate(18deg);
        }

        .owl::after {
          right: 0;
          transform: scaleX(-1) rotate(18deg);
        }

        .owl-one {
          left: 18%;
          top: 13%;
        }

        .owl-two {
          right: 21%;
          top: 22%;
          opacity: 0.18;
        }

        .dust-mote {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(212, 168, 83, 0.82);
          box-shadow: 0 0 14px rgba(212, 168, 83, 0.9);
          opacity: 0.5;
        }

        .dust-one { left: 24%; top: 78%; }
        .dust-two { left: 34%; top: 68%; }
        .dust-three { left: 43%; top: 82%; }
        .dust-four { left: 51%; top: 72%; }
        .dust-five { left: 58%; top: 80%; }
        .dust-six { left: 66%; top: 70%; }
        .dust-seven { left: 74%; top: 84%; }
        .dust-eight { left: 29%; top: 88%; }
        .dust-nine { left: 70%; top: 76%; }
        .dust-ten { left: 47%; top: 90%; }

        .auth-card {
          position: relative;
          z-index: 7;
          width: min(100%, 410px);
          max-width: 410px;
          max-height: calc(100dvh - clamp(1.5rem, 6vw, 4rem));
          overflow-y: auto;
          padding: clamp(1.5rem, 4vw, 2.5rem);
          box-sizing: border-box;
          border: 1px solid rgba(212, 168, 83, 0.3);
          border-radius: 12px;
          background: rgba(10, 8, 20, 0.85);
          box-shadow:
            0 0 36px rgba(212, 168, 83, 0.12),
            0 28px 90px rgba(0, 0, 0, 0.72),
            inset 0 1px 0 rgba(240, 230, 211, 0.08);
          backdrop-filter: blur(12px);
        }

        .auth-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            linear-gradient(140deg, rgba(212, 168, 83, 0.08), transparent 32%),
            radial-gradient(circle at 50% 0%, rgba(74, 14, 14, 0.26), transparent 46%);
          pointer-events: none;
        }

        .auth-card::after {
          content: "";
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(212, 168, 83, 0.13);
          border-radius: 8px;
          pointer-events: none;
          box-shadow: inset 0 0 30px rgba(45, 27, 78, 0.18);
        }

        .auth-content {
          position: relative;
          z-index: 2;
        }

        .auth-title {
          margin: 0 0 8px;
          color: #f0e6d3;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(25px, 4.5vw, 30px);
          font-weight: 500;
          letter-spacing: 0;
          text-shadow: 0 0 18px rgba(212, 168, 83, 0.22);
        }

        .auth-subtitle {
          margin: 0 0 clamp(1.25rem, 4vh, 2rem);
          color: rgba(240, 230, 211, 0.66);
          font-size: 14px;
          line-height: 1.5;
        }

        .auth-field {
          margin-bottom: clamp(0.75rem, 2.6vh, 1rem);
        }

        .auth-field.password-field {
          margin-bottom: clamp(1rem, 3.4vh, 1.5rem);
        }

        .auth-label {
          display: block;
          margin-bottom: 6px;
          color: rgba(212, 168, 83, 0.82);
          font-size: 13px;
        }

        .auth-input {
          width: 100%;
          padding: clamp(10px, 2.2vh, 12px) 2px clamp(8px, 1.9vh, 10px);
          box-sizing: border-box;
          border: 0;
          border-bottom: 1px solid rgba(212, 168, 83, 0.64);
          border-radius: 0;
          outline: none;
          background: rgba(23, 16, 23, 0.72);
          color: #f0e6d3;
          font-size: 14px;
          box-shadow: inset 0 -18px 30px rgba(74, 14, 14, 0.12);
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .auth-input:focus {
          border-bottom-color: #d4a853;
          background: rgba(27, 18, 27, 0.88);
          box-shadow:
            inset 0 -18px 30px rgba(74, 14, 14, 0.16),
            0 9px 20px rgba(212, 168, 83, 0.09);
        }

        .auth-input:-webkit-autofill,
        .auth-input:-webkit-autofill:hover,
        .auth-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #f0e6d3;
          box-shadow: 0 0 0 1000px rgba(23, 16, 23, 0.95) inset;
          transition: background-color 9999s ease-in-out 0s;
        }

        .auth-feedback {
          margin: 0 0 1rem;
          padding: clamp(0.6rem, 2vh, 0.75rem) 0.85rem;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
        }

        .auth-feedback.error {
          border: 1px solid rgba(255, 107, 107, 0.28);
          background: rgba(74, 14, 14, 0.38);
          color: #ffb7a8;
        }

        .auth-feedback.message {
          border: 1px solid rgba(212, 168, 83, 0.32);
          background: rgba(45, 27, 78, 0.42);
          color: #f0e6d3;
        }

        .auth-submit {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: clamp(10px, 2.3vh, 12px);
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #8f6324 0%, #d4a853 45%, #f1d28a 100%);
          color: #120b09;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          opacity: 1;
          box-shadow:
            0 12px 24px rgba(212, 168, 83, 0.18),
            inset 0 1px 0 rgba(255, 248, 219, 0.48);
          transition: transform 180ms ease, opacity 180ms ease, box-shadow 180ms ease;
        }

        .auth-submit::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -85%;
          width: 50%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.48), transparent);
          transform: skewX(-22deg);
          pointer-events: none;
        }

        .auth-submit:hover {
          transform: translateY(-1px);
          box-shadow:
            0 16px 28px rgba(212, 168, 83, 0.22),
            inset 0 1px 0 rgba(255, 248, 219, 0.58);
        }

        .auth-submit:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          transform: none;
        }

        .auth-toggle {
          margin: clamp(1rem, 3vh, 1.5rem) 0 0;
          color: rgba(240, 230, 211, 0.58);
          font-size: 13px;
          text-align: center;
        }

        .auth-toggle-link {
          color: #d4a853;
          cursor: pointer;
          text-shadow: 0 0 14px rgba(212, 168, 83, 0.24);
        }

        .auth-toggle-link:hover {
          color: #f1d28a;
        }

        @media (max-width: 1200px) {
          .shelf-cluster {
            width: clamp(120px, 19vw, 220px);
            opacity: 0.78;
          }

          .shelf-left {
            left: 1rem;
          }

          .shelf-right {
            right: 1rem;
          }

          .candle-left {
            left: 21%;
          }

          .candle-right {
            right: 21%;
          }
        }

        @media (max-width: 920px) {
          .auth-library {
            padding-inline: clamp(1rem, 5vw, 2rem);
          }

          .auth-library::before,
          .auth-library::after {
            width: 24vw;
            opacity: 0.5;
          }

          .shelf-cluster {
            width: 20vw;
            opacity: 0.34;
          }

          .book-row {
            padding-inline: 6px;
          }

          .candle {
            transform: scale(0.82);
            transform-origin: bottom center;
            opacity: 0.7;
          }

          .candle-left {
            left: 13%;
          }

          .candle-right {
            right: 13%;
          }

          .library-arch {
            width: 72vw;
            opacity: 0.75;
          }

          .flying-book {
            transform: scale(0.82);
            opacity: 0.4;
          }
        }

        @media (max-width: 720px) {
          .auth-library {
            align-items: flex-start;
            padding-block: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-bottom));
          }

          .auth-library::before,
          .auth-library::after {
            width: 38vw;
            opacity: 0.28;
          }

          .shelf-cluster,
          .candle,
          .flying-book,
          .owl {
            opacity: 0.18;
          }

          .shelf-cluster {
            top: 2%;
            bottom: 2%;
            width: 30vw;
            gap: 1.5vh;
          }

          .shelf-left {
            left: -5vw;
          }

          .shelf-right {
            right: -5vw;
          }

          .candle-left {
            left: 6%;
          }

          .candle-right {
            right: 6%;
          }

          .auth-card {
            width: min(100%, 430px);
            max-height: none;
            margin-block: auto;
          }
        }

        @media (max-width: 560px) {
          .auth-library {
            padding-inline: 1rem;
          }

          .auth-library::before,
          .auth-library::after {
            width: 32vw;
            opacity: 0.42;
          }

          .library-arch,
          .shelf-cluster,
          .candle,
          .flying-book,
          .owl {
            opacity: 0.28;
          }

          .auth-card {
            border-radius: 10px;
            padding: clamp(1.25rem, 6vw, 2rem);
          }

          .auth-title {
            font-size: 27px;
          }
        }

        @media (max-width: 420px) {
          .auth-library {
            padding-inline: 0.75rem;
          }

          .auth-card {
            padding: 1.15rem;
          }

          .auth-title {
            font-size: 24px;
          }

          .auth-subtitle,
          .auth-input,
          .auth-submit {
            font-size: 13px;
          }

          .auth-label,
          .auth-toggle {
            font-size: 12px;
          }

          .shelf-cluster,
          .candle {
            display: none;
          }

          .flying-page {
            width: 18px;
            height: 24px;
          }
        }

        @media (max-height: 720px) {
          .auth-library {
            align-items: flex-start;
            padding-block: 0.75rem;
          }

          .auth-card {
            max-height: calc(100dvh - 1.5rem);
            padding: 1.35rem;
          }

          .auth-title {
            font-size: 24px;
          }

          .auth-subtitle {
            margin-bottom: 1rem;
          }

          .auth-field {
            margin-bottom: 0.7rem;
          }

          .auth-field.password-field {
            margin-bottom: 0.95rem;
          }

          .auth-toggle {
            margin-top: 0.95rem;
          }

          .candle,
          .shelf-cluster {
            opacity: 0.22;
          }
        }

        @media (max-height: 560px) and (min-width: 640px) {
          .auth-library {
            padding-block: 0.5rem;
          }

          .auth-card {
            width: min(100%, 520px);
            max-width: 520px;
            padding: 1rem 1.25rem;
          }

          .auth-title {
            font-size: 23px;
          }

          .auth-subtitle {
            margin-bottom: 0.75rem;
          }

          .auth-input {
            padding-block: 8px 7px;
          }

          .auth-submit {
            padding-block: 9px;
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          @keyframes candle-flicker {
            0%, 100% { opacity: 0.58; transform: scale(1); }
            30% { opacity: 0.76; transform: scale(1.02); }
            57% { opacity: 0.62; transform: scale(0.99); }
            82% { opacity: 0.7; transform: scale(1.015); }
          }

          @keyframes flame-dance {
            0%, 100% { transform: translateX(-50%) scaleY(1) rotate(-2deg); opacity: 0.86; }
            35% { transform: translateX(-52%) scaleY(1.16) rotate(3deg); opacity: 1; }
            70% { transform: translateX(-48%) scaleY(0.92) rotate(-4deg); opacity: 0.78; }
          }

          @keyframes card-rise {
            0% { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes card-breathe {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }

          @keyframes page-drift-one {
            0% { transform: translate3d(0, 0, 0) rotate(-12deg) skewY(8deg); }
            100% { transform: translate3d(58vw, 18vh, 0) rotate(22deg) skewY(-4deg); }
          }

          @keyframes page-drift-two {
            0% { transform: translate3d(0, 0, 0) rotate(16deg) skewY(-7deg); }
            100% { transform: translate3d(-46vw, 28vh, 0) rotate(-24deg) skewY(5deg); }
          }

          @keyframes page-drift-three {
            0% { transform: translate3d(0, 0, 0) rotate(8deg) skewY(6deg); }
            100% { transform: translate3d(40vw, -32vh, 0) rotate(-18deg) skewY(-5deg); }
          }

          @keyframes page-drift-four {
            0% { transform: translate3d(0, 0, 0) rotate(-20deg) skewY(4deg); }
            100% { transform: translate3d(-36vw, -24vh, 0) rotate(20deg) skewY(-6deg); }
          }

          @keyframes page-drift-five {
            0% { transform: translate3d(0, 0, 0) rotate(10deg) skewY(-5deg); }
            100% { transform: translate3d(14vw, 48vh, 0) rotate(-28deg) skewY(8deg); }
          }

          @keyframes book-fly-one {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(-12deg); }
            50% { transform: translate3d(18vw, -12vh, 0) rotate(18deg); }
          }

          @keyframes book-fly-two {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(14deg); }
            50% { transform: translate3d(-20vw, -18vh, 0) rotate(-16deg); }
          }

          @keyframes book-fly-three {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(8deg); }
            50% { transform: translate3d(-12vw, 13vh, 0) rotate(-22deg); }
          }

          @keyframes owl-glide-one {
            0% { transform: translate3d(-8vw, 0, 0) scale(0.7); opacity: 0; }
            18% { opacity: 0.22; }
            50% { transform: translate3d(34vw, 6vh, 0) scale(1); opacity: 0.28; }
            100% { transform: translate3d(78vw, -3vh, 0) scale(0.7); opacity: 0; }
          }

          @keyframes owl-glide-two {
            0% { transform: translate3d(8vw, 0, 0) scaleX(-1) scale(0.6); opacity: 0; }
            22% { opacity: 0.18; }
            100% { transform: translate3d(-72vw, 8vh, 0) scaleX(-1) scale(0.9); opacity: 0; }
          }

          @keyframes dust-float {
            0% { transform: translate3d(0, 0, 0) scale(0.8); opacity: 0; }
            18% { opacity: 0.44; }
            100% { transform: translate3d(var(--dust-x), -46vh, 0) scale(1.12); opacity: 0; }
          }

          @keyframes shimmer-sweep {
            0% { left: -85%; }
            100% { left: 135%; }
          }

          .auth-candle-glow {
            animation: candle-flicker 3.6s ease-in-out infinite;
          }

          .candle::before {
            animation: flame-dance 2.8s ease-in-out infinite;
          }

          .auth-card {
            animation:
              card-rise 0.8s ease-out both,
              card-breathe 4s ease-in-out 0.8s infinite;
          }

          .page-one {
            animation: page-drift-one 22s linear -3s infinite alternate;
          }

          .page-two {
            animation: page-drift-two 27s linear -11s infinite alternate;
          }

          .page-three {
            animation: page-drift-three 24s linear -7s infinite alternate;
          }

          .page-four {
            animation: page-drift-four 29s linear -15s infinite alternate;
          }

          .page-five {
            animation: page-drift-five 26s linear -19s infinite alternate;
          }

          .book-one {
            animation: book-fly-one 12s ease-in-out -2s infinite;
          }

          .book-two {
            animation: book-fly-two 15s ease-in-out -6s infinite;
          }

          .book-three {
            animation: book-fly-three 18s ease-in-out -9s infinite;
          }

          .owl-one {
            animation: owl-glide-one 22s linear -8s infinite;
          }

          .owl-two {
            animation: owl-glide-two 28s linear -15s infinite;
          }

          .dust-one { --dust-x: 12px; animation: dust-float 16s linear -1s infinite; }
          .dust-two { --dust-x: -18px; animation: dust-float 19s linear -8s infinite; }
          .dust-three { --dust-x: 8px; animation: dust-float 17s linear -5s infinite; }
          .dust-four { --dust-x: -10px; animation: dust-float 21s linear -12s infinite; }
          .dust-five { --dust-x: 16px; animation: dust-float 18s linear -3s infinite; }
          .dust-six { --dust-x: -14px; animation: dust-float 20s linear -15s infinite; }
          .dust-seven { --dust-x: 10px; animation: dust-float 17s linear -10s infinite; }
          .dust-eight { --dust-x: -8px; animation: dust-float 22s linear -6s infinite; }
          .dust-nine { --dust-x: 18px; animation: dust-float 19s linear -13s infinite; }
          .dust-ten { --dust-x: -16px; animation: dust-float 23s linear -17s infinite; }

          .auth-submit:hover::before {
            animation: shimmer-sweep 850ms ease;
          }
        }

        .auth-library {
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          min-height: 0;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          overflow: hidden;
          padding: clamp(1rem, 2vw, 1.5rem);
          text-align: left;
          background:
            radial-gradient(ellipse at 50% 58%, rgba(212, 168, 83, 0.28) 0%, rgba(126, 62, 24, 0.16) 18%, rgba(45, 27, 78, 0.28) 38%, transparent 64%),
            radial-gradient(ellipse at 50% 22%, rgba(90, 48, 116, 0.34) 0%, rgba(10, 10, 15, 0.12) 34%, transparent 54%),
            linear-gradient(90deg, #020205 0%, #0a0710 18%, #15101f 50%, #0a0710 82%, #020205 100%);
        }

        .auth-library::before,
        .auth-library::after {
          width: clamp(230px, 31vw, 470px);
          opacity: 1;
          filter: saturate(1.35) brightness(1.25);
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.45), rgba(7, 5, 10, 0.08), rgba(0, 0, 0, 0.28)),
            repeating-linear-gradient(
              90deg,
              rgba(19, 10, 12, 0.96) 0 12px,
              rgba(112, 32, 23, 0.78) 12px 17px,
              rgba(16, 12, 25, 0.98) 17px 29px,
              rgba(54, 34, 94, 0.82) 29px 35px,
              rgba(35, 20, 13, 0.96) 35px 47px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(212, 168, 83, 0.18) 0 3px,
              transparent 3px 74px,
              rgba(98, 54, 24, 0.85) 74px 82px
            );
          box-shadow:
            inset -26px 0 38px rgba(0, 0, 0, 0.72),
            inset 0 0 44px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(212, 168, 83, 0.08);
        }

        .auth-library::after {
          box-shadow:
            inset -26px 0 38px rgba(0, 0, 0, 0.72),
            inset 0 0 44px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(212, 168, 83, 0.08);
        }

        .library-depth {
          opacity: 1;
          background:
            radial-gradient(ellipse at 50% 76%, rgba(212, 168, 83, 0.18) 0%, rgba(74, 14, 14, 0.12) 24%, transparent 48%),
            linear-gradient(180deg, transparent 0 58%, rgba(6, 4, 8, 0.66) 58% 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0 92px,
              rgba(212, 168, 83, 0.07) 92px 95px,
              transparent 95px 184px
            );
        }

        .library-arch {
          top: 10%;
          width: min(46vw, 660px);
          height: min(62vh, 560px);
          opacity: 0.75;
          border-color: rgba(212, 168, 83, 0.18);
          background:
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.18), rgba(45, 27, 78, 0.24) 50%, rgba(0, 0, 0, 0.52) 100%),
            linear-gradient(90deg, transparent 0 47%, rgba(212, 168, 83, 0.1) 49% 51%, transparent 53% 100%);
        }

        .shelf-cluster {
          width: clamp(180px, 22vw, 330px);
          top: 4%;
          bottom: 5%;
          gap: clamp(0.75rem, 1.8vh, 1.25rem);
          opacity: 0.92;
          filter: saturate(1.18) brightness(1.28);
        }

        .shelf-left {
          left: clamp(0.75rem, 3vw, 3.5rem);
        }

        .shelf-right {
          right: clamp(0.75rem, 3vw, 3.5rem);
        }

        .book-row {
          min-height: 58px;
          background: rgba(12, 8, 12, 0.42);
        }

        .book {
          opacity: 1;
        }

        .candle {
          opacity: 1;
          filter: brightness(1.18);
        }

        .candle-left {
          left: clamp(13%, 21vw, 25%);
        }

        .candle-right {
          right: clamp(13%, 21vw, 25%);
        }

        .auth-candle-glow {
          opacity: 0.95;
          background:
            radial-gradient(circle at 50% 52%, rgba(243, 194, 96, 0.34) 0%, rgba(212, 168, 83, 0.2) 20%, rgba(74, 14, 14, 0.18) 38%, transparent 62%),
            radial-gradient(circle at 30% 76%, rgba(243, 194, 96, 0.34) 0%, rgba(212, 168, 83, 0.08) 16%, transparent 31%),
            radial-gradient(circle at 70% 76%, rgba(243, 194, 96, 0.34) 0%, rgba(212, 168, 83, 0.08) 16%, transparent 31%);
        }

        .auth-vignette {
          z-index: 6;
          background:
            radial-gradient(ellipse at center, transparent 0%, transparent 44%, rgba(0, 0, 0, 0.55) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.54), transparent 22%, rgba(0, 0, 0, 0.62));
        }

        .auth-card {
          width: min(92vw, 430px);
          max-width: 430px;
          max-height: calc(100dvh - 2rem);
          overflow: hidden;
          padding: clamp(1.35rem, 3vh, 2rem);
          border-radius: 14px;
          background:
            linear-gradient(180deg, rgba(20, 14, 29, 0.91), rgba(8, 6, 14, 0.9)),
            rgba(10, 8, 20, 0.88);
          border: 1px solid rgba(212, 168, 83, 0.48);
          box-shadow:
            0 0 0 1px rgba(240, 230, 211, 0.05) inset,
            0 0 45px rgba(212, 168, 83, 0.24),
            0 24px 90px rgba(0, 0, 0, 0.78);
        }

        .auth-content {
          text-align: left;
        }

        .auth-title,
        .auth-subtitle,
        .auth-toggle {
          text-align: center;
        }

        .auth-title {
          margin-bottom: 0.25rem;
          font-size: clamp(25px, 3vw, 34px);
          line-height: 1.08;
          color: #fff2d6;
        }

        .auth-subtitle {
          margin-bottom: clamp(1.1rem, 3vh, 1.65rem);
          color: rgba(240, 230, 211, 0.8);
        }

        .auth-label {
          text-align: left;
          margin-bottom: 0.35rem;
          color: #d4a853;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .auth-input {
          height: 44px;
          padding: 0 0.8rem;
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-bottom: 1px solid rgba(212, 168, 83, 0.75);
          border-radius: 8px 8px 2px 2px;
          background:
            linear-gradient(180deg, rgba(34, 19, 24, 0.88), rgba(18, 12, 22, 0.9));
          box-shadow:
            inset 0 0 0 1px rgba(240, 230, 211, 0.03),
            inset 0 -12px 20px rgba(74, 14, 14, 0.12);
        }

        .auth-input:focus {
          border-color: rgba(212, 168, 83, 0.58);
          border-bottom-color: #f1d28a;
          box-shadow:
            0 0 0 3px rgba(212, 168, 83, 0.12),
            0 10px 22px rgba(212, 168, 83, 0.08);
        }

        .auth-field {
          margin-bottom: 0.9rem;
        }

        .auth-field.password-field {
          margin-bottom: 1.1rem;
        }

        .auth-submit {
          height: 46px;
          padding: 0 1rem;
          font-size: 15px;
          border-radius: 9px;
          background: linear-gradient(135deg, #9b6721 0%, #d4a853 44%, #ffe29a 100%);
        }

        .flying-page {
          opacity: 0.28;
        }

        .flying-book {
          opacity: 0.72;
          filter: brightness(1.18);
        }

        .owl {
          opacity: 0.34;
        }

        .dust-mote {
          opacity: 0.72;
        }

        @media (min-width: 1400px) {
          .auth-card {
            width: 430px;
          }

          .auth-title {
            font-size: 34px;
          }
        }

        @media (max-width: 900px) {
          .auth-library {
            padding: 1rem;
          }

          .shelf-cluster,
          .auth-library::before,
          .auth-library::after {
            opacity: 0.42;
          }

          .candle {
            opacity: 0.5;
          }

          .library-arch {
            width: 80vw;
          }
        }

        @media (max-width: 640px), (max-height: 620px) {
          .auth-library {
            height: auto;
            min-height: 100dvh;
            overflow-x: hidden;
            overflow-y: auto;
            align-items: center;
          }

          .auth-card {
            width: min(100%, 420px);
            max-height: none;
            overflow: visible;
            padding: 1.2rem;
          }

          .auth-title {
            font-size: 25px;
          }

          .auth-subtitle {
            margin-bottom: 1rem;
          }

          .shelf-cluster,
          .candle,
          .flying-book,
          .owl {
            opacity: 0.16;
          }
        }

        @media (max-width: 420px) {
          .auth-library {
            padding: 0.75rem;
          }

          .auth-card {
            padding: 1rem;
          }

          .auth-input {
            height: 42px;
          }

          .auth-submit {
            height: 44px;
          }
        }
      `}</style>

      <div className="auth-candle-glow" />
      <div className="library-depth" />
      <div className="library-arch" />
      <div className="auth-vignette" />

      <div className="shelf-cluster shelf-left">
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
      </div>

      <div className="shelf-cluster shelf-right">
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
        <div className="book-row">
          <span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" /><span className="book" />
        </div>
      </div>

      <div className="candle candle-left" />
      <div className="candle candle-right" />

      <div className="flying-page page-one" />
      <div className="flying-page page-two" />
      <div className="flying-page page-three" />
      <div className="flying-page page-four" />
      <div className="flying-page page-five" />

      <div className="flying-book book-one" />
      <div className="flying-book book-two" />
      <div className="flying-book book-three" />

      <div className="owl owl-one" />
      <div className="owl owl-two" />

      <div className="dust-mote dust-one" />
      <div className="dust-mote dust-two" />
      <div className="dust-mote dust-three" />
      <div className="dust-mote dust-four" />
      <div className="dust-mote dust-five" />
      <div className="dust-mote dust-six" />
      <div className="dust-mote dust-seven" />
      <div className="dust-mote dust-eight" />
      <div className="dust-mote dust-nine" />
      <div className="dust-mote dust-ten" />

      <div className="auth-card">
        <div className="auth-content">
          <h1 className="auth-title">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to your book library' : 'Start your book library'}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <div className="auth-field password-field">
              <label className="auth-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            {error && (
              <p className="auth-feedback error">{error}</p>
            )}
            {message && (
              <p className="auth-feedback message">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="auth-submit"
            >
              {loading ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="auth-toggle">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span
              onClick={() => { setIsLogin(!isLogin); setError(null); setMessage(null) }}
              className="auth-toggle-link"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

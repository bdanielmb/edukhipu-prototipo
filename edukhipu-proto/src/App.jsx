import { useState } from "react";
import {
  ArrowRight, Download, CheckCircle2, Sparkles, ChevronLeft,
  Clock, ShieldCheck, School, FileText
} from "lucide-react";

function track(eventName, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    console.log("[analytics]", eventName, params);
  }
}

const GRADES = [
  "1° Primaria", "2° Primaria", "3° Primaria", "4° Primaria", "5° Primaria", "6° Primaria",
  "1° Secundaria", "2° Secundaria", "3° Secundaria", "4° Secundaria", "5° Secundaria",
];

const AREAS = [
  "Comunicación", "Matemática", "Ciencia y Tecnología", "Personal Social",
  "Arte y Cultura", "Educación Física", "Castellano como segunda lengua",
];

const COMPETENCIES = {
  "Comunicación": ["Se comunica oralmente", "Lee diversos tipos de texto", "Escribe diversos tipos de texto"],
  "Matemática": ["Resuelve problemas de cantidad", "Resuelve problemas de regularidad, equivalencia y cambio", "Resuelve problemas de forma, movimiento y localización"],
  "Ciencia y Tecnología": ["Indaga mediante métodos científicos", "Explica el mundo físico", "Diseña soluciones tecnológicas"],
  "Personal Social": ["Construye su identidad", "Convive y participa democráticamente", "Gestiona responsablemente el espacio y el ambiente"],
  "Arte y Cultura": ["Aprecia de manera crítica manifestaciones artístico-culturales", "Crea proyectos desde los lenguajes del arte"],
  "Educación Física": ["Se desenvuelve de manera autónoma a través de su motricidad", "Asume una vida saludable"],
  "Castellano como segunda lengua": ["Se comunica oralmente en castellano como segunda lengua", "Lee diversos tipos de texto en castellano como segunda lengua"],
};

function KnotMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M6 8 L6 32" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="6" cy="14" r="3" fill="var(--thread-red)" />
      <circle cx="6" cy="24" r="3" fill="var(--ink)" />
      <path d="M18 4 L18 36" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="12" r="3" fill="var(--ink)" />
      <circle cx="18" cy="20" r="3" fill="var(--thread-red)" />
      <circle cx="18" cy="28" r="3" fill="var(--gold-deep)" />
      <path d="M30 8 L30 32" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="16" r="3" fill="var(--gold-deep)" />
      <circle cx="30" cy="26" r="3" fill="var(--ink)" />
    </svg>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <KnotMark size={26} />
      <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 20, color: "var(--ink)" }}>
        EDUKHIPU
      </span>
    </div>
  );
}

function TopBar({ step, onBack }) {
  return (
    <header style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "20px 32px", borderBottom: "1px solid var(--line)",
    }}>
      <Logo />
      {step > 0 && (
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6, background: "none",
            border: "none", color: "var(--ink-soft)", fontSize: 14, cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <ChevronLeft size={16} /> Volver
        </button>
      )}
    </header>
  );
}

function Landing({ onStart }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px 40px", textAlign: "center" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px",
        borderRadius: 999, border: "1px solid var(--line)", fontSize: 13, fontWeight: 700,
        color: "var(--gold-deep)", letterSpacing: "0.04em", marginBottom: 28, textTransform: "uppercase",
      }}>
        <Sparkles size={14} /> Empieza hoy, gratis
      </div>

      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.08, margin: "0 0 20px", color: "var(--ink)" }}>
        Tu planificación curricular,<br />
        <span style={{ color: "var(--thread-red)" }}>tejida</span> en minutos.
      </h1>

      <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 36px" }}>
        Genera sesiones de aprendizaje alineadas al CNEB, listas para
        adaptar a tu aula. Sin plantillas genéricas, sin horas extra de burocracia.
      </p>

      <button
        onClick={() => { track("account_created", { school_sector: "no_especificado", user_role: "docente" }); onStart(); }}
        style={{
          background: "var(--thread-red)", color: "#fff", border: "none",
          padding: "16px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700,
          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10,
          boxShadow: "0 8px 24px rgba(180, 67, 46, 0.28)",
        }}
      >
        Generar mi primera sesión gratis <ArrowRight size={18} />
      </button>

      <p style={{ fontSize: 13, color: "var(--ink-soft)", opacity: 0.75, marginTop: 14 }}>
        Sin tarjeta de crédito · Configura tu primera sesión en 5 minutos
      </p>

      <div style={{
        marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
        textAlign: "left", borderTop: "1px solid var(--line)", paddingTop: 36,
      }}>
        {[
          { icon: Clock, title: "3 horas/semana", text: "es lo que un docente peruano dedica solo a planificación, según MINEDU." },
          { icon: ShieldCheck, title: "Alineado al CNEB", text: "cada sesión respeta competencias, capacidades y desempeños oficiales." },
          { icon: School, title: "Hecho para el aula", text: "editable en menos de 5 minutos antes de imprimir o compartir." },
        ].map(({ icon: Icon, title, text }, i) => (
          <div key={i}>
            <Icon size={20} color="var(--gold-deep)" style={{ marginBottom: 10 }} />
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Registro({ onNext }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("Público");

  const canSubmit = name.trim() && email.trim();

  return (
    <FormShell
      eyebrow="Paso 1 de 3"
      title="Creemos tu cuenta"
      subtitle="Solo lo necesario para personalizar tu experiencia."
    >
      <Field label="Nombre completo">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. María Torres Quispe" style={inputStyle} />
      </Field>
      <Field label="Correo electrónico">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@colegio.edu.pe" type="email" style={inputStyle} />
      </Field>
      <Field label="Tipo de institución">
        <div style={{ display: "flex", gap: 10 }}>
          {["Público", "Privado"].map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              style={{
                flex: 1, padding: "12px", borderRadius: 10,
                border: sector === s ? "2px solid var(--thread-red)" : "1px solid var(--line)",
                background: sector === s ? "rgba(180,67,46,0.06)" : "#fff",
                color: "var(--ink)", fontWeight: 600, cursor: "pointer", fontSize: 14,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <PrimaryButton
        disabled={!canSubmit}
        onClick={() => onNext({ name, email, sector })}
        text="Continuar"
      />
    </FormShell>
  );
}

function Seleccion({ onNext }) {
  const [grade, setGrade] = useState("");
  const [area, setArea] = useState("");
  const [competency, setCompetency] = useState("");

  const competencies = area ? COMPETENCIES[area] : [];

  return (
    <FormShell
      eyebrow="Paso 2 de 3"
      title="Configura tu sesión"
      subtitle="Elige el grado, área y competencia del CNEB que vas a trabajar."
    >
      <Field label="Grado">
        <select value={grade} onChange={(e) => setGrade(e.target.value)} style={inputStyle}>
          <option value="">Selecciona un grado</option>
          {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </Field>

      <Field label="Área curricular">
        <select value={area} onChange={(e) => { setArea(e.target.value); setCompetency(""); }} style={inputStyle}>
          <option value="">Selecciona un área</option>
          {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </Field>

      <Field label="Competencia CNEB">
        <select value={competency} onChange={(e) => setCompetency(e.target.value)} style={inputStyle} disabled={!area}>
          <option value="">{area ? "Selecciona una competencia" : "Elige un área primero"}</option>
          {competencies.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      <PrimaryButton
        disabled={!grade || !area || !competency}
        onClick={() => {
          track("ai_prompt_submitted", { cneb_competency_selected: competency, educational_grade: grade });
          onNext({ grade, area, competency });
        }}
        text="Generar sesión con IA"
        icon={Sparkles}
      />
    </FormShell>
  );
}

function Generando({ onDone }) {
  useState(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  });

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "60vh", textAlign: "center", padding: 24,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        border: "3px solid var(--paper-dim)", borderTopColor: "var(--thread-red)",
        animation: "spin 0.9s linear infinite", marginBottom: 28,
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Tejiendo tu sesión...</h2>
      <p style={{ color: "var(--ink-soft)", fontSize: 15 }}>
        Alineando competencias, capacidades y desempeños del CNEB.
      </p>
    </div>
  );
}

function Resultado({ data, onRestart }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    track("session_downloaded", { file_format: "pdf", processing_time_seconds: 8 });
    setDownloaded(true);
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, color: "var(--success)",
        fontWeight: 700, fontSize: 14, marginBottom: 20,
      }}>
        <CheckCircle2 size={18} /> Sesión generada con éxito
      </div>

      <h1 style={{ fontSize: 30, marginBottom: 8 }}>
        {data.competency}
      </h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>
        {data.grade} · {data.area}
      </p>

      <div style={{
        border: "1px solid var(--line)", borderRadius: 16, padding: 28,
        background: "#fff", marginBottom: 28,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <FileText size={20} color="var(--gold-deep)" />
          <span style={{ fontWeight: 700 }}>Sesión_{data.grade.replace(/[°\s]/g, "")}_{data.area.replace(/\s/g, "")}.pdf</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>
          Incluye: propósito de aprendizaje, secuencia didáctica (inicio, desarrollo, cierre),
          criterios de evaluación y evidencias sugeridas — alineado a la competencia
          <strong> {data.competency}</strong>.
        </div>
      </div>

      {!downloaded ? (
        <PrimaryButton onClick={handleDownload} text="Descargar sesión (PDF)" icon={Download} />
      ) : (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "16px 20px",
          background: "rgba(76, 122, 94, 0.1)", borderRadius: 12, color: "var(--success)",
          fontWeight: 700, fontSize: 15, marginBottom: 14,
        }}>
          <CheckCircle2 size={20} /> Descarga completada — session_downloaded registrado
        </div>
      )}

      <button
        onClick={onRestart}
        style={{
          display: "block", margin: "18px auto 0", background: "none", border: "none",
          color: "var(--ink-soft)", fontSize: 14, cursor: "pointer", fontWeight: 600,
          textDecoration: "underline",
        }}
      >
        Generar otra sesión
      </button>
    </div>
  );
}

function FormShell({ eyebrow, title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 460, margin: "0 auto", padding: "56px 24px" }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--gold-deep)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
        {eyebrow}
      </div>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{title}</h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 32 }}>{subtitle}</p>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13.5, fontWeight: 700, marginBottom: 8, color: "var(--ink)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "13px 14px", borderRadius: 10,
  border: "1px solid var(--line)", fontSize: 15, fontFamily: "Manrope, sans-serif",
  color: "var(--ink)", background: "#fff",
};

function PrimaryButton({ onClick, text, disabled, icon: Icon = ArrowRight }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%", padding: "15px 20px", borderRadius: 12, border: "none",
        background: disabled ? "#D8D2C2" : "var(--thread-red)",
        color: disabled ? "#8A8474" : "#fff", fontWeight: 700, fontSize: 15.5,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        marginTop: 8, boxShadow: disabled ? "none" : "0 8px 20px rgba(180,67,46,0.22)",
      }}
    >
      {text} <Icon size={17} />
    </button>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [sessionData, setSessionData] = useState({});

  const steps = [
    <Landing onStart={() => setStep(1)} />,
    <Registro onNext={(d) => { setStep(2); }} />,
    <Seleccion onNext={(d) => { setSessionData(d); setStep(3); }} />,
    <Generando onDone={() => setStep(4)} />,
    <Resultado data={sessionData} onRestart={() => setStep(0)} />,
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <TopBar step={step} onBack={() => setStep(Math.max(0, step - 1))} />
      {steps[step]}
    </div>
  );
}

import { useState } from "react";
import {
  ArrowRight, Download, CheckCircle2, Sparkles, ChevronLeft,
  Clock, ShieldCheck, School, FileText, Mail, X, FileEdit
} from "lucide-react";
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, WidthType, ShadingType, BorderStyle
} from "docx";
import { saveAs } from "file-saver";

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

async function generateSessionDocx(data) {
  const gradeText = data.grade || "No especificado";
  const areaText = data.area || "No especificada";
  const competencyText = data.competency || "No especificada";
  const topicText = data.topic || "Sin título de tema";

  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "D8D2C2" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "D8D2C2" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "D8D2C2" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "D8D2C2" },
  };

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            heading: HeadingLevel.TITLE,
            children: [
              new TextRun({
                text: "EDUKHIPU",
                bold: true,
                color: "14213D",
                size: 32,
                font: "Calibri",
              }),
            ],
            space: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Sesión de Aprendizaje — Copiloto IA alineado al CNEB (Documento Editable)",
                italic: true,
                color: "96691F",
                size: 20,
                font: "Calibri",
              }),
            ],
            space: { after: 300 },
          }),

          // Metadata Box
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: tableBorder,
                    shading: { fill: "F7F4EC", type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Grado: ", bold: true, color: "14213D" }),
                          new TextRun({ text: gradeText, color: "2A3A5C" }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Área Curricular: ", bold: true, color: "14213D" }),
                          new TextRun({ text: areaText, color: "2A3A5C" }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: tableBorder,
                    shading: { fill: "F7F4EC", type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Competencia CNEB: ", bold: true, color: "14213D" }),
                          new TextRun({ text: competencyText, color: "2A3A5C" }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Tema de Clase: ", bold: true, color: "14213D" }),
                          new TextRun({ text: topicText, color: "2A3A5C" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ space: { after: 280 } }),

          // Topic Heading
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: `SESIÓN: ${topicText.toUpperCase()}`,
                bold: true,
                color: "B4432E",
                size: 28,
                font: "Calibri",
              }),
            ],
            space: { after: 200 },
          }),

          // Propósito
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: "1. PROPÓSITO DE APRENDIZAJE",
                bold: true,
                color: "96691F",
                size: 24,
                font: "Calibri",
              }),
            ],
            space: { before: 180, after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Los estudiantes de ${gradeText} movilizarán capacidades para desarrollar la competencia "${competencyText}" a través de actividades centradas en "${topicText}". Se trabajará con situaciones significativas del contexto real, promoviendo el pensamiento crítico, la indagación y la resolución cooperativa de problemas.`,
                size: 22,
                font: "Calibri",
              }),
            ],
            space: { after: 240 },
          }),

          // Secuencia Didáctica
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: "2. SECUENCIA DIDÁCTICA",
                bold: true,
                color: "96691F",
                size: 24,
                font: "Calibri",
              }),
            ],
            space: { before: 180, after: 120 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "• INICIO (15 minutos)", bold: true, color: "14213D", size: 22 }),
            ],
            space: { before: 80, after: 40 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `  - Saberes Previos: El docente abre la clase mediante preguntas problematizadoras vinculadas a "${topicText}".\n  - Conflicto Cognitivo: Se plantea un reto o dilema práctico del entorno cotidiano.\n  - Propósito y Criterios: Se presenta la meta de la sesión y las pautas con las que evaluará el aprendizaje.`,
                size: 21,
                font: "Calibri",
              }),
            ],
            space: { after: 160 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "• DESARROLLO (60 minutos)", bold: true, color: "14213D", size: 22 }),
            ],
            space: { before: 80, after: 40 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `  - Procesamiento de Información: En grupos de trabajo, los estudiantes indagan y sistematizan contenidos de "${topicText}".\n  - Aplicación Práctica: Desarrollan la actividad central movilizando la competencia "${competencyText}".\n  - Acompañamiento Formativo: El docente orienta a cada equipo resolviendo dudas y ajustando el nivel de andamiaje.`,
                size: 21,
                font: "Calibri",
              }),
            ],
            space: { after: 160 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "• CIERRE (15 minutos)", bold: true, color: "14213D", size: 22 }),
            ],
            space: { before: 80, after: 40 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `  - Metacognición Guiada: ¿Qué aprendimos hoy sobre "${topicText}"? ¿Qué dificultades tuvimos y cómo las superamos?\n  - Evaluación Formativa: Revisión y autoevaluación del producto o evidencia realizada durante la clase.`,
                size: 21,
                font: "Calibri",
              }),
            ],
            space: { after: 240 },
          }),

          // Criterios de Evaluación
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: "3. CRITERIOS DE EVALUACIÓN Y EVIDENCIAS",
                bold: true,
                color: "96691F",
                size: 24,
                font: "Calibri",
              }),
            ],
            space: { before: 180, after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `• Criterio 1: Demuestra comprensión de los conceptos de "${topicText}".\n• Criterio 2: Moviliza correctamente las capacidades de la competencia "${competencyText}".\n• Evidencia de Aprendizaje: Ficha de trabajo, organizador visual u objeto elaborado en clase.`,
                size: 22,
                font: "Calibri",
              }),
            ],
            space: { after: 360 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Documento generado por EDUKHIPU — Copiloto IA alineado al CNEB (Editable en Microsoft Word).",
                italic: true,
                color: "8A8474",
                size: 18,
                font: "Calibri",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const cleanTopic = topicText.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, "_").slice(0, 25);
  const cleanGrade = gradeText.replace(/[°\s]/g, "");
  saveAs(blob, `Sesion_${cleanGrade}_${cleanTopic}.docx`);
}

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

// Step 0: Landing
function Landing({ onStart }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px 40px", textAlign: "center" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px",
        borderRadius: 999, border: "1px solid var(--line)", fontSize: 13, fontWeight: 700,
        color: "var(--gold-deep)", letterSpacing: "0.04em", marginBottom: 28, textTransform: "uppercase",
      }}>
        <Sparkles size={14} /> Prueba instantánea · Sin registros
      </div>

      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.08, margin: "0 0 20px", color: "var(--ink)" }}>
        Tu planificación curricular,<br />
        <span style={{ color: "var(--thread-red)" }}>tejida</span> en Word editable.
      </h1>

      <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 540, margin: "0 auto 36px" }}>
        Genera sesiones de aprendizaje alineadas al CNEB del MINEDU, listas para
        descargar directamente en <strong>Microsoft Word (.docx)</strong> y adaptar a tu aula.
      </p>

      <button
        onClick={() => { track("landing_cta_clicked", { action: "start_free_session" }); onStart(); }}
        style={{
          background: "var(--thread-red)", color: "#fff", border: "none",
          padding: "16px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700,
          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10,
          boxShadow: "0 8px 24px rgba(180, 67, 46, 0.28)",
        }}
      >
        Crear mi primera sesión gratis <ArrowRight size={18} />
      </button>

      <p style={{ fontSize: 13, color: "var(--ink-soft)", opacity: 0.75, marginTop: 14 }}>
        Cero registros iniciales · Formato .docx 100% editable
      </p>

      <div style={{
        marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
        textAlign: "left", borderTop: "1px solid var(--line)", paddingTop: 36,
      }}>
        {[
          { icon: Clock, title: "Ahorra 3+ horas", text: "Genera la estructura curricular completa en menos de un minuto." },
          { icon: ShieldCheck, title: "Alineado al CNEB", text: "Competencias, capacidades y criterios oficiales de MINEDU." },
          { icon: FileEdit, title: "100% Editable", text: "Descarga en .docx para modificar en Microsoft Word libremente." },
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

// Step 1: Selección CNEB + Tema de la clase
function SeleccionCneb({ onNext }) {
  const [grade, setGrade] = useState("");
  const [area, setArea] = useState("");
  const [competency, setCompetency] = useState("");
  const [topic, setTopic] = useState("");

  const competencies = area ? COMPETENCIES[area] : [];
  const canSubmit = grade && area && competency && topic.trim().length >= 3;

  return (
    <FormShell
      eyebrow="Paso 1 de 2"
      title="Configura tu sesión de aprendizaje"
      subtitle="Elige grado, área, competencia del CNEB e ingresa el tema de la clase."
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

      <Field label="Tema de la clase">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ej. La fotosíntesis y el ecosistema, Ecuaciones de 1er grado"
          style={inputStyle}
        />
      </Field>

      <PrimaryButton
        disabled={!canSubmit}
        onClick={() => {
          track("cneb_form_submitted", { cneb_competency: competency, grade, area, topic });
          onNext({ grade, area, competency, topic });
        }}
        text="Generar sesión en Word (.docx)"
        icon={Sparkles}
      />
    </FormShell>
  );
}

// Transición Animada
function Generando({ onDone }) {
  useState(() => {
    const t = setTimeout(onDone, 2000);
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
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Tejiendo tu sesión pedagógica...</h2>
      <p style={{ color: "var(--ink-soft)", fontSize: 15 }}>
        Alineando competencias, capacidades, secuencias didácticas y criterios CNEB.
      </p>
    </div>
  );
}

// Modal de Captura de Lead (Email)
function EmailLeadModal({ isOpen, onClose, onConfirm, topic }) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      track("lead_email_captured", { email });
      onConfirm(email);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16, background: "none", border: "none",
            cursor: "pointer", color: "var(--ink-soft)",
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          width: 48, height: 48, borderRadius: 12, background: "rgba(180, 67, 46, 0.1)",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
          color: "var(--thread-red)",
        }}>
          <Mail size={24} />
        </div>

        <h2 style={{ fontSize: 22, margin: "0 0 8px" }}>¿A dónde enviamos tus próximas sesiones?</h2>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 20 }}>
          Ingresa tu correo para descargar el archivo <strong>.docx</strong> de <em>"{topic}"</em> y guardar tu progreso.
        </p>

        <form onSubmit={handleSubmit}>
          <Field label="Correo electrónico">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="docente@colegio.edu.pe"
              style={inputStyle}
              autoFocus
            />
          </Field>

          <PrimaryButton
            text="Descargar Word Editable (.docx)"
            icon={Download}
            disabled={!email.trim()}
          />
        </form>

        <p style={{ fontSize: 12, color: "var(--ink-soft)", opacity: 0.7, textAlign: "center", marginTop: 12 }}>
          Sin spam. Solo plantillas y sesiones CNEB editables.
        </p>
      </div>
    </div>
  );
}

// Step 2: Resultado / Previsualización y Descarga .docx
function Resultado({ data, onRestart }) {
  const [downloaded, setDownloaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLeadAndDownload = async (email) => {
    setIsModalOpen(false);
    await generateSessionDocx(data);
    setDownloaded(true);
    track("docx_downloaded", { topic: data.topic, grade: data.grade, area: data.area });
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, color: "var(--success)",
        fontWeight: 700, fontSize: 14, marginBottom: 16,
      }}>
        <CheckCircle2 size={18} /> Sesión generada con éxito
      </div>

      <h1 style={{ fontSize: 32, marginBottom: 8 }}>
        {data.topic}
      </h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 16, marginBottom: 28 }}>
        {data.grade} · {data.area} · <em>{data.competency}</em>
      </p>

      {/* Previsualización Estructurada */}
      <div style={{
        border: "1px solid var(--line)", borderRadius: 16, padding: 28,
        background: "#fff", marginBottom: 28, boxShadow: "0 4px 16px rgba(20,33,61,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, pb: 12, borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FileText size={22} color="var(--gold-deep)" />
            <span style={{ fontWeight: 700, fontSize: 15 }}>
              Sesión_{(data.grade || "").replace(/[°\s]/g, "")}_{(data.topic || "Clase").replace(/\s/g, "_").slice(0, 15)}.docx
            </span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(192, 138, 46, 0.15)", color: "var(--gold-deep)", padding: "4px 10px", borderRadius: 6 }}>
            Word Editable
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, color: "var(--ink)" }}>
          <div>
            <strong style={{ color: "var(--gold-deep)", display: "block", marginBottom: 4 }}>1. Propósito de Aprendizaje:</strong>
            <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              Los estudiantes movilizarán la competencia "{data.competency}" abordando el tema de "{data.topic}".
            </p>
          </div>

          <div>
            <strong style={{ color: "var(--gold-deep)", display: "block", marginBottom: 4 }}>2. Secuencia Didáctica:</strong>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--ink-soft)", lineHeight: 1.6 }}>
              <li><strong>Inicio (15m):</strong> Saberes previos sobre {data.topic}, conflicto cognitivo y propósito.</li>
              <li><strong>Desarrollo (60m):</strong> Trabajo cooperativo e investigación práctica de la competencia.</li>
              <li><strong>Cierre (15m):</strong> Metacognición guiada y autoevaluación formativa.</li>
            </ul>
          </div>

          <div>
            <strong style={{ color: "var(--gold-deep)", display: "block", marginBottom: 4 }}>3. Criterios de Evaluación:</strong>
            <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              Evidencia clara de logro según los estándares CNEB para {data.grade}.
            </p>
          </div>
        </div>
      </div>

      {!downloaded ? (
        <PrimaryButton onClick={handleOpenModal} text="Descargar Sesión (.docx)" icon={Download} />
      ) : (
        <>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, padding: "16px 20px",
            background: "rgba(76, 122, 94, 0.1)", borderRadius: 12, color: "var(--success)",
            fontWeight: 700, fontSize: 15, marginBottom: 14,
          }}>
            <CheckCircle2 size={20} /> Archivo .docx generado y descargado correctamente
          </div>
          <button
            onClick={() => generateSessionDocx(data)}
            style={{
              width: "100%", padding: "13px 20px", borderRadius: 12,
              border: "1px solid var(--line)", background: "#fff",
              color: "var(--ink)", fontWeight: 600, fontSize: 14.5, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            Descargar de nuevo (.docx) <Download size={15} />
          </button>
        </>
      )}

      <button
        onClick={onRestart}
        style={{
          display: "block", margin: "20px auto 0", background: "none", border: "none",
          color: "var(--ink-soft)", fontSize: 14, cursor: "pointer", fontWeight: 600,
          textDecoration: "underline",
        }}
      >
        Crear otra sesión
      </button>

      {/* Modal Lead Capture */}
      <EmailLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLeadAndDownload}
        topic={data.topic}
      />
    </div>
  );
}

function FormShell({ eyebrow, title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--gold-deep)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
        {eyebrow}
      </div>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{title}</h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 28 }}>{subtitle}</p>
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

  const handleRestart = () => {
    setSessionData({});
    setStep(0);
  };

  const steps = [
    <Landing onStart={() => setStep(1)} />,
    <SeleccionCneb onNext={(data) => { setSessionData(data); setStep(2); }} />,
    <Generando onDone={() => setStep(3)} />,
    <Resultado data={sessionData} onRestart={handleRestart} />,
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <TopBar step={step} onBack={() => setStep(Math.max(0, step - 1))} />
      {steps[step]}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * Site — Psicóloga Eloína Ariana (one-page)
 * Ajustes rápidos:
 * - WHATSAPP_NUMBER (com DDI)
 * - INSTAGRAM_PROFILE_URL
 * - EMAIL_PROFISSIONAL
 */

const WHATSAPP_NUMBER = "5511923084953";
const WHATSAPP_PREFILL =
  "Olá, Eloína! Gostaria de agendar uma sessão. Meu nome é ____.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILL
)}`;

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/eloina.psi/";
const EMAIL_PROFISSIONAL = "eloinaariana.psi@gmail.com";

/**
 * Destaca a seção ativa no menu enquanto o usuário rola a página.
 * - ids: lista de ids de seções (ex.: ["inicio", "sobre", ...])
 */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids?.[0] ?? "");

  useEffect(() => {
    if (!Array.isArray(ids) || ids.length === 0) return;

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    // Fallback caso o browser não suporte IntersectionObserver
    if (typeof IntersectionObserver === "undefined") {
      setActive(els[0].id);
      return;
    }

    // A lógica aqui marca como ativa a seção MAIS VISÍVEL (maior intersectionRatio).
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );

        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        // thresholds mais granulares deixam a seleção da seção “mais visível” mais estável
        threshold: [0, 0.08, 0.15, 0.25, 0.35, 0.5, 0.65, 0.8, 0.92],
        // empurra a “zona de atenção” pra cima, evitando ficar alternando demais em transições
        rootMargin: "-10% 0px -60% 0px",
      }
    );

    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, [ids]);

  return active;
}

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface)] px-3 py-1 text-sm text-[color:var(--text)]">
      {children}
    </span>
  );
}

function Button({ href, children, variant = "primary", onClick, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-[color:var(--accent)] text-white hover:opacity-95 focus-visible:ring-[color:var(--accent)] ring-offset-[color:var(--bg)]",
    soft:
      "bg-[color:var(--surface)] text-[color:var(--text)] border border-[color:var(--stroke)] hover:bg-white/70 focus-visible:ring-[color:var(--accent)] ring-offset-[color:var(--bg)]",
    ghost:
      "text-[color:var(--text)] hover:bg-white/50 focus-visible:ring-[color:var(--accent)] ring-offset-[color:var(--bg)]",
  };
  const cls = `${base} ${variants[variant] || variants.primary}`;

  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <div className="mb-3">
          <Chip>{eyebrow}</Chip>
        </div>
      ) : null}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[color:var(--text)]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-[color:var(--muted)]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-[color:var(--stroke)] bg-[color:var(--surface)] shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function Icon({ name }) {
  const common = "h-5 w-5";
  if (name === "heart") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s-7-4.6-9.5-8.6C.5 9 2.5 6 6 6c2 0 3.2 1 4 2 .8-1 2-2 4-2 3.5 0 5.5 3 3.5 6.4C19 16.4 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l1.2 6.1L20 12l-6.8 3.9L12 22l-1.2-6.1L4 12l6.8-3.9L12 2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3v3M17 3v3M4.5 8.5h15M6.5 5.5h11c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-11c-1.1 0-2-.9-2-2v-12c0-1.1.9-2 2-2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "whats") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 12.1A7.9 7.9 0 0 1 7.9 19.2L4 20l.9-3.7A7.9 7.9 0 1 1 20 12.1Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.4 9.2c.2-.5.4-.5.7-.5h.6c.2 0 .5 0 .7.5.2.6.6 1.6.6 1.7 0 .2 0 .4-.2.6l-.3.4c-.1.1-.2.3 0 .6.2.3.8 1.2 1.8 2 .9.7 1.7 1 2 .8.2-.1.7-.8.9-1.1.2-.3.3-.3.6-.2.3.1 1.8.9 2.1 1.1.3.2.5.3.6.4.1.1.1.7-.2 1.3-.3.6-1.3 1.2-1.8 1.3-.4.1-1 .2-2.2-.2-1.3-.4-2.9-1.5-4-2.7-1.1-1.2-2.1-2.9-2.3-4-.2-1 .2-1.7.4-2.1Z"
          fill="currentColor"
          opacity="0.25"
        />
      </svg>
    );
  }
  if (name === "ig") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 2.8h10c2.3 0 4.2 1.9 4.2 4.2v10c0 2.3-1.9 4.2-4.2 4.2H7C4.7 21.2 2.8 19.3 2.8 17V7C2.8 4.7 4.7 2.8 7 2.8Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M17.6 6.4h.01"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return null;
}

function Divider() {
  return <div className="my-10 h-px w-full bg-[color:var(--stroke)]" />;
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[color:var(--stroke)] bg-white/30">
      <button
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-[color:var(--text)] font-medium leading-snug">{q}</span>
        <span
          className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--stroke)] bg-white/50 transition ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <span className="text-lg leading-none">+</span>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden px-5 pb-5 text-[color:var(--muted)] leading-relaxed">
          {a}
        </div>
      </div>
    </div>
  );
}

function TestimonialsCarousel({ items }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!Array.isArray(items) || items.length === 0) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items]);

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[color:var(--text)]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 border border-[color:var(--stroke)]">
            <Icon name="spark" />
          </span>
          <div>
            <div className="text-sm font-medium">Vozes que atravessaram comigo</div>
            <div className="text-xs text-[color:var(--muted)]">
              Relatos autorizados, identidade preservada.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-[color:var(--stroke)] bg-white/40 px-3 py-2 text-sm text-[color:var(--text)] hover:bg-white/60"
            onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
            aria-label="Anterior"
            type="button"
          >
            ←
          </button>
          <button
            className="rounded-full border border-[color:var(--stroke)] bg-white/40 px-3 py-2 text-sm text-[color:var(--text)] hover:bg-white/60"
            onClick={() => setI((v) => (v + 1) % items.length)}
            aria-label="Próximo"
            type="button"
          >
            →
          </button>
        </div>
      </div>

      <motion.div
        key={i}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-6"
      >
        <div className="text-sm text-[color:var(--muted)] mb-2">✨ {items[i].title}</div>
        <blockquote className="text-[color:var(--text)] text-base sm:text-lg leading-relaxed">
          “{items[i].quote}”
        </blockquote>
        <div className="mt-4 text-sm text-[color:var(--muted)]">— {items[i].by}</div>
      </motion.div>

      <div className="mt-6 flex flex-wrap gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === i
                ? "w-10 bg-[color:var(--accent)]"
                : "w-2.5 bg-white/60 border border-[color:var(--stroke)]"
            }`}
            aria-label={`Ir para depoimento ${idx + 1}`}
            type="button"
          />
        ))}
      </div>
    </Card>
  );
}

export default function SitePsicologaEloinaAriana() {
  const nav = useMemo(
    () => [
      { id: "inicio", label: "Início" },
      { id: "sobre", label: "Sobre" },
      { id: "atuacao", label: "Atuação" },
      { id: "agenda", label: "Agenda" },
      { id: "como-funciona", label: "Como funciona" },
      { id: "valores", label: "Investimento" },
      { id: "faq", label: "FAQ" },
      { id: "contato", label: "Contato" },
    ],
    []
  );

  const active = useActiveSection(nav.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);

  const atuacao = useMemo(
    () => [
      {
        title: "Gestação",
        desc:
          "Para você que está grávida e percebe que junto com o bebê nascem medos, inseguranças e questionamentos. A gestação não é apenas espera — é preparação emocional.",
      },
      {
        title: "Puerpério",
        desc:
          "Para você que ama profundamente, mas se sente exausta. Aqui, você pode falar sobre o que não cabe nas fotos.",
      },
      {
        title: "Tentantes",
        desc:
          "Para você que vive a montanha‑russa da esperança e da frustração. A espera também é uma travessia — e merece cuidado.",
      },
      {
        title: "Luto gestacional",
        desc:
          "Para você que perdeu um bebê e não encontra espaço para viver essa dor. O luto precisa ser nomeado para ser elaborado.",
      },
      {
        title: "Lutos femininos",
        desc:
          "Perdas que transformam a existência: fim, divórcio, morte do companheiro, e a reconstrução do sentido e da identidade.",
      },
      {
        title: "Reconstrução da identidade",
        desc:
          "Quando você se pergunta: “Quem eu sou agora?” Depois da maternidade, do fim ou da perda.",
      },
    ],
    []
  );

  const depoimentos = useMemo(
    () => [
      {
        title: "Encontrar um espaço seguro",
        quote:
          "Ter um espaço de escuta sem julgamentos transformou minha forma de me enxergar. Pela primeira vez, pude falar do que sentia sem precisar parecer forte. A terapia me ajudou a organizar pensamentos, compreender emoções e me reconectar comigo mesma.",
        by: "Paciente",
      },
      {
        title: "Preparar-se antes da maternidade",
        quote:
          "Iniciar a psicoterapia antes de engravidar foi um dos maiores cuidados que tive comigo. Durante a gestação e o puerpério, esse acompanhamento foi essencial para que eu atravessasse essa fase com mais equilíbrio e consciência.",
        by: "Paciente",
      },
      {
        title: "Ansiedade e sobrecarga",
        quote:
          "Eu acreditava que precisava dar conta de tudo. A ansiedade foi o sinal de que eu precisava parar e olhar para mim. Na terapia, aprendi a reconhecer meus limites, pedir ajuda e me cuidar com mais responsabilidade.",
        by: "Paciente",
      },
      {
        title: "Reconstrução após um momento difícil",
        quote:
          "Procurei ajuda em um dos períodos mais desafiadores da minha vida. O processo me ajudou a ressignificar o que estava vivendo e a construir uma nova forma de me posicionar diante da realidade. Hoje me sinto mais consciente e fortalecida.",
        by: "Paciente",
      },
      {
        title: "Impacto que permanece",
        quote:
          "Mesmo depois de um tempo, as reflexões da terapia continuam ecoando em mim. A forma como aprendi a organizar minhas emoções mudou a maneira como vivo meus dias.",
        by: "Paciente",
      },
      {
        title: "Autocuidado feminino",
        quote:
          "A psicoterapia me ensinou que cuidar de mim não é egoísmo. É condição para viver com mais equilíbrio e presença.",
        by: "Paciente",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Terapia é só para quem está em sofrimento intenso?",
        a: (
          <>
            <p>
              Não. Muitas mulheres procuram terapia não apenas quando estão em crise, mas quando
              percebem que algo precisa ser compreendido com mais profundidade.
            </p>
            <p className="mt-3">
              A terapia também é espaço de prevenção, organização emocional e fortalecimento da
              autonomia — você não precisa esperar “não dar mais conta”.
            </p>
          </>
        ),
      },
      {
        q: "Atendimento on-line funciona?",
        a: (
          <>
            <p>
              Sim. O atendimento on-line mantém a mesma ética, sigilo e qualidade técnica do
              presencial.
            </p>
            <p className="mt-3">
              Para muitas mulheres, inclusive, o formato on-line facilita a continuidade do processo
              em meio à rotina.
            </p>
          </>
        ),
      },
      {
        q: "Quanto tempo dura o processo?",
        a: (
          <>
            <p>
              A terapia não tem prazo fixo. Cada história tem seu ritmo. Algumas questões pedem
              acompanhamento mais breve; outras exigem elaboração mais profunda.
            </p>
            <p className="mt-3">
              O tempo é construído ao longo do processo, com diálogo e avaliação constante.
            </p>
          </>
        ),
      },
      {
        q: "Você atende casais?",
        a: (
          <>
            <p>
              Meu foco é o atendimento individual de mulheres. Quando a demanda envolve
              relacionamento, trabalhamos as questões a partir da sua perspectiva, fortalecendo sua
              clareza emocional e posicionamento.
            </p>
          </>
        ),
      },
      {
        q: "Aceita Planos de Saúde?",
        a: (
          <>
            <p>
              O atendimento é particular. Forneço a nota fiscal, o que permite que você verifique a
              possibilidade de reembolso com o seu Plano de Saúde.
            </p>
          </>
        ),
      },
      {
        q: "Aceita Cartão de Crédito?",
        a: (
          <>
            <p>
              Sim, é possível realizar o pagamento no Cartão de Crédito ou via PIX, conforme a sua
              preferência.
            </p>
          </>
        ),
      },
      {
        q: "Quanto tempo dura a sessão?",
        a: (
          <>
            <p>
              Cada sessão tem duração média de 50 minutos. É um tempo pensado para você falar com
              tranquilidade, aprofundar o que precisa ser elaborado e sair com mais clareza.
            </p>
          </>
        ),
      },
      {
        q: "E se eu precisar cancelar ou remarcar?",
        a: (
          <>
            <p>
              Imprevistos acontecem. Peço que, sempre que possível, o cancelamento ou pedido de
              remarcação seja feito com antecedência mínima de 24 horas.
            </p>
            <p className="mt-3">
              Sessões canceladas sem aviso prévio podem ser consideradas como realizadas.
            </p>
          </>
        ),
      },
    ],
    []
  );

  const onNavClick = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <style>{`
        :root{
          --bg: #FBF6EF;            /* off-white quente */
          --surface: rgba(255,255,255,.55);
          --stroke: rgba(44, 38, 30, .12);
          --text: #2C261E;          /* marrom profundo */
          --muted: rgba(44, 38, 30, .72);
          --accent: #6B7A57;        /* verde oliva */
          --accent2: #B86A53;       /* terracota */
          --accent3: #5B6473;       /* azul acinzentado */
          --wine: #6A2F3C;          /* vinho discreto */
        }
        html{ scroll-behavior:smooth; }
        ::selection{ background: rgba(184,106,83,.25); }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[color:var(--bg)]/70 border-b border-[color:var(--stroke)]">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                onNavClick("inicio");
              }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-2xl border border-[color:var(--stroke)] bg-white/50 grid place-items-center">
                <Icon name="heart" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Eloína Ariana</div>
                <div className="text-xs text-[color:var(--muted)]">
                  Psicóloga Perinatal • CRP 03/14766
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => onNavClick(n.id)}
                  className={`rounded-full px-4 py-2 text-sm transition hover:bg-white/50 ${
                    active === n.id ? "bg-white/60 border border-[color:var(--stroke)]" : ""
                  }`}
                  type="button"
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Instagram
                </Button>
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> WhatsApp
                </Button>
              </div>

              {/* Mobile menu */}
              <button
                className="lg:hidden inline-flex items-center justify-center rounded-full border border-[color:var(--stroke)] bg-white/50 px-4 py-2 text-sm"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-label="Abrir menu"
                type="button"
              >
                {menuOpen ? "Fechar" : "Menu"}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div className="lg:hidden mt-3 rounded-2xl border border-[color:var(--stroke)] bg-white/50 p-2">
              <div className="grid grid-cols-2 gap-2">
                {nav.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => onNavClick(n.id)}
                    className={`rounded-xl px-3 py-2 text-sm text-left hover:bg-white/60 ${
                      active === n.id
                        ? "bg-white/70 border border-[color:var(--stroke)]"
                        : ""
                    }`}
                    type="button"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Instagram
                </Button>
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> WhatsApp
                </Button>
              </div>
            </div>
          ) : null}
        </Container>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[520px] w-[520px] rounded-full bg-[color:var(--accent2)]/12 blur-3xl" />

        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-2">
                <Chip>Psicologia Perinatal</Chip>
                <Chip>Atendimento online e presencial</Chip>
                <Chip>Saúde emocional feminina</Chip>
              </div>

              <h1 className="mt-6 text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
                Um espaço onde sua experiência importa.
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[color:var(--muted)]">
                Acolhimento, profundidade e ética para mulheres em travessias: gestação, puerpério,
                tentativas de engravidar, luto e reconstrução da identidade.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> Quero começar
                </Button>
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Ver Instagram
                </Button>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 border border-[color:var(--stroke)]">
                      <Icon name="shield" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Sigilo e ética</div>
                      <div className="mt-1 text-sm text-[color:var(--muted)]">
                        Processo protegido pelo Código de Ética.
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 border border-[color:var(--stroke)]">
                      <Icon name="calendar" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Agenda organizada</div>
                      <div className="mt-1 text-sm text-[color:var(--muted)]">
                        Agendamento direto e orientação clara.
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 border border-[color:var(--stroke)]">
                      <Icon name="heart" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Escuta que sustenta</div>
                      <div className="mt-1 text-sm text-[color:var(--muted)]">
                        Firmeza e delicadeza na mesma presença.
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="space-y-4"
            >
              <Card className="p-6">
                <div className="text-sm text-[color:var(--muted)]">Como eu posso te ajudar</div>
                <div className="mt-2 text-lg font-semibold">Travessias que atravessamos juntas</div>
                <ul className="mt-4 space-y-3 text-[color:var(--muted)]">
                  {[
                    "Gestação e preparação emocional",
                    "Puerpério e sobrecarga",
                    "Tentantes e ansiedade",
                    "Luto gestacional",
                    "Lutos femininos",
                    "Reconstrução da identidade",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--accent)]/15 border border-[color:var(--stroke)] text-[color:var(--accent)]">
                        •
                      </span>
                      <span className="text-sm leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button href={WHATSAPP_LINK}>
                    <Icon name="whats" /> Agendar primeiro encontro
                  </Button>
                </div>
              </Card>

              <TestimonialsCarousel items={depoimentos} />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Quem sou eu"
            title="Quem sustenta essa escuta"
            subtitle="Minha história com a Psicologia não começou apenas na universidade. Ela começou nos encontros, nas perguntas que não tinham respostas simples e nas travessias que a própria vida me apresentou."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[.95fr_1.05fr] items-start">
            {/* Foto editorial */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.25rem] border border-[color:var(--stroke)] bg-white/20" />
              <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-[color:var(--accent)]/12 blur-3xl" />
              <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-[color:var(--accent2)]/12 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--stroke)] bg-white/40 shadow-lg">
                <div className="relative aspect-[4/5] sm:aspect-auto sm:h-[480px] w-full">
                <img
                  src="/perfil_site.png"
                  alt="Eloína Ariana - Psicóloga Perinatal"
                  className="h-full w-full object-cover object-[center_top]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
              </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Chip>CRP 03/14766</Chip>
                <Chip>Psicologia Perinatal</Chip>
                <Chip>Humanista-existencial</Chip>
              </div>
            </div>

            {/* Texto */}
            <div className="space-y-6">
              <Card className="p-6 sm:p-8">
                <div className="text-sm font-semibold">Sobre mim</div>
                <div className="mt-3 space-y-4 text-[color:var(--muted)] leading-relaxed">
                  <p>
                    Sou psicóloga clínica, especialista em Psicologia Perinatal, com atuação
                    fundamentada na perspectiva humanista-existencial e base fenomenológica.
                    Dedico minha prática ao cuidado emocional de mulheres que atravessam gestação,
                    puerpério, tentativas de engravidar, luto gestacional e processos de
                    reconstrução da própria identidade.
                  </p>
                  <p>
                    Compreendo a maternidade não apenas como evento biológico, mas como uma
                    transformação emocional e existencial — que reorganiza vínculos, crenças,
                    prioridades e a forma como a mulher se percebe no mundo.
                  </p>
                  <p>
                    Sou também mulher, esposa e mãe. Foi na experiência real da maternidade que
                    aprofundei a compreensão de que essa travessia amplia o amor e, ao mesmo
                    tempo, revela fragilidades e cansaços invisíveis. Essa vivência não substitui
                    minha formação, mas amplia minha sensibilidade clínica.
                  </p>
                  <p>
                    No processo terapêutico, o foco não é o rótulo — é a experiência vivida.
                    Interessa compreender como cada mulher sente, percebe e significa sua própria
                    história.
                  </p>
                </div>
              </Card>

              <Card className="p-6 sm:p-8">
                <div className="text-sm font-semibold">O que sustenta meu trabalho</div>
                <div className="mt-3 space-y-4 text-[color:var(--muted)] leading-relaxed">
                  <p>
                    Minha prática é guiada pela ética, pela responsabilidade e por uma escuta
                    profunda.
                  </p>
                  <p>
                    Não trabalho com respostas prontas ou fórmulas de enfrentamento. Acredito que
                    cada mulher precisa de um espaço onde possa reconhecer suas ambivalências,
                    organizar suas emoções e fortalecer sua autonomia sem ser apressada ou julgada.
                  </p>
                  <p>
                    Nem sempre é sobre dar conta. Às vezes é sobre se compreender e
                    reconstruir-se com mais verdade.
                  </p>

                  <Divider />

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Espaço seguro",
                      "Escuta atenta e respeitosa",
                      "Seriedade profissional",
                      "Profundidade sem julgamento",
                      "Respeito ao seu tempo",
                      "Cuidado com sua singularidade",
                    ].map((it) => (
                      <div key={it} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent2)]/15 border border-[color:var(--stroke)] text-[color:var(--accent2)]">
                          <Icon name="spark" />
                        </span>
                        <span className="text-sm text-[color:var(--text)]/90 leading-relaxed">
                          {it}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> Quero começar
                </Button>
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Conhecer conteúdos
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Atuação */}
      <section id="atuacao" className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Para quem é a terapia"
            title="Mudanças que transformam por dentro"
            subtitle="A terapia é para mulheres que estão vivendo mudanças que nem sempre aparecem para o mundo — mas reorganizam tudo internamente."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {atuacao.map((b) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 border border-[color:var(--stroke)] text-[color:var(--accent)]">
                      <Icon name="heart" />
                    </span>
                    <div className="text-base font-semibold">{b.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                    {b.desc}
                  </p>
                  <div className="mt-5">
                    <Button href={WHATSAPP_LINK} variant="ghost">
                      Quero apoio nessa travessia →
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mt-8 p-7 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr] items-start">
              <div>
                <div className="text-sm font-semibold">Quando procurar ajuda</div>
                <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                  Você pode procurar terapia quando sente que está dando conta por fora, mas se
                  desfazendo por dentro. Quando a maternidade não está como imaginou. Quando o
                  cansaço vem acompanhado de culpa.
                </p>
                <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                  Quando a espera por um bebê começa a pesar emocionalmente. Quando a perda silenciou
                  demais. Quando o fim de um relacionamento desmontou planos e certezas.
                </p>
                <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                  Você não precisa estar em colapso para buscar ajuda — às vezes é só reconhecer que
                  algumas travessias não precisam ser atravessadas sozinhas.
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--stroke)] bg-white/40 p-5">
                <div className="text-sm text-[color:var(--muted)]">Se você se reconheceu…</div>
                <div className="mt-2 text-lg font-semibold">Talvez seja hora de começar</div>
                <div className="mt-4 grid gap-3">
                  <Button href={WHATSAPP_LINK}>
                    <Icon name="whats" /> Quero começar
                  </Button>
                  <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                    <Icon name="ig" /> Ver Instagram
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Agenda"
            title="Agendamento simples e direto"
            subtitle="Clique no WhatsApp para combinar o melhor horário. Se preferir, você pode enviar sua disponibilidade e eu retorno com opções."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 border border-[color:var(--stroke)]">
                  <Icon name="calendar" />
                </span>
                <div>
                  <div className="text-sm font-semibold">Como agendar</div>
                  <div className="text-sm text-[color:var(--muted)]">Em poucos passos</div>
                </div>
              </div>

              <ol className="mt-6 space-y-4 text-[color:var(--muted)]">
                {[
                  "Clique no botão de WhatsApp",
                  "Envie seu nome e sua demanda principal",
                  "Indique dias/horários possíveis",
                  "Confirmamos o melhor encaixe e envio das orientações",
                ].map((s, idx) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--accent)]/15 border border-[color:var(--stroke)] text-[color:var(--accent)] text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> Agendar agora
                </Button>
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Falar pelo Instagram
                </Button>
              </div>

              <div className="mt-6 rounded-2xl border border-[color:var(--stroke)] bg-white/40 p-5">
                <div className="text-sm font-semibold">Mensagem pronta</div>
                <div className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                  {WHATSAPP_PREFILL}
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 sm:p-8">
                <div className="text-sm font-semibold">Conteúdos no Instagram</div>
                <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                  No Instagram, compartilho reflexões e recortes sobre maternidade real, luto,
                  ambivalências e reconstruções — com linguagem acessível e profundidade.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                    <Icon name="ig" /> Abrir @eloina.psi
                  </Button>
                  <Button href={WHATSAPP_LINK}>
                    <Icon name="whats" /> Agendar
                  </Button>
                </div>
                <div className="mt-6 rounded-2xl border border-[color:var(--stroke)] bg-white/40 p-5">
                  <div className="text-sm font-semibold">Um lembrete</div>
                  <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                    Conteúdo ajuda, mas não substitui um cuidado individualizado. Se você sente que
                    este momento pede elaboração, o primeiro passo pode ser um encontro.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Como funciona"
            title="Clareza, presença e consistência"
            subtitle="O processo é construído em diálogo: acolhimento no primeiro encontro, ritmo individualizado e compromisso com seu tempo."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Primeira sessão",
                text:
                  "Nosso primeiro encontro é um espaço de acolhimento e escuta. Compreendemos o que você está vivendo, suas inquietações e o que espera da terapia — e definimos os próximos passos.",
              },
              {
                title: "Frequência",
                text:
                  "A frequência é definida de forma individualizada. Em geral, iniciamos semanalmente para garantir consistência e profundidade; depois, avaliamos juntas o ritmo mais adequado.",
              },
              {
                title: "Modalidade e sigilo",
                text:
                  "Atendimentos presenciais e on-line, com a mesma ética, qualidade e confidencialidade. O processo é sigiloso e protegido pelo Código de Ética Profissional.",
              },
            ].map((it) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-6 h-full">
                  <div className="text-base font-semibold">{it.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                    {it.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mt-8 p-7 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-center">
              <div>
                <div className="text-sm font-semibold">Formas de pagamento</div>
                <p className="mt-2 text-[color:var(--muted)] leading-relaxed">
                  Os pagamentos podem ser realizados por transferência, PIX ou cartão. As
                  informações detalhadas são enviadas no momento do agendamento.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> Quero começar
                </Button>
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Falar no Instagram
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Valores / Investimento */}
      <section id="valores" className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Investimento"
            title="Um cuidado que respeita o seu processo"
            subtitle="O investimento é parte do compromisso com um acompanhamento sério, ético e consistente. O formato ideal é definido com base na sua demanda, rotina e momento de vida."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="p-7 sm:p-8">
              <div className="text-sm text-[color:var(--muted)]">Ritmo</div>
              <div className="mt-1 text-xl font-semibold">Semanal</div>
              <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
                Indicado quando você precisa de consistência para aprofundar: início do processo,
                fases de maior intensidade emocional e momentos de reorganização interna.
              </p>
              <div className="mt-6">
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> Ver disponibilidade
                </Button>
              </div>
            </Card>

            <Card className="p-7 sm:p-8 ring-1 ring-[color:var(--accent)]/25">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-[color:var(--muted)]">Ritmo</div>
                  <div className="mt-1 text-xl font-semibold">Quinzenal</div>
                </div>
                <span className="inline-flex items-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] border border-[color:var(--stroke)] px-3 py-1 text-xs font-medium">
                  Estratégico
                </span>
              </div>
              <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
                Um ritmo sustentável para continuidade e manutenção — quando você precisa de apoio,
                mas com mais espaço entre os encontros.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> Consultar investimento
                </Button>
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Tirar dúvidas
                </Button>
              </div>
            </Card>

            <Card className="p-7 sm:p-8">
              <div className="text-sm text-[color:var(--muted)]">Além da psicoterapia</div>
              <div className="mt-1 text-xl font-semibold">Projetos e grupos</div>
              <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
                Palestras, pré-natal psicológico e a jornada “Travessia” (grupo para gestantes).
                Propostas construídas com ética, fundamentação e presença.
              </p>
              <div className="mt-6">
                <Button href={WHATSAPP_LINK} variant="soft">
                  Receber informações
                </Button>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-7 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr] items-start">
              <div>
                <div className="text-sm font-semibold">O que compõe esse investimento</div>
                <p className="mt-2 text-[color:var(--muted)] leading-relaxed">
                  O valor não é apenas “uma sessão”. É o cuidado com o enquadre: sigilo, ética,
                  preparo técnico, estudo contínuo, responsabilidade clínica e um espaço construído
                  para sustentar a sua travessia com firmeza e delicadeza.
                </p>
                <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                  Você não precisa decidir tudo agora. No agendamento, eu te explico as opções e
                  juntas encontramos um formato possível — sem promessas vazias e sem pressa.
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--stroke)] bg-white/40 p-6">
                <div className="text-sm font-semibold">Formas de pagamento</div>
                <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                  PIX ou cartão de crédito.
                </p>
                <Divider />
                <div className="text-sm font-semibold">Reembolso</div>
                <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                  Atendimento particular com emissão de nota fiscal para você verificar possibilidade
                  de reembolso junto ao seu plano de saúde.
                </p>
                <div className="mt-5">
                  <Button href={WHATSAPP_LINK}>
                    <Icon name="whats" /> Quero agendar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Perguntas frequentes"
            title="Dúvidas comuns"
            subtitle="Se a sua pergunta não estiver aqui, você pode me chamar no WhatsApp e eu te respondo com clareza."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href={WHATSAPP_LINK}>
              <Icon name="whats" /> Tirar dúvida no WhatsApp
            </Button>
            <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
              <Icon name="ig" /> Enviar mensagem no Instagram
            </Button>
          </div>
        </Container>
      </section>

      {/* Contato */}
      <section id="contato" className="py-14 sm:py-20">
        <Container>
          <SectionTitle
            eyebrow="Contato"
            title="Vamos combinar seu primeiro encontro"
            subtitle="Você pode agendar pelo WhatsApp. Se preferir, preencha o formulário e eu retorno com orientações."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-6 sm:p-8">
              <div className="text-sm font-semibold">Atalho rápido</div>
              <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                O caminho mais rápido é pelo WhatsApp, já com mensagem pronta.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button href={WHATSAPP_LINK}>
                  <Icon name="whats" /> Chamar no WhatsApp
                </Button>
                <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                  <Icon name="ig" /> Abrir Instagram
                </Button>
              </div>

              <div className="mt-8 rounded-2xl border border-[color:var(--stroke)] bg-white/40 p-5">
                <div className="text-sm font-semibold">Observação importante</div>
                <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                  Atendimento pautado pelo Código de Ética Profissional da Psicologia.
                  <span className="text-[color:var(--text)]/90"> CRP 03/14766</span>.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <div className="text-sm font-semibold">Formulário</div>
              <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                (Este formulário abre seu e-mail. Se quiser integrar envio automático, posso adaptar.)
              </p>

              <form
                className="mt-6 grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const nome = (fd.get("nome") || "").toString();
                  const contato = (fd.get("contato") || "").toString();
                  const demanda = (fd.get("demanda") || "").toString();

                  const corpo = `Nome: ${nome}\nContato: ${contato}\n\nDemanda principal:\n${demanda}\n`;
                  const subject = encodeURIComponent("Agendamento — Psicoterapia");
                  const body = encodeURIComponent(corpo);

                  window.location.href = `mailto:${EMAIL_PROFISSIONAL}?subject=${subject}&body=${body}`;
                }}
              >
                <label className="grid gap-2">
                  <span className="text-sm text-[color:var(--muted)]">Seu nome</span>
                  <input
                    name="nome"
                    required
                    className="h-12 rounded-2xl border border-[color:var(--stroke)] bg-white/60 px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                    placeholder="Digite seu nome"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-[color:var(--muted)]">WhatsApp ou e-mail</span>
                  <input
                    name="contato"
                    required
                    className="h-12 rounded-2xl border border-[color:var(--stroke)] bg-white/60 px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                    placeholder="(xx) xxxxx-xxxx / email@"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-[color:var(--muted)]">O que você está vivendo agora?</span>
                  <textarea
                    name="demanda"
                    rows={5}
                    required
                    className="rounded-2xl border border-[color:var(--stroke)] bg-white/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                    placeholder="Conte, com a liberdade que for possível."
                  />
                </label>

                <div className="mt-2 flex flex-col sm:flex-row gap-3">
                  <Button>
                    <Icon name="spark" /> Enviar
                  </Button>
                  <Button href={WHATSAPP_LINK} variant="soft">
                    Prefiro WhatsApp
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-[color:var(--stroke)] bg-[color:var(--bg)]/80">
        <Container className="py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-sm font-semibold">Eloína Ariana • Psicóloga Perinatal</div>
              <div className="mt-1 text-sm text-[color:var(--muted)]">
                CRP 03/14766 • Atendimento online e presencial
              </div>
              <div className="mt-1 text-sm text-[color:var(--muted)]">
                Contato: {EMAIL_PROFISSIONAL}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href={INSTAGRAM_PROFILE_URL} variant="soft">
                <Icon name="ig" /> Instagram
              </Button>
              <Button href={WHATSAPP_LINK}>
                <Icon name="whats" /> WhatsApp
              </Button>
            </div>
          </div>
          <div className="mt-6 text-xs text-[color:var(--muted)]">
            © {new Date().getFullYear()} Eloína Ariana. Todos os direitos reservados.
          </div>
        </Container>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 hover:opacity-95"
          aria-label="Chamar no WhatsApp"
        >
          <Icon name="whats" />
          <span className="hidden sm:inline">Agendar</span>
        </a>
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stroke)] bg-white/60 px-5 py-3 text-sm font-medium text-[color:var(--text)] shadow-sm hover:bg-white/80"
          aria-label="Abrir Instagram"
        >
          <Icon name="ig" />
          <span className="hidden sm:inline">Instagram</span>
        </a>
      </div>
    </div>
  );
}

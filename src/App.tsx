import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  Circle,
  Sparkles,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

type View = "grid" | "editorial";

function getSavedView(): View {
  const savedView = localStorage.getItem("portfolio-view");
  return savedView === "editorial" ? "editorial" : "grid";
}

const projects = [
  {
    number: "01",
    title: "Fintech for everyday",
    type: "Product design · 2024",
    tone: "lime",
    copy: "Как мы превратили сложное управление финансами в спокойный ежедневный ритуал.",
    mark: "₽",
  },
  {
    number: "02",
    title: "Care, made human",
    type: "Research & UX · 2024",
    tone: "violet",
    copy: "Новый опыт записи к врачу, который помогает не тревожиться и быстро получить помощь.",
    mark: "+",
  },
  {
    number: "03",
    title: "Teams in motion",
    type: "Product strategy · 2023",
    tone: "blue",
    copy: "Единое пространство для команд: от первой идеи до запущенного продукта.",
    mark: "↗",
  },
  {
    number: "04",
    title: "City after dark",
    type: "Mobile app · 2023",
    tone: "orange",
    copy: "Гид по городу, который подстраивается под настроение, время и компанию.",
    mark: "◐",
  },
];

function Header() {
  return (
    <header className="header">
      <a className="identity" href="#top" aria-label="На главную">
        <span>AM</span>
        <span>
          Product designer
          <br />
          Москва, GMT+3
        </span>
      </a>
      <nav aria-label="Основная навигация">
        <a href="#work">Работы</a>
        <a href="#about">Обо мне</a>
      </nav>
      <a className="contact" href="mailto:hello@example.com">
        Давайте работать <ArrowUpRight size={15} />
      </a>
    </header>
  );
}

function Art({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <div className={`project-art art--${project.tone}`} aria-hidden="true">
      <span className="noise" />
      <span className={`shape shape--${index + 1}`}>{project.mark}</span>
      <span className="art-label">CASE / {project.number}</span>
    </div>
  );
}

function GridView() {
  return (
    <main id="top">
      <section className="hero">
        <Badge>
          <span className="status-dot" /> Открыт к предложениям
        </Badge>
        <h1>
          Проектирую продукты,
          <br />
          которыми <span className="scribble">хочется</span> пользоваться.
        </h1>
        <div className="hero-foot">
          <p>
            Привет, я Александр — продуктовый дизайнер. Превращаю сложные системы
            в простые, честные и запоминающиеся интерфейсы.
          </p>
          <a href="#work">
            <ArrowDown size={18} /> Избранные работы
          </a>
        </div>
        <div className="floaty" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
      <section className="projects" id="work" aria-label="Избранные проекты">
        {projects.map((project, index) => (
          <article
            className={`project-card project-card--${index + 1}`}
            key={project.title}
          >
            <a
              href={`#case-${project.number}`}
              aria-label={`Открыть кейс ${project.title}`}
            >
              <Art project={project} index={index} />
            </a>
            <div className="project-meta">
              <div>
                <span>{project.number} / 04</span>
                <h2>{project.title}</h2>
              </div>
              <div>
                <p>{project.copy}</p>
                <span>{project.type}</span>
              </div>
              <Button variant="outline" size="icon" aria-label="Открыть кейс">
                <ArrowUpRight />
              </Button>
            </div>
          </article>
        ))}
      </section>
      <About />
    </main>
  );
}

function EditorialView() {
  return (
    <main id="top" className="editorial">
      <section className="editorial-hero">
        <div>
          <Badge>
            <span className="status-dot" /> Available for selected projects
          </Badge>
          <h1>
            Александр
            <br />
            Сухов<span>.</span>
          </h1>
        </div>
        <div className="editorial-intro">
          <Asterisk />
          <p>
            Независимый продуктовый дизайнер. Помогаю командам находить ясность
            и создавать цифровые продукты с характером.
          </p>
          <span>Selected work · 2023—2025</span>
        </div>
      </section>
      <section className="editorial-list" id="work">
        {projects.map((project, index) => (
          <article key={project.title} className="editorial-row">
            <span>{project.number}</span>
            <div className="editorial-preview">
              <Art project={project} index={index} />
            </div>
            <div>
              <h2>{project.title}</h2>
              <span>{project.type}</span>
            </div>
            <p>{project.copy}</p>
            <Button variant="ghost" size="icon" aria-label="Открыть проект">
              <ArrowUpRight />
            </Button>
          </article>
        ))}
      </section>
      <About />
    </main>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div>
        <Sparkles size={18} /> Немного обо мне
      </div>
      <p>
        Люблю задавать вопросы, собирать системы и находить <em>простое</em> в
        сложном. Последние 7 лет проектирую опыт на стыке бизнеса, технологий и
        человеческих привычек.
      </p>
      <a href="mailto:hello@example.com">
        Обсудить задачу <ArrowUpRight />
      </a>
    </section>
  );
}

function DevSwitcher({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) {
  return (
    <aside className="dev-switcher">
      <span>
        <Circle size={7} fill="currentColor" /> DEV MODE
      </span>
      <div>
        <Button
          size="sm"
          variant={view === "grid" ? "default" : "ghost"}
          onPress={() => setView("grid")}
        >
          01 Плитка
        </Button>
        <Button
          size="sm"
          variant={view === "editorial" ? "default" : "ghost"}
          onPress={() => setView("editorial")}
        >
          02 Список
        </Button>
      </div>
    </aside>
  );
}

export default function App() {
  const [view, setView] = useState<View>(getSavedView);
  useEffect(() => {
    localStorage.setItem("portfolio-view", view);
    window.scrollTo({ top: 0 });
  }, [view]);
  return (
    <>
      <Header />
      {view === "grid" ? <GridView /> : <EditorialView />}
      {import.meta.env.DEV && <DevSwitcher view={view} setView={setView} />}
    </>
  );
}

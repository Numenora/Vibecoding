import { type MouseEvent, useEffect, useState } from "react";

const projects = [
  { slug: "fintech-for-everyday", number: "01", title: "Fintech for everyday", discipline: "Product design", year: "2025", description: "Как мы превратили сложное управление финансами в спокойный ежедневный ритуал.", image: "/projects/fintech.jpg" },
  { slug: "care-made-human", number: "02", title: "Care, made human", discipline: "Research & UX", year: "2024", description: "Новый опыт записи к врачу, который помогает не тревожиться и быстро получить помощь.", image: "/projects/health.jpg" },
  { slug: "teams-in-motion", number: "03", title: "Teams in motion", discipline: "Product strategy", year: "2023", description: "Единое пространство для команд: от первой идеи до запущенного продукта.", image: "/projects/teams.jpg" },
  { slug: "city-after-dark", number: "04", title: "City after dark", discipline: "Mobile app", year: "2023", description: "Гид по городу, который подстраивается под настроение, время и компанию.", image: "/projects/city.jpg" },
];

function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function InternalLink({ href, className, children, ariaLabel }: { href: string; className?: string; children: React.ReactNode; ariaLabel?: string }) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
  }

  return <a href={href} className={className} aria-label={ariaLabel} onClick={onClick}>{children}</a>;
}

function Header() {
  return (
    <header className="site-header">
      <InternalLink href="/">Александр Сухов</InternalLink>
      <nav aria-label="Основная навигация">
        <InternalLink href="/#work">Работы</InternalLink>
        <InternalLink href="/#about">Обо мне</InternalLink>
        <a href="mailto:hello@example.com">Связаться</a>
      </nav>
    </header>
  );
}

function Project({ project }: { project: (typeof projects)[number] }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="project" id={`project-${project.number}`}>
      <div className="project-meta">
        <span>{project.number}</span>
        <h2><InternalLink href={href}>{project.title}</InternalLink></h2>
        <p className="project-type">{project.discipline}<br />{project.year}</p>
        <p className="project-description">{project.description}</p>
        <InternalLink href={href}>Смотреть проект</InternalLink>
      </div>
      <InternalLink className="project-cover" href={href} ariaLabel={`Открыть проект ${project.title}`}>
        <img src={project.image} alt={`Обложка проекта ${project.title}`} />
      </InternalLink>
    </article>
  );
}

function HomePage() {
  return (
    <main>
      <section className="intro" aria-labelledby="intro-title">
        <h1 id="intro-title">Независимый продуктовый дизайнер.<br />Помогаю командам находить ясность<br />и создавать цифровые продукты<br />с характером.</h1>
        <p>Selected work · 2021—2025</p>
      </section>
      <section className="work" id="work" aria-label="Избранные проекты">
        {projects.map((project) => <Project project={project} key={project.number} />)}
      </section>
      <About />
    </main>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div>
        <h2>Обо мне</h2>
        <p>Работаю на стыке продукта, пользователей и бизнеса. Исследую, упрощаю сложное и проектирую интерфейсы, которые помогают людям достигать целей.</p>
        <p>Люблю задавать вопросы, обсуждать системы и идеи.</p>
      </div>
      <div className="contacts">
        <h2>Контакты</h2>
        <a href="mailto:hello@example.com">hello@example.com</a>
      </div>
    </section>
  );
}

function CasePage({ project }: { project: (typeof projects)[number] }) {
  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="case-page">
      <section className="case-hero">
        <div className="case-heading">
          <span>{project.number}</span>
          <h1>{project.title}</h1>
        </div>
        <div className="case-summary">
          <p>{project.description}</p>
          <dl>
            <div><dt>Направление</dt><dd>{project.discipline}</dd></div>
            <div><dt>Год</dt><dd>{project.year}</dd></div>
          </dl>
        </div>
      </section>

      <img className="case-cover" src={project.image} alt={`Обложка проекта ${project.title}`} />

      <section className="case-content" aria-label="Структура кейса">
        <div><span>01</span><h2>Задача</h2><p>Описание проекта будет добавлено позже.</p></div>
        <div><span>02</span><h2>Подход</h2><p>Описание процесса будет добавлено позже.</p></div>
        <div><span>03</span><h2>Результат</h2><p>Результаты проекта будут добавлены позже.</p></div>
      </section>

      <nav className="case-navigation" aria-label="Навигация между проектами">
        <InternalLink href={`/projects/${previous.slug}`}>
          <span>← Предыдущий проект</span>
          <strong>{previous.title}</strong>
        </InternalLink>
        <InternalLink href="/#work" className="back-to-work">Все проекты</InternalLink>
        <InternalLink href={`/projects/${next.slug}`}>
          <span>Следующий проект →</span>
          <strong>{next.title}</strong>
        </InternalLink>
      </nav>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <p>Страница не найдена.</p>
      <InternalLink href="/">Вернуться к проектам</InternalLink>
    </main>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (path === "/" && hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [path]);

  const slug = path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const project = projects.find((item) => item.slug === slug);

  return (
    <div id="top">
      <Header />
      {path === "/" ? <HomePage /> : project ? <CasePage project={project} /> : <NotFoundPage />}
    </div>
  );
}

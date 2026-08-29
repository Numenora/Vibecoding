import { type MouseEvent, useEffect, useState } from "react";

const projects = [
  {
    slug: "course-editor",
    legacySlugs: ["fintech-for-everyday"],
    number: "01",
    title: "Редактор курсов",
    discipline: "Product design · EdTech",
    year: "",
    description: "Единый редактор, который объединил авторов, методистов и дизайнеров в одном процессе — без ручного переноса контента между инструментами.",
    image: "/projects/Editor.png",
    caseSections: [
      {
        title: "Контекст",
        text: "Авторы готовили курсы в привычных инструментах — Notion, Wiki и других редакторах. Затем контент-менеджеры вручную переносили материалы в админку Практикума, а методисты, дизайнеры и другие специалисты подключались к работе через отдельные тикеты.",
      },
      {
        title: "Проблема",
        text: "Производство курса состояло из множества передач между людьми и системами. Команда тратила время на перенос уже созданного контента, согласования растягивались, а исходные материалы и их версии хранились в разных местах.",
      },
      {
        title: "Решение",
        text: "Мы спроектировали Notion-like редактор внутри админки и сделали её единой точкой входа для всей команды. Авторы смогли собирать курс сразу в продуктовой среде, включая сложные блоки тренажёров, а методисты и дизайнеры — обсуждать изменения в контексте через комментарии и упоминания.",
      },
      {
        title: "Что изменилось",
        text: "Из процесса исчез отдельный этап ручного переноса материалов. Работа над курсом стала прозрачнее: актуальный контент хранится в одном месте, участники видят общий контекст и быстрее подключаются к обсуждению.",
      },
    ],
  },
  { slug: "care-made-human", number: "02", title: "Care, made human", discipline: "Research & UX", year: "2024", description: "Новый опыт записи к врачу, который помогает не тревожиться и быстро получить помощь.", image: "/projects/health.jpg" },
  { slug: "teams-in-motion", number: "03", title: "Teams in motion", discipline: "Product strategy", year: "2023", description: "Единое пространство для команд: от первой идеи до запущенного продукта.", image: "/projects/teams.jpg" },
  { slug: "city-after-dark", number: "04", title: "City after dark", discipline: "Mobile app", year: "2023", description: "Гид по городу, который подстраивается под настроение, время и компанию.", image: "/projects/city.jpg" },
];

function navigate(href: string) {
  const from = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.history.pushState({ from }, "", href);
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
      <InternalLink href="/" className="site-header-home">Главная</InternalLink>
      <a className="site-header-contact" href="https://t.me/">Telegram</a>
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
        <div className="project-type-spacer" aria-hidden="true" />
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
  const next = projects[(index + 1) % projects.length];
  const storedFrom = typeof window.history.state?.from === "string" ? window.history.state.from : "";
  const currentPath = `/projects/${project.slug}`;
  const backHref = storedFrom && storedFrom !== currentPath ? storedFrom : "/#work";
  const backSlug = backHref.match(/^\/projects\/([^/?#]+)/)?.[1];
  const backProject = projects.find((item) => item.slug === backSlug || ("legacySlugs" in item && item.legacySlugs?.includes(backSlug ?? "")));
  const backLabel = backProject?.title ?? "Главная";

  return (
    <main className="case-page">
      <section className="case-hero">
        <div className="case-heading">
          <h1>{project.title}</h1>
        </div>
        <div className="case-summary">
          <p>{project.description}</p>
        </div>
      </section>

      <img className={`case-cover${project.slug === "course-editor" ? " case-cover--editor" : ""}`} src={project.image} alt={`Обложка проекта ${project.title}`} />

      <section className="case-content" aria-label="Описание кейса">
        {"caseSections" in project && project.caseSections ? project.caseSections.map((section, sectionIndex) => (
          <div key={section.title}>
            <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
        )) : (
          <>
            <div><span>01</span><h2>Задача</h2><p>Описание проекта будет добавлено позже.</p></div>
            <div><span>02</span><h2>Подход</h2><p>Описание процесса будет добавлено позже.</p></div>
            <div><span>03</span><h2>Результат</h2><p>Результаты проекта будут добавлены позже.</p></div>
          </>
        )}
      </section>

      <nav className="case-navigation" aria-label="Навигация между проектами">
        <InternalLink href={backHref}>
          <span>← Назад</span>
          <strong>{backLabel}</strong>
        </InternalLink>
        <InternalLink href={`/projects/${next.slug}`}>
          <span>Следующий проект</span>
          <strong>{next.title}</strong>
        </InternalLink>
      </nav>

      <footer className="case-footer">
        <p>
          Available for full/part-time and collaborations.<br />
          Based in Serbia, working worldwide. <a href="mailto:hello@example.com">Let’s collaborate.</a>
        </p>
        <div className="case-footer-bottom">
          <nav aria-label="Social links">
            <a href="mailto:hello@example.com">Email</a>
            <a href="https://www.linkedin.com/">Linkedin</a>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.whatsapp.com/">WhatsApp</a>
          </nav>
          <span>Version 2.1 / © Ann Bittner 2026</span>
        </div>
      </footer>
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
  const project = projects.find((item) => item.slug === slug || ("legacySlugs" in item && item.legacySlugs?.includes(slug ?? "")));

  return (
    <div id="top">
      <Header />
      {path === "/" ? <HomePage /> : project ? <CasePage project={project} /> : <NotFoundPage />}
    </div>
  );
}

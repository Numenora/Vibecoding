const projects = [
  { number: "01", title: "Fintech for everyday", discipline: "Product design", year: "2025", description: "Как мы превратили сложное управление финансами в спокойный ежедневный ритуал.", image: "/projects/fintech.jpg" },
  { number: "02", title: "Care, made human", discipline: "Research & UX", year: "2024", description: "Новый опыт записи к врачу, который помогает не тревожиться и быстро получить помощь.", image: "/projects/health.jpg" },
  { number: "03", title: "Teams in motion", discipline: "Product strategy", year: "2023", description: "Единое пространство для команд: от первой идеи до запущенного продукта.", image: "/projects/teams.jpg" },
  { number: "04", title: "City after dark", discipline: "Mobile app", year: "2023", description: "Гид по городу, который подстраивается под настроение, время и компанию.", image: "/projects/city.jpg" },
];

function Header() {
  return (
    <header className="site-header">
      <a href="#top">Александр Сухов</a>
      <nav aria-label="Основная навигация">
        <a href="#work">Работы</a>
        <a href="#about">Обо мне</a>
        <a href="mailto:hello@example.com">Связаться</a>
      </nav>
    </header>
  );
}

function Project({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="project" id={`project-${project.number}`}>
      <div className="project-meta">
        <span>{project.number}</span>
        <h2>{project.title}</h2>
        <p className="project-type">{project.discipline}<br />{project.year}</p>
        <p className="project-description">{project.description}</p>
        <a href={`#project-${project.number}`}>Смотреть проект</a>
      </div>
      <a className="project-cover" href={`#project-${project.number}`} aria-label={`Открыть проект ${project.title}`}>
        <img src={project.image} alt={`Обложка проекта ${project.title}`} />
      </a>
    </article>
  );
}

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <section className="intro" aria-labelledby="intro-title">
          <h1 id="intro-title">
            Независимый продуктовый дизайнер.<br />
            Помогаю командам находить ясность<br />
            и создавать цифровые продукты<br />
            с характером.
          </h1>
          <p>Selected work · 2021—2025</p>
        </section>
        <section className="work" id="work" aria-label="Избранные проекты">
          {projects.map((project) => <Project project={project} key={project.number} />)}
        </section>
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
      </main>
    </div>
  );
}

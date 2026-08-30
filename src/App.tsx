import { type MouseEvent, useEffect, useRef, useState } from "react";

const projects = [
  {
    slug: "course-editor",
    legacySlugs: ["fintech-for-everyday"],
    number: "01",
    title: "Редактор курсов",
    discipline: "Product design · EdTech",
    year: "",
    description: "Единый редактор, который объединил авторов, методистов и дизайнеров в одном процессе — без ручного переноса контента между инструментами.",
    highlight: "−43% задач контент-администраторов · −24% COS",
    image: "/projects/Editor.png",
    video: "/projects/Editor.mp4",
    mockup: "/projects/Editor-macbook.png",
    caseSections: [
      {
        title: "Контекст",
        text: "Авторы готовили курсы в привычных инструментах — Notion, Wiki и других редакторах. Затем контент-менеджеры вручную переносили материалы в админку Практикума, а методисты, дизайнеры и другие специалисты подключались к работе через отдельные тикеты.",
      },
      {
        title: "Проблема",
        text: "Производство курса состояло из множества передач между людьми и системами. В процессе была отдельно выделена роль контент-администраторов, которые занимались только переносом материалов из авторских черновиков в админку. Команда тратила время на повторную сборку уже созданного контента, согласования растягивались, а исходные материалы и их версии хранились в разных местах.",
      },
      {
        title: "Решение",
        text: "Мы спроектировали Notion-like редактор внутри админки и сделали её единой точкой входа для всей команды. Авторы смогли собирать курс сразу в продуктовой среде, включая сложные блоки тренажёров, а методисты и дизайнеры — обсуждать изменения в контексте через комментарии и упоминания.",
      },
      {
        title: "Что изменилось",
        text: "Из процесса исчез отдельный этап ручного переноса материалов. Контент-администраторы больше не переносят авторские черновики в админку и занимаются только финальной настройкой уроков перед запуском профессий в прод. Актуальный контент хранится в одном месте, а участники быстрее подключаются к работе в общем контексте.",
      },
      {
        title: "Результат",
        text: "Количество задач для контент-администраторов уменьшилось на 43%, а COS сократился на 24%.",
      },
    ],
  },
  {
    slug: "catalog-impact",
    legacySlugs: ["course-catalog", "care-made-human", "teams-in-motion", "growth-experiments"],
    number: "02",
    title: "Обновление каталога",
    discipline: "Product design · Growth",
    year: "2026",
    description: "Как новый каталог курсов упростил выбор и дал статистически значимый рост ключевых этапов воронки — от клика по карточке до первого урока.",
    highlight: "+37,77% к подписке · +23,63% к первому уроку",
    image: "",
    caseSections: [
      {
        title: "Контекст",
        text: "В старом каталоге пользователи терялись среди курсов и тарифов. Плоская структура категорий, нестабильная работа тегов и несколько карточек одного курса создавали информационный шум и усложняли переход к выбору программы.",
      },
      {
        title: "Что изменили",
        text: "Мы добавили подкатегории, исправили фильтры и теги, объединили тарифы в одну карточку курса и убрали цены из общего списка. Новый дизайн карточек позволил показывать больше вариантов на одном экране и сделал путь к подробной информации понятнее.",
      },
      {
        title: "Проверка",
        text: "Новую версию сравнили с прежним каталогом в A/B-эксперименте на десктопе и мобильном вебе. Изменения запускались одним пакетом, поэтому эксперимент измерял совокупный эффект нового каталога, а не вклад каждого элемента по отдельности.",
      },
      {
        title: "Эффект",
        text: "Конверсия из каталога в клик по карточке выросла на 25,08%, в подписку — на 37,77%, а в первый урок по подписке на платную профессию — на 23,63%. Конверсия в посещение чекаута увеличилась на 73,38%.",
      },
      {
        title: "После эксперимента",
        text: "Статистически значимый рост подтвердил ценность нового каталога, и решение быстро масштабировали. Отдельно продолжили наблюдать за нижней частью воронки: изменение конверсии в оплату не было статистически значимым, поэтому этот этап требовал дополнительной проверки.",
      },
    ],
  },
  {
    slug: "checkout-redesign",
    legacySlugs: ["city-after-dark"],
    number: "03",
    title: "Редизайн чекаута",
    discipline: "Product design · Growth",
    year: "2025",
    description: "Как исследование флоу покупки и две итерации дизайна помогли упростить чекаут, устранить просадку первого шага и увеличить конверсию в оплату на десктопе.",
    highlight: "+16,4% к конверсии в оплату",
    image: "",
    caseSections: [
      {
        title: "Контекст",
        text: "Покупка курса состояла из множества шагов и сообщений, которые не всегда согласовывались между собой. На чекауте пользователю было сложно сопоставить тарифы, понять условия и уверенно перейти к оплате. Накопление небольших непонятностей создавало риск выхода из сценария.",
      },
      {
        title: "Моя роль",
        text: "Я исследовал путь покупки, собирал результаты предыдущих исследований и экспериментов, фиксировал проблемы в CJM и переводил их в гипотезы. Затем оценивал потенциальный вклад изменений и вместе с командой приоритизировал решения для чекаута.",
      },
      {
        title: "Первая итерация",
        text: "Новый чекаут сделал выбор способа оплаты понятнее: конверсия со второго экрана в оплату выросла на 13,3%. При этом первый экран работал хуже прежнего — переход к следующему шагу снизился на 10,8%. Общий эффект оказался смешанным, поэтому решение не стали масштабировать без изменений.",
      },
      {
        title: "Пересборка решения",
        text: "Мы приблизили первый экран к знакомой пользователям структуре: вернули явное отображение цен и скидок, уточнили названия CTA, добавили индикацию шагов и переработали описание тарифов. При этом сохранили удачные решения последующих экранов.",
      },
      {
        title: "Результат",
        text: "После перезапуска конверсия с первого экрана на второй выросла на 4,61%, а с финального шага в оплату — на 7,5%. На десктопе конверсия из посещения чекаута в оплату выросла на 16,4%. Общий прирост составил 9%, но ещё не достиг статистической значимости; успешную версию масштабировали на основные направления.",
      },
    ],
  },
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

function ProjectResult({ project, compact = false }: { project: (typeof projects)[number]; compact?: boolean }) {
  if (compact) return <p className="project-description">{project.highlight}</p>;

  return (
    <div className="case-highlight">
      <strong>{project.highlight}</strong>
    </div>
  );
}

function Project({ project }: { project: (typeof projects)[number] }) {
  const href = `/projects/${project.slug}`;
  const mockup = "mockup" in project ? project.mockup : "";
  const hasCover = Boolean(project.image);

  const meta = (
    <div className="project-meta">
      <span>{project.number}</span>
      <h2><InternalLink href={href}>{project.title}</InternalLink></h2>
      <div className="project-type-spacer" aria-hidden="true" />
      <ProjectResult project={project} compact />
    </div>
  );

  return (
    <article className="project" id={`project-${project.number}`}>
      {hasCover ? (
        <div className="project-card">
          {meta}
          <InternalLink className="project-cover" href={href} ariaLabel={`Открыть проект ${project.title}`}>
            {mockup ? (
              <div className="project-cover-grid">
                <div className="project-cover-tile project-cover-tile--editor">
                  <img src={project.image} alt={`Интерфейс проекта ${project.title}`} />
                </div>
                <div className="project-cover-tile project-cover-tile--mockup">
                  <img src={mockup} alt={`Интерфейс проекта ${project.title} на макбуке`} />
                </div>
              </div>
            ) : (
              <img src={project.image} alt={`Обложка проекта ${project.title}`} />
            )}
          </InternalLink>
        </div>
      ) : meta}
    </article>
  );
}

function HoverVideo({ src, className, ariaLabel }: { src: string; className: string; ariaLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const play = () => { if (videoRef.current) void videoRef.current.play(); };
  const stop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      onPointerEnter={play}
      onPointerLeave={stop}
      aria-label={ariaLabel}
    />
  );
}

function HomePage() {
  return (
    <main className="home-page">
      <section className="intro" aria-labelledby="intro-title">
        <h1 id="intro-title">Независимый продуктовый дизайнер. Помогаю командам находить ясность и создавать цифровые продукты с характером.</h1>
      </section>
      <section className="work" id="work" aria-label="Избранные проекты">
        {projects.map((project) => <Project project={project} key={project.number} />)}
      </section>
      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
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
  );
}

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(3, value + 0.25));
      if (event.key === "-") setZoom((value) => Math.max(1, value - 0.25));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Просмотр изображения: ${alt}`} onClick={onClose}>
      <div className="image-lightbox-controls" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.25))} disabled={zoom === 1} aria-label="Уменьшить">−</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => setZoom((value) => Math.min(3, value + 0.25))} disabled={zoom === 3} aria-label="Увеличить">+</button>
        <button type="button" onClick={onClose} aria-label="Закрыть просмотр">×</button>
      </div>
      <div className={`image-lightbox-stage${zoom > 1 ? " is-zoomed" : ""}`} onClick={(event) => event.stopPropagation()}>
        <img src={src} alt={alt} style={{ width: zoom > 1 ? `${zoom * 100}%` : undefined }} />
      </div>
    </div>
  );
}

function CasePage({ project }: { project: (typeof projects)[number] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const storedFrom = typeof window.history.state?.from === "string" ? window.history.state.from : "";
  const currentPath = `/projects/${project.slug}`;
  const backHref = storedFrom && storedFrom !== currentPath ? storedFrom : "/#work";
  const backSlug = backHref.match(/^\/projects\/([^/?#]+)/)?.[1];
  const backProject = projects.find((item) => item.slug === backSlug || ("legacySlugs" in item && item.legacySlugs?.includes(backSlug ?? "")));
  const backLabel = backProject?.title ?? "Главная";
  const caseSections = "caseSections" in project && project.caseSections ? project.caseSections : [
    { title: "Задача", text: "Описание проекта будет добавлено позже." },
    { title: "Подход", text: "Описание процесса будет добавлено позже." },
    { title: "Результат", text: "Результаты проекта будут добавлены позже." },
  ];

  return (
    <main className="case-page">
      <section className="case-hero">
        <div className="case-heading">
          <h1>{project.title}</h1>
          <ProjectResult project={project} />
        </div>
        <div className="case-summary" aria-label="Краткое описание проекта">
          <p>{project.description}</p>
        </div>
      </section>

      {"video" in project && project.video ? (
        <HoverVideo
          className="case-cover case-cover--editor"
          src={project.video}
          ariaLabel={`Видео проекта ${project.title}`}
        />
      ) : project.image && (
        <button className="case-cover-button" type="button" onClick={() => setLightboxOpen(true)} aria-label={`Увеличить обложку проекта ${project.title}`}>
          <img className={`case-cover${project.slug === "course-editor" ? " case-cover--editor" : ""}`} src={project.image} alt={`Обложка проекта ${project.title}`} />
        </button>
      )}

      <section className="case-content" aria-label="Описание кейса">
        {caseSections.map((section, sectionIndex) => (
          <div
            className={`case-section case-section--layout-${(sectionIndex % 3) + 1}`}
            id={`case-section-${sectionIndex + 1}`}
            key={section.title}
          >
            <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
            <div className="case-section-copy">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
            <div className="case-section-placeholder" role="img" aria-label={`Место для изображения раздела «${section.title}»`} />
          </div>
        ))}
      </section>

      <nav className="case-anchor-nav" aria-label="Разделы кейса">
        {caseSections.map((section, sectionIndex) => (
          <a href={`#case-section-${sectionIndex + 1}`} key={section.title}>{section.title}</a>
        ))}
      </nav>

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

      <SiteFooter />

      {lightboxOpen && project.image && (
        <ImageLightbox src={project.image} alt={`Обложка проекта ${project.title}`} onClose={() => setLightboxOpen(false)} />
      )}
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

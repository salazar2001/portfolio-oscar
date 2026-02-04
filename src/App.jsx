import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage || i18n.language
  const stats = t('hero.stats', { returnObjects: true })
  const focusList = t('hero.focusList', { returnObjects: true })
  const projects = t('projects.items', { returnObjects: true })
  const skills = t('skills.items', { returnObjects: true })

  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <span className="logo-mark">OS</span>
          <div className="nav-links">
            <a href="#projects">{t('nav.projects')}</a>
            <a href="#skills">{t('nav.skills')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </div>
          <div className="lang-toggle" role="group" aria-label="Language toggle">
            {[
              { key: 'en', label: 'EN' },
              { key: 'pt', label: 'PT' },
              { key: 'es', label: 'ES' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => i18n.changeLanguage(item.key)}
                className={currentLanguage === item.key ? 'active' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.headline')}</h1>
            <p className="subhead">{t('hero.subhead')}</p>
            <div className="cta-row">
              <a className="btn primary" href="#projects">
                {t('hero.ctaPrimary')}
              </a>
              <a className="btn ghost" href="#contact">
                {t('hero.ctaSecondary')}
              </a>
            </div>
            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-card">
            <h2>{t('hero.focusTitle')}</h2>
            <ul>
              {focusList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="status-pill">{t('hero.focusStatus')}</div>
          </div>
        </div>
      </header>

      <section id="projects" className="section projects">
        <div className="section-title">
          <p>{t('projects.title')}</p>
          <h2>{t('projects.subtitle')}</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.name} className="project-card">
              <div className="project-media">
                <img src={project.thumb} alt={`${project.name} preview`} />
                <a
                  className="project-play"
                  href={project.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('projects.watchDemo')}
                </a>
              </div>
              <div className="project-head">
                <h3>{project.name}</h3>
                <span className="project-impact">{project.impact}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <ul className="project-highlights">
                {project.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer">
                  {t('projects.links.github')}
                </a>
                <a href={project.youtube} target="_blank" rel="noreferrer">
                  {t('projects.links.youtube')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills">
        <div className="section-title">
          <p>{t('skills.title')}</p>
          <h2>{t('skills.subtitle')}</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.title} className="skill-card">
              <h3>{skill.title}</h3>
              <p>{skill.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-card">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.body')}</p>
          <div className="cta-row">
            <a className="btn primary" href="mailto:os67583@gmail.com">
              {t('contact.primary')}
            </a>
            <a className="btn ghost" href="https://www.linkedin.com/in/oscar-salazar-709865232/">
              {t('contact.secondary')}
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>{t('footer.left')}</span>
        <span>{t('footer.right')}</span>
      </footer>
    </div>
  )
}

export default App

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import './App.css'
import meImg from './assets/1670471219173.jpg'
import mobileAppThumb from './assets/active-system-photos.png'
import tcpThumb from './assets/TCP-Time-Management.png'

function App() {
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const currentLanguage = i18n.resolvedLanguage || i18n.language
  const stats = t('hero.stats', { returnObjects: true })
  const focusList = t('hero.focusList', { returnObjects: true })
  const projects = t('projects.items', { returnObjects: true })
  const skills = t('skills.items', { returnObjects: true })

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        setModalOpen(false)
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const openProject = (project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const getProjectThumb = (project) => {
    if (project.name.includes('Mobile App')) return mobileAppThumb
    if (project.name.includes('Coastal')) return tcpThumb
    return project.thumb
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedProject(null)
  }

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
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'light'}
            title={theme === 'dark' ? 'Activate light mode' : 'Activate dark mode'}
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="theme-icon">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13V2a6 6 0 1 1 0 12z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="theme-icon">
                <circle cx="8" cy="8" r="3" />
                <line x1="8" y1="1" x2="8" y2="2" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="14" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" />
                <line x1="1" y1="8" x2="2" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2.93" y1="2.93" x2="3.64" y2="3.64" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12.36" y1="12.36" x2="13.07" y2="13.07" stroke="currentColor" strokeWidth="1.5" />
                <line x1="13.07" y1="2.93" x2="12.36" y2="3.64" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3.64" y1="12.36" x2="2.93" y2="13.07" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
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
            <div className="hero-photo" aria-hidden={false}>
              <img src={meImg} alt={t('hero.photoAlt') || 'Oscar Salazar - Full Stack Developer'} />
            </div>
            <h2>{t('hero.focusTitle')}</h2>
            <ul>
              {focusList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
            <article key={project.name} className="project-card" onClick={() => openProject(project)}>
              <div className="project-media">
                <img
                  src={getProjectThumb(project)}
                  alt={`${project.name} preview`}
                  loading="lazy"
                />
              </div>
              <div className="project-head">
                <h3>{project.name}</h3>
                <span className="project-impact">{project.impact}</span>
              </div>
              <div className="project-tags">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <button className="project-more" type="button" onClick={() => openProject(project)}>
                {t('projects.seeMore', 'See more')}
              </button>
            </article>
          ))}
        </div>
      </section>

      {modalOpen && selectedProject && (
        <div className="modal-overlay" role="presentation" onClick={closeModal}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.name} details`} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close details">×</button>
            <div className="modal-content">
              <div className="modal-media">
                <img
                  src={getProjectThumb(selectedProject)}
                  alt={`${selectedProject.name} preview`}
                />
              </div>
              <div className="modal-body">
                <h3>{selectedProject.name}</h3>
                <p className="modal-impact">{selectedProject.impact}</p>
                <p>{selectedProject.description}</p>
                <p className="modal-summary">{selectedProject.summary}</p>
                <div className="modal-stack">
                  {selectedProject.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
                <h4 className="modal-section-title">{t('projects.highlightsTitle', 'Key takeaways')}</h4>
                <ul className="modal-highlights">
                  {selectedProject.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="skills" className="section skills">
        <div className="section-title">
          <p>{t('skills.title')}</p>
          <h2>{t('skills.subtitle')}</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.title} className="skill-card">
              <h3>{skill.title}</h3>
              <ul className="skill-list">
                {skill.body
                  .split('\n')
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => (
                    <li key={line}>{line.replace(/^•\s*/, '')}</li>
                  ))}
              </ul>
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

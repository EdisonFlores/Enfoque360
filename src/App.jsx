import { useEffect, useState } from 'react'
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, MessageCircle, Play, Sparkles, HeartPulse, Coins, Cross, Compass, Lightbulb } from 'lucide-react'

const courses = [
  { id: 'curso-01', number: '01', tone: '#376B50', dark: '#204635', title: 'Vida saludable', icon: HeartPulse, light: '#EDF4EE' },
  { id: 'curso-02', number: '02', tone: '#2F7D6D', dark: '#154F46', title: 'Finanzas', icon: Coins, light: '#EAF4F1' },
  { id: 'curso-03', number: '03', tone: '#634781', dark: '#3E2C55', title: 'Formación teológica', icon: Cross, light: '#F2EDF6' },
  { id: 'curso-04', number: '04', tone: '#284F80', dark: '#193555', title: 'Desarrollo personal', icon: Compass, light: '#ECF1F7' },
  { id: 'curso-05', number: '05', tone: '#98691E', dark: '#604414', title: 'Creatividad', icon: Lightbulb, light: '#FAF2E4' },
]

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'
const shortLorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
const assetUrl = (file) => `${import.meta.env.BASE_URL}${file}`

function Logo() {
  return <Link to="/" className="logo-link brand-wordmark" aria-label="Enfoque 360"><span className="brand-ring" aria-hidden="true">360</span><span>ENFOQUE<span className="brand-sub">360</span></span></Link>
}

function Header() {
  return (
    <header id="top" className="site-header">
      <div className="container-wide header-inner">
        <Logo />
        <nav aria-label="Navegación principal">
          <Link to="/">Inicio</Link>
          <a href={`${import.meta.env.BASE_URL}#cursos`}>Cursos</a>
          <a href={`${import.meta.env.BASE_URL}#autores`}>Autores</a>
          <a className="nav-cta" href={`${import.meta.env.BASE_URL}#cursos`}>Explorar cursos</a>
        </nav>
      </div>
    </header>
  )
}

function VideoFrame({ compact = false }) {
  return (
    <div className={`video-frame ${compact ? 'compact' : ''}`}>
      <div className="video-corner"><Play size={16} fill="currentColor" /> Video de presentación</div>
      <iframe
        src="https://www.youtube.com/embed/LDRhgbtNXe4?rel=0"
        title="Video de presentación"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

function BookCover({ course, small = false }) {
  const Icon = course.icon
  return (
    <div className={`book-wrap ${small ? 'small' : ''}`} style={{ '--tone': course.tone, '--dark': course.dark, '--book-image': `url("${assetUrl('libro-base.jpg')}")` }}>
      <div className="book-spine" />
      <div className="book-cover">
        <div className="cover-no">{course.number}<Icon aria-hidden="true" /></div>
        <div className="cover-kicker">ENFOQUE 360</div>
        <div className="cover-title">{course.title}</div>
        <div className="cover-line" />
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="book-pages" />
    </div>
  )
}

function CourseCarousel() {
  const [active, setActive] = useState(0)
  const move = (step) => setActive((prev) => (prev + step + courses.length) % courses.length)

  return (
    <div className="showcase-shell">
      <div className="identity-picker" aria-label="Seleccionar curso">
        {courses.map((course, index) => {
          const Icon = course.icon
          return <button key={course.id} className={active === index ? 'selected' : ''} aria-pressed={active === index} onClick={() => setActive(index)} style={{ '--course-tone': course.tone, '--course-light': course.light }}><Icon aria-hidden="true" /><span>{course.title}</span><ArrowRight size={16} aria-hidden="true" /></button>
        })}
      </div>
      <div className="carousel-viewport">
      <button className="carousel-arrow left" onClick={() => move(-1)} aria-label="Curso anterior"><ChevronLeft /></button>
      <div className="course-stage" aria-live="polite">
        {courses.map((course, index) => {
          let offset = index - active
          if (offset > 2) offset -= courses.length
          if (offset < -2) offset += courses.length
          return (
            <article
              key={course.id}
              className={`course-card ${offset === 0 ? 'active' : ''}`}
              data-distance={Math.abs(offset)}
              style={{ '--offset': offset, '--abs': Math.abs(offset), '--course-tone': course.tone, '--course-light': course.light, zIndex: 10 - Math.abs(offset) }}
              onClick={() => setActive(index)}
            >
              <BookCover course={course} />
              <div className="course-copy">
                <span className="course-label">Programa {course.number}</span>
                <h3>{course.title}</h3>
                <p>{shortLorem}</p>
                <div className="card-actions">
                  <Link to={`/curso/${course.id}#comenzar`} className="btn-primary-360">Comenzar</Link>
                  <Link to={`/curso/${course.id}`} className="btn-ghost-360">Más información <ArrowRight size={15} /></Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <button className="carousel-arrow right" onClick={() => move(1)} aria-label="Curso siguiente"><ChevronRight /></button>
      </div>
      <div className="carousel-dots">
        {courses.map((course, index) => <button key={course.id} aria-label={`Mostrar ${course.title}`} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}
      </div>
    </div>
  )
}

function Authors() {
  const authors = [
    { initials: 'A1', role: 'Autor 01', color: '#123B4A' },
    { initials: 'A2', role: 'Autor 02', color: '#2F7D6D' },
    { initials: 'A3', role: 'Autor 03', color: '#98691E' },
  ]
  return (
    <section id="autores" className="authors-section">
      <div className="container-wide">
        <div className="section-heading light">
          <span>Equipo académico</span>
          <h2>Conoce a los autores</h2>
          <p>{shortLorem}</p>
        </div>
        <div className="authors-grid">
          {authors.map((author) => (
            <article className="author-card" key={author.role}>
              <div className="avatar" style={{ '--avatar': author.color }}><span>{author.initials}</span><Sparkles size={23} /></div>
              <div>
                <span className="eyebrow">Formación</span>
                <h3>{author.role}</h3>
                <p>{lorem}</p>
                <div className="socials">
                  <a href="#linkedin" aria-label="LinkedIn"><span>in</span></a>
                  <a href="#facebook" aria-label="Facebook"><span>f</span></a>
                  <a href="#instagram" aria-label="Instagram"><span>ig</span></a>
                  <a href="#whatsapp" aria-label="WhatsApp"><MessageCircle /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-orb one" /><div className="hero-orb two" />
          <div className="container-wide hero-grid">
            <div className="hero-copy">
              <span className="overline"><span /> Educación sin límites</span>
              <h1>Aprende.<br />Crece.<br /><em>Transforma tu vida.</em></h1>
              <p>{lorem}</p>
              <div className="hero-actions">
                <a className="btn-primary-360" href="#cursos">Explorar cursos <ArrowRight size={18} /></a>
                <a className="text-link" href="#autores">Conocer autores</a>
              </div>
              <div className="trust-line"><span><Check /> 5 cursos</span><span><Check /> Acceso flexible</span><span><Check /> Enfoque práctico</span></div>
            </div>
            <VideoFrame />
          </div>
        </section>

        <section className="intro-strip">
          <div className="container-wide intro-grid">
            <span className="index">01</span>
            <h2>Aprende desde una mirada integral</h2>
            <p>{lorem}</p>
          </div>
        </section>

        <section id="cursos" className="courses-section">
          <div className="container-wide">
            <div className="section-heading">
              <span>Nuestros programas</span>
              <h2>¿Qué quieres aprender?</h2>
              <p>{shortLorem}</p>
            </div>
            <CourseCarousel />
          </div>
        </section>

        <section className="method-section">
          <div className="container-wide method-grid">
            <div className="method-title"><span>02</span><h2>Una experiencia diseñada para avanzar</h2></div>
            <div className="method-list">
              {['Explora', 'Aprende', 'Practica', 'Transforma'].map((item, index) => (
                <article key={item}><span>0{index + 1}</span><div><h3>{item}</h3><p>{shortLorem}</p></div></article>
              ))}
            </div>
          </div>
        </section>
        <Authors />
      </main>
      <Footer />
    </>
  )
}

function CourseDetail() {
  const { id } = useParams()
  const course = courses.find((item) => item.id === id) || courses[0]
  useEffect(() => {
    document.title = `${course.title} · Enfoque 360`
  }, [course.title])
  const modules = ['Fundamentos', 'Perspectiva', 'Herramientas', 'Aplicación', 'Proyecto final']
  return (
    <>
      <Header />
      <main className="detail-page" style={{ '--course-tone': course.tone, '--course-light': course.light }}>
        <section className="detail-hero" style={{ '--tone': course.tone }}>
          <div className="container-wide detail-grid">
            <div className="detail-cover"><BookCover course={course} /></div>
            <div className="detail-copy">
              <Link to="/#cursos" className="back-link"><ArrowLeft size={16} /> Volver a cursos</Link>
              <span className="overline"><span /> Programa {course.number}</span>
              <h1>{course.title}</h1>
              <p>{lorem}</p>
              <div className="hero-actions"><a href="#comenzar" className="btn-primary-360">Comenzar</a><a href="#temario" className="btn-ghost-360">Ver temario</a></div>
            </div>
          </div>
        </section>
        <section className="detail-video"><div className="container-narrow"><div className="section-heading"><span>Presentación</span><h2>Conoce el programa</h2></div><VideoFrame compact /></div></section>
        <section id="temario" className="syllabus-section">
          <div className="container-narrow syllabus-grid">
            <div className="syllabus-intro"><span>Temario del curso</span><h2>Tu recorrido de aprendizaje</h2><p>{lorem}</p><div className="syllabus-note"><BookOpen /><p>{shortLorem}</p></div></div>
            <div className="module-list">
              {modules.map((module, index) => <article key={module}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{module}</h3><p>{shortLorem}</p></div><ArrowRight /></article>)}
            </div>
          </div>
        </section>
        <section id="comenzar" className="cta-band"><div><span>Enfoque 360</span><h2>Comienza tu próximo paso</h2><p>{shortLorem}</p><a href="#inicio" className="btn-light-360">Iniciar ahora <ArrowRight /></a></div></section>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return <footer><div className="container-wide"><Logo /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><a href="#top">Volver arriba <ArrowRight size={15} /></a></div></footer>
}

export default function App() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (pathname === '/') document.title = 'Enfoque 360 · Cursos'
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView()
      } else {
        window.scrollTo(0, 0)
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return <Routes><Route path="/" element={<Home />} /><Route path="/curso/:id" element={<CourseDetail />} /><Route path="*" element={<Home />} /></Routes>
}

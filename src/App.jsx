import { useEffect, useState } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, MessageCircle, Play, Sparkles } from 'lucide-react'

const courses = [
  { id: 'curso-01', number: '01', tone: '#85aa3c', dark: '#173b67', title: 'Curso 01' },
  { id: 'curso-02', number: '02', tone: '#f2b53d', dark: '#2f3d51', title: 'Curso 02' },
  { id: 'curso-03', number: '03', tone: '#ef765e', dark: '#233f62', title: 'Curso 03' },
  { id: 'curso-04', number: '04', tone: '#55a9a4', dark: '#193d59', title: 'Curso 04' },
  { id: 'curso-05', number: '05', tone: '#9d72c5', dark: '#263957', title: 'Curso 05' },
]

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'
const shortLorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'

function Logo() {
  return <Link to="/" className="logo-link" aria-label="Enfoque 360"><img src="/logo-enfoque360.png" alt="Enfoque 360" /></Link>
}

function Header() {
  return (
    <header className="site-header">
      <div className="container-wide header-inner">
        <Logo />
        <nav aria-label="Navegación principal">
          <a href="/#cursos">Cursos</a>
          <a href="/#autores">Autores</a>
          <a className="nav-cta" href="/#cursos">Ver cursos</a>
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
  return (
    <div className={`book-wrap ${small ? 'small' : ''}`} style={{ '--tone': course.tone, '--dark': course.dark }}>
      <div className="book-spine" />
      <div className="book-cover">
        <div className="cover-no">{course.number}</div>
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
  const [active, setActive] = useState(2)
  const move = (step) => setActive((prev) => (prev + step + courses.length) % courses.length)

  return (
    <div className="showcase-shell">
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
              style={{ '--offset': offset, '--abs': Math.abs(offset), zIndex: 10 - Math.abs(offset) }}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              <BookCover course={course} />
              <div className="course-copy">
                <span className="course-label">Programa {course.number}</span>
                <h3>{course.title}</h3>
                <p>{shortLorem}</p>
                <div className="card-actions">
                  <a href="#comenzar" className="btn-primary-360">Comenzar</a>
                  <Link to={`/curso/${course.id}`} className="btn-ghost-360">Más información <ArrowRight size={15} /></Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      <button className="carousel-arrow right" onClick={() => move(1)} aria-label="Curso siguiente"><ChevronRight /></button>
      <div className="carousel-dots">
        {courses.map((course, index) => <button key={course.id} aria-label={`Mostrar ${course.title}`} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}
      </div>
    </div>
  )
}

function Authors() {
  const authors = [
    { initials: 'A1', role: 'Autor 01', color: '#173b67' },
    { initials: 'A2', role: 'Autor 02', color: '#85aa3c' },
    { initials: 'A3', role: 'Autor 03', color: '#f2b53d' },
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
              <h1>Programas que amplían tu <em>enfoque.</em></h1>
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
              <h2>Elige tu próximo curso</h2>
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
    window.scrollTo(0, 0)
  }, [id])
  const modules = ['Fundamentos', 'Perspectiva', 'Herramientas', 'Aplicación', 'Proyecto final']
  return (
    <>
      <Header />
      <main className="detail-page">
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
  return <Routes><Route path="/" element={<Home />} /><Route path="/curso/:id" element={<CourseDetail />} /><Route path="*" element={<Home />} /></Routes>
}

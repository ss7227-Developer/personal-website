import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import BlogSection from '../components/BlogSection'
import Resume from '../components/Resume'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <BlogSection />
        <Resume />
      </main>
      <Contact />
    </>
  )
}

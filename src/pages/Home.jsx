import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
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
        <Projects />
        <BlogSection />
        <Resume />
      </main>
      <Contact />
    </>
  )
}

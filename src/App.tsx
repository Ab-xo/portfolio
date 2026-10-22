import { useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { useLenis } from './hooks/useLenis'
import { Cursor } from './components/ui/Cursor'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Preloader } from './components/sections/Preloader'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { SelectedWork } from './components/sections/SelectedWork'
import { FeaturedCase } from './components/sections/FeaturedCase'
import { Capabilities } from './components/sections/Capabilities'
import { Experience } from './components/sections/Experience'
import { AiEngineering } from './components/sections/AiEngineering'
import { Experiments } from './components/sections/Experiments'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

export function App() {
  const [ready, setReady] = useState(false)

  useLenis()

  // Once the preloader clears and the hero enters, layout may have shifted
  // (fonts, images) — refresh ScrollTrigger so pins/scrubs measure correctly.
  useEffect(() => {
    if (!ready) return
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => window.clearTimeout(t)
  }, [ready])

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <div className="film-grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <ScrollProgress />
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      <Nav />

      <main id="main">
        <Hero ready={ready} />
        <Intro />
        <SelectedWork />
        <FeaturedCase />
        <Capabilities />
        <Experience />
        <AiEngineering />
        <Experiments />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

import { MotionConfig } from 'motion/react'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WavesBackground } from './components/features/WavesBackground'
import { SmoothScroll } from './components/motion/SmoothScroll'
import { ScrollProgress } from './components/motion/ScrollProgress'
import { Marquee } from './components/motion/Marquee'
import { ScrollStatement } from './components/motion/ScrollStatement'
import { BackToTop } from './components/motion/BackToTop'
import { IntroProvider } from './components/motion/IntroLoader'
import { Hero } from './components/sections/Hero'
import { Method } from './components/sections/Method'
import { Results } from './components/sections/Results'
import { Expert } from './components/sections/Expert'
import { Team } from './components/sections/Team'
import { Gallery } from './components/sections/Gallery'
import { Courses } from './components/sections/Courses'
import { Contact } from './components/sections/Contact'
import { Faq } from './components/sections/Faq'
import { transitions } from './data/content'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    // reducedMotion="user": quem pede menos movimento no sistema vê os elementos sem animação de entrada
    <MotionConfig reducedMotion="user">
      <IntroProvider>
      <SmoothScroll />
      <ScrollProgress />
      <WavesBackground />
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Marquee items={transitions.marqueeTop} />
        <Method />
        <Results />
        <ScrollStatement eyebrow={transitions.statement.eyebrow} text={transitions.statement.text} />
        <Expert />
        <Gallery />
        <Team />
        <Faq />
        <Courses />
        <Marquee items={transitions.marqueeBottom} baseVelocity={1.8} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      </IntroProvider>
    </MotionConfig>
  )
}

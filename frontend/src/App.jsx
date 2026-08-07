import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Estatisticas from './components/Estatisticas'
import FormAnuncio from './components/FormAnuncio'
import Vitrine from './components/Vitrine'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [vitrineKey, setVitrineKey] = useState(0)

  function handleAnuncioCriado() {
    setVitrineKey((chave) => chave + 1)
  }

  return (
    <>
      <Header />
      <Hero />
      <Sobre />
      <Estatisticas />
      <FormAnuncio onAnuncioCriado={handleAnuncioCriado} />
      <Vitrine key={vitrineKey} />
      <Footer />
    </>
  )
}

export default App
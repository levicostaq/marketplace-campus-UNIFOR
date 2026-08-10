import { useState, useEffect } from "react"
import AnuncioCard from "./AnuncioCard"
import { obterDispositivoId } from "../utils/dispositivo"

const categorias = ["Todos", "Livros", "Eletrônicos", "Engenharia", "Computação", "Outros"]

function Vitrine() {
  const [anuncios, setAnuncios] = useState([])
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")
  const [somenteMeus, setSomenteMeus] = useState(false)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const parametros = new URLSearchParams()
    if (categoriaAtiva !== "Todos") {
      parametros.set("categoria", categoriaAtiva)
    }
    if (somenteMeus) {
      parametros.set("dispositivo_id", obterDispositivoId())
    }

    const query = parametros.toString()
    const url = `http://127.0.0.1:8000/anuncios${query ? "?" + query : ""}`

    setCarregando(true)
    fetch(url)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setAnuncios(dados)
        setCarregando(false)
      })
      .catch((erro) => {
        console.error("Erro ao buscar anúncios:", erro)
        setCarregando(false)
      })
  }, [categoriaAtiva, somenteMeus])

  return (
    <section id="vitrine" className="vitrine">
      <h2>Últimos itens anunciados</h2>

      <div className="filtros">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={
              categoria === categoriaAtiva ? "filtro-btn filtro-ativo" : "filtro-btn"
            }
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </button>
        ))}

        <button
          type="button"
          className={somenteMeus ? "filtro-btn filtro-ativo" : "filtro-btn"}
          onClick={() => setSomenteMeus((valor) => !valor)}
        >
          {somenteMeus ? "✓ Meus anúncios" : "Meus anúncios"}
        </button>
      </div>

      {carregando && <p>Carregando anúncios...</p>}

      {!carregando && anuncios.length === 0 && (
        <p className="vitrine-vazia">
          {somenteMeus ? "Você ainda não publicou nenhum anúncio." : "Nenhum item nessa categoria ainda."}
        </p>
      )}

      <div className="grid-anuncios">
        {anuncios.map((anuncio) => (
          <AnuncioCard key={anuncio.id} anuncio={anuncio} />
        ))}
      </div>
    </section>
  )
}

export default Vitrine
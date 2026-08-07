import { useState, useEffect } from "react"
import AnuncioCard from "./AnuncioCard"

const categorias = ["Todos", "Livros", "Eletrônicos", "Engenharia", "Computação", "Outros"]

function Vitrine() {
  const [anuncios, setAnuncios] = useState([])
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const url =
      categoriaAtiva === "Todos"
        ? "http://127.0.0.1:8000/anuncios"
        : `http://127.0.0.1:8000/anuncios?categoria=${categoriaAtiva}`

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
  }, [categoriaAtiva])

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
      </div>

      {carregando && <p>Carregando anúncios...</p>}

      {!carregando && anuncios.length === 0 && (
        <p className="vitrine-vazia">Nenhum item nessa categoria ainda.</p>
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
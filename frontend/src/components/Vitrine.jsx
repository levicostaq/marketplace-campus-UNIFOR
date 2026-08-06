import { useState } from "react"
import { mockAnuncios } from "../data/mockAnuncios"
import AnuncioCard from "./AnuncioCard"

const categorias = ["Todos", "Livros", "Eletrônicos", "Engenharia", "Computação", "Outros"]

function Vitrine() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")

  const anunciosFiltrados =
    categoriaAtiva === "Todos"
      ? mockAnuncios
      : mockAnuncios.filter((anuncio) => anuncio.categoria === categoriaAtiva)

  return (
    <section id="vitrine" className="vitrine">
      <h2>Últimos itens anunciados</h2>

      <div className="filtros">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={
              categoria === categoriaAtiva
                ? "filtro-btn filtro-ativo"
                : "filtro-btn"
            }
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="grid-anuncios">
        {anunciosFiltrados.map((anuncio) => (
          <AnuncioCard key={anuncio.id} anuncio={anuncio} />
        ))}
      </div>
    </section>
  )
}

export default Vitrine
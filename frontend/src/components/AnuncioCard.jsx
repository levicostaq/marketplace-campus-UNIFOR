function AnuncioCard({ anuncio }) {
  return (
    <div className="anuncio-card">
      <img
        src={anuncio.imagem_url}
        alt={anuncio.titulo}
        className="anuncio-imagem"
      />
      <div className="anuncio-info">
        <span className="anuncio-categoria">{anuncio.categoria}</span>
        <h3>{anuncio.titulo}</h3>
        <p className="anuncio-preco">
          {anuncio.doacao ? "Doação" : `R$ ${anuncio.preco.toFixed(2)}`}
        </p>
      </div>
    </div>
  )
}

export default AnuncioCard
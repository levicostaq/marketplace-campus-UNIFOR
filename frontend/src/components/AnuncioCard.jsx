function AnuncioCard({ anuncio }) {
  const imagemPadrao = "https://placehold.co/300x200/2e7d32/white?text=Sem+imagem"
  const imagemSrc = anuncio.imagem_url || imagemPadrao

  function handleImagemErro(evento) {
    evento.target.src = imagemPadrao
  }

  return (
    <div className="anuncio-card">
      <img
        src={imagemSrc}
        alt={anuncio.titulo}
        className="anuncio-imagem"
        onError={handleImagemErro}
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
const estatisticas = [
  { numero: "128", legenda: "itens anunciados" },
  { numero: "54", legenda: "trocas concluídas" },
  { numero: "3,2 ton", legenda: "de material que não virou lixo" },
]

function Estatisticas() {
  return (
    <section className="estatisticas">
      {estatisticas.map((item) => (
        <div key={item.legenda} className="estatistica-item">
          <strong>{item.numero}</strong>
          <span>{item.legenda}</span>
        </div>
      ))}
    </section>
  )
}

export default Estatisticas
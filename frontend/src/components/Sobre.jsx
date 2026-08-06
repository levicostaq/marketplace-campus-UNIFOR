const comoFunciona = [
  {
    titulo: "Anuncie",
    texto: "Não usa mais aquele livro, jaleco ou calculadora? Cadastre em minutos.",
  },
  {
    titulo: "Encontre",
    texto: "Precisa de material pro semestre? Filtre por categoria e ache rapidinho.",
  },
  {
    titulo: "Troque ou doe",
    texto: "Combine a entrega direto com o outro estudante pelo contato do anúncio.",
  },
]

function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <h2>Economia circular dentro do campus</h2>
      <p>
        A cada semestre, muita coisa boa vira lixo ou fica esquecida numa
        gaveta. O EcoCampus existe para colocar esses itens de volta em
        circulação entre os próprios estudantes, reduzindo desperdício e o
        custo de começar a faculdade.
      </p>

      <div className="como-funciona">
        {comoFunciona.map((passo) => (
          <div key={passo.titulo} className="passo">
            <h3>{passo.titulo}</h3>
            <p>{passo.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sobre
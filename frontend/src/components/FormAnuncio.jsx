import { useState } from "react"
import { obterDispositivoId } from "../utils/dispositivo"
import { API_URL } from "../api";

const categorias = ["Livros", "Eletrônicos", "Engenharia", "Computação", "Outros"]

const valoresIniciais = {
  titulo: "",
  descricao: "",
  categoria: categorias[0],
  preco: "",
  doacao: false,
  imagem_url: "",
}

function FormAnuncio({ onAnuncioCriado }) {
  const [form, setForm] = useState(valoresIniciais)
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  function handleChange(evento) {
    const { name, value, type, checked } = evento.target
    setForm((formAtual) => ({
      ...formAtual,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    setEnviando(true)
    setMensagem(null)

    fetch("http://127.0.0.1:8000/anuncios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        preco: form.doacao ? null : Number(form.preco),
        dispositivo_id: obterDispositivoId(),
      }),
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao criar anúncio")
        }
        return resposta.json()
      })
      .then(() => {
        setMensagem("Anúncio publicado com sucesso!")
        setForm(valoresIniciais)
        setEnviando(false)
        onAnuncioCriado()
      })
      .catch(() => {
        setMensagem("Não foi possível publicar. Tente novamente.")
        setEnviando(false)
      })
  }

  return (
    <section id="anunciar" className="anunciar">
      <h2>Anuncie um item</h2>
      <form className="form-anuncio" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows={3}
          />
        </label>

        <label>
          Categoria
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="doacao"
            checked={form.doacao}
            onChange={handleChange}
          />
          É doação (sem custo)
        </label>

        {!form.doacao && (
          <label>
            Preço (R$)
            <input
              type="number"
              name="preco"
              value={form.preco}
              onChange={handleChange}
              min="0"
              step="0.01"
              required={!form.doacao}
            />
          </label>
        )}

        <label>
          URL da imagem (opcional)
          <input
            type="text"
            name="imagem_url"
            value={form.imagem_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <button type="submit" className="btn btn-primario" disabled={enviando}>
          {enviando ? "Publicando..." : "Publicar anúncio"}
        </button>

        {mensagem && <p className="form-mensagem">{mensagem}</p>}
      </form>
    </section>
  )
}

export default FormAnuncio

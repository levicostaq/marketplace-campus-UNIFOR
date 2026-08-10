export function obterDispositivoId() {
  let id = localStorage.getItem("ecocampus_dispositivo_id")

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem("ecocampus_dispositivo_id", id)
  }

  return id
}
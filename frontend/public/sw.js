const CACHE_NAME = "ecocampus-cache-v1"
const ARQUIVOS_ESSENCIAIS = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"]

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_ESSENCIAIS))
  )
})


self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((nome) => nome !== CACHE_NAME).map((nome) => caches.delete(nome)))
    )
  )
})


self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") {
    return
  }

  evento.respondWith(
    fetch(evento.request)
      .then((resposta) => {
        const respostaClone = resposta.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(evento.request, respostaClone))
        return resposta
      })
      .catch(() => caches.match(evento.request))
  )
})
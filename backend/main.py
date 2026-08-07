from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlite3

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Conexão com o banco ---
def get_db():
    conn = sqlite3.connect("marketplace.db")
    conn.row_factory = sqlite3.Row  # permite acessar colunas pelo nome
    return conn

# Cria a tabela se ela ainda não existir (roda uma vez, ao iniciar o servidor)
@app.on_event("startup")
def startup():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS anuncios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            categoria TEXT NOT NULL,
            preco REAL,
            doacao BOOLEAN NOT NULL DEFAULT 0,
            imagem_url TEXT
        )
    """)
    conn.commit()
    conn.close()

# --- Formato dos dados que a API espera receber ---
class AnuncioCreate(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    categoria: str
    preco: Optional[float] = None
    doacao: bool = False
    imagem_url: Optional[str] = None


@app.get("/")
def home():
    return {"mensagem": "API do Marketplace de Economia Circular no ar!"}


# --- Endpoints de anúncios (CRUD) ---

@app.post("/anuncios")
def criar_anuncio(anuncio: AnuncioCreate):
    conn = get_db()
    cursor = conn.execute(
        "INSERT INTO anuncios (titulo, descricao, categoria, preco, doacao, imagem_url) VALUES (?, ?, ?, ?, ?, ?)",
        (anuncio.titulo, anuncio.descricao, anuncio.categoria, anuncio.preco, anuncio.doacao, anuncio.imagem_url)
    )
    conn.commit()
    novo_id = cursor.lastrowid
    conn.close()
    return {"id": novo_id, **anuncio.dict()}


@app.get("/anuncios")
def listar_anuncios(categoria: Optional[str] = None):
    conn = get_db()
    if categoria:
        rows = conn.execute("SELECT * FROM anuncios WHERE categoria = ?", (categoria,)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM anuncios").fetchall()
    conn.close()
    return [dict(row) for row in rows]


@app.delete("/anuncios/{anuncio_id}")
def deletar_anuncio(anuncio_id: int):
    conn = get_db()
    cursor = conn.execute("DELETE FROM anuncios WHERE id = ?", (anuncio_id,))
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Anúncio não encontrado")
    return {"mensagem": "Anúncio removido com sucesso"}

@app.put("/anuncios/{anuncio_id}")
def atualizar_anuncio(anuncio_id: int, anuncio: AnuncioCreate):
    conn = get_db()
    cursor = conn.execute(
        """UPDATE anuncios
           SET titulo = ?, descricao = ?, categoria = ?, preco = ?, doacao = ?, imagem_url = ?
           WHERE id = ?""",
        (anuncio.titulo, anuncio.descricao, anuncio.categoria, anuncio.preco, anuncio.doacao, anuncio.imagem_url, anuncio_id)
    )
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Anúncio não encontrado")
    return {"id": anuncio_id, **anuncio.dict()}
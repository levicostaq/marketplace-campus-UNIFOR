import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c


def test_home_responde(client):
    resposta = client.get("/")
    assert resposta.status_code == 200
    assert "mensagem" in resposta.json()


def test_listar_anuncios_retorna_lista(client):
    resposta = client.get("/anuncios")
    assert resposta.status_code == 200
    assert isinstance(resposta.json(), list)


def test_criar_anuncio(client):
    novo = {
        "titulo": "Calculadora HP 12C",
        "descricao": "Usada, funcionando",
        "categoria": "Computação",
        "preco": 150.0,
        "doacao": False,
    }
    resposta = client.post("/anuncios", json=novo)
    assert resposta.status_code == 200
    dados = resposta.json()
    assert dados["titulo"] == "Calculadora HP 12C"
    assert "id" in dados


def test_deletar_anuncio_inexistente_retorna_404(client):
    resposta = client.delete("/anuncios/999999")
    assert resposta.status_code == 404


def test_filtrar_por_categoria(client):
    client.post("/anuncios", json={"titulo": "Jaleco M", "categoria": "Saúde"})
    resposta = client.get("/anuncios?categoria=Saúde")
    assert resposta.status_code == 200
    assert all(a["categoria"] == "Saúde" for a in resposta.json())

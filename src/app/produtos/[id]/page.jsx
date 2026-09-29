"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProdutoDetalhes() {
  const params = useParams();

  const [produto, setProduto] = useState(null);
  const [msgErro, setMsgErro] = useState("");

  useEffect(() => {
    if (!params.id) return;

    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Produto não encontrado");
        }

        return res.json();

      })
      .then((data) => {
        setProduto(data);
        setMsgErro("");
      })
      .catch((error) => {
        setMsgErro(error.message);
      });
  }, [params.id]);

  if (msgErro !== "") {
    return (
      <main className="details-page">
        <h1 className="details-title">Erro</h1>
        <p className="error-message">{msgErro}</p>
      </main>
    );
  }

  if (produto === null) {
    return (
      <main className="details-page">
        <p className="loading-state">Carregando produto...</p>
      </main>
    );
  }

  return (
    <main className="details-page">
      <div className="details-card">

        <div className="details-media">
          <img
            src={produto.thumbnail}
            alt={produto.title}
          />
        </div>

        <div className="details-info">

          <h1>{produto.title}</h1>

          <p>
            <strong>ID:</strong> {produto.id}
          </p>

          <p>
            <strong>Descrição:</strong> {produto.description}
          </p>

          <p>
            <strong>Categoria:</strong> {produto.category}
          </p>

          <p>
            <strong>Preço:</strong> ${produto.price}
          </p>

          <p>
            <strong>Desconto:</strong>{" "}
            {produto.discountPercentage}%
          </p>

          <p>
            <strong>Avaliação:</strong> {produto.rating}
          </p>

          <p>
            <strong>Estoque:</strong> {produto.stock}
          </p>

          <p>
            <strong>Marca:</strong> {produto.brand}
          </p>

          <p>
            <strong>SKU:</strong> {produto.sku}
          </p>

          <p>
            <strong>Status:</strong> {produto.availabilityStatus}
          </p>

        </div>

      </div>

      <a
        className="back-button"
        href="/produtos"
      >
        Voltar para produtos
      </a>
    </main>
  );
}
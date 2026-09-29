"use client";

import { useEffect, useState } from "react";
import CardProduto from "@/components/CardProdutos";

export default function Produtos() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [msgErro, setMsgErro] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar os produtos");
        }

        return res.json();
      })
      .then((data) => {
        setListaProdutos(data.products);
        setMsgErro("");
      })
      .catch((error) => {
        setMsgErro(error.message);
      });
  }, []);

  return (
    <main className="pagina-produtos">
      <h1>Produtos</h1>

      {msgErro !== "" && <p>ERRO: {msgErro}</p>}

      {listaProdutos.length > 0 ? (
        <div className="container-produtos">
          {listaProdutos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
            />
          ))}
        </div>
      ) : (
        <p className="carregando">Carregando produtos...</p>
      )}
    </main>
  );
}
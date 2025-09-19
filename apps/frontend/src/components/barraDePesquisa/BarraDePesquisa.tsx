"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";

interface BarraDePesquisaProps {
  valorFiltro: string; // The type of the filter value
  setValorFiltro: (value: string) => void; // A function that updates the filter value
}

export default function BarraDePesquisa({
  valorFiltro,
  setValorFiltro,
}: BarraDePesquisaProps) {
  const valorDaBusca = valorFiltro;
  const setValorDaBusca = setValorFiltro;

  return (
    <section className="flex justify-center relative bottom-10">
      <div className="items-center bg-fundo rounded-2xl shadow-[_1px_10px_12px_-10px_black] flex h-16 justify-between py-0 px-4 w-1/2">
        <input
          className="bg-transparent border-none outline-none w-full h-full text-[1rem] placeholder:text-[1rem]"
          onChange={(e) => setValorDaBusca(e.target.value)}
          value={valorDaBusca}
          placeholder="Digite o modelo ou marca do veiculo que você procura..."
        />
        <button type="submit" data-botao-pesquisa className="">
          <FaMagnifyingGlass className="text-cinza hover:text-white transition-all ease-in-out " />
        </button>
      </div>
    </section>
  );
}

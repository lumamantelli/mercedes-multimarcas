"use client";

import Image from "next/image";
import logo from "../../../public/imagens/banner-imagem.jpg";
import { Maquina } from "@/types/auth";

export default function CardCarro({ maquina }: { maquina: Maquina }) {
  return (
    <div className="bg-fundo rounded-2xl w-3xs shadow-lg">
      <div className="shadow-[_10px_10px_200px_rgba(0,0,0,0.1)]">
        <Image
          width={250}
          height={250}
          src={logo}
          className="rounded-2xl w-full"
          alt="Hilux SRX Limited"
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <h1 className="font-bold text-vermelho">{maquina.modelo}</h1>
        <div className="flex flex-col gap-0">
          <p className="font-light">{maquina.marca}</p>
          <p className="font-light">{maquina.ano}</p>
          <p className="font-light">{maquina.quilometragem}</p>
        </div>
        <div>
          <h2 className="font-bold">R${maquina.preco}</h2>
        </div>
      </div>
    </div>
  );
}

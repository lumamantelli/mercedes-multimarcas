"use client";

import Image from "next/image";
import logo from "../../../public/imagens/banner-imagem.jpg";
import { Moto } from "@/types/auth";

export default function CardCarro({ moto }: { moto: Moto }) {
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
        <h1 className="font-bold text-vermelho">{moto.modelo}</h1>
        <div className="flex flex-col gap-0">
          <p className="font-light">{moto.marca}</p>
          <p className="font-light">{moto.ano}</p>
          <p className="font-light">{moto.quilometragem}</p>
        </div>
        <div>
          <h2 className="font-bold">R${moto.preco}</h2>
        </div>
      </div>
    </div>
  );
}

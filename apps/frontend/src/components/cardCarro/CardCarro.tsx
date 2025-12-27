"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Veiculo } from "@/types/auth";

export default function CardVeiculo({ veiculo }:{ veiculo: Veiculo }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
  });

  return (
    <div className="bg-fundo rounded-2xl w-3xs shadow-lg">
      <div className="shadow-[_10px_10px_200px_rgba(0,0,0,0.1)]">
        <div
          ref={sliderRef}
          className="keen-slider rounded-2xl overflow-hidden"
        >
          {veiculo?.images?.map((src, index) => (
            <div key={index} className="keen-slider__slide">
              <Image
                src={src}
                alt={`Imagem ${index + 1} de ${veiculo.modelo}`}
                width={250}
                height={250}
                className="w-full h-[250px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="p-2 flex flex-col gap-2">
        <h1 className="font-bold text-vermelho">
          {veiculo.modelo} - {veiculo.marca}
        </h1>
        <div className="flex gap-2 items-center">
          <p className="font-medium flex gap-1 text-cinza items-center text-[0.8rem]">
            <FaCalendarDays className="text-cinza" /> {veiculo.ano}
          </p>
          <p className="font-medium flex gap-1 text-cinza items-center text-[0.8rem]">
            {veiculo.quilometragem} Km
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="font-medium flex gap-1 text-cinza items-center text-[0.8rem]">
            <FaLocationDot className="text-cinza" /> {veiculo.cidade} (
            {veiculo.estado})
          </p>
        </div>
        <div>
          <h2 className="font-bold text-vermelho">R${veiculo.preco}</h2>
        </div>
      </div>
      <Button className="bg-vermelho text-white w-full justify-center rounded-md p-2 font-bold hover:bg-vermelho-hover transition duration-300 ease-in-out">
        Ver detalhes
      </Button>
    </div>
  );
}

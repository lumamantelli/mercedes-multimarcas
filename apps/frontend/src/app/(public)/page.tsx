"use client";

import { Header } from "@/components/header/Header";
import Image from "next/image";
import BannerImagem from "../../../public/imagens/banner-imagem.jpg";
import BarraDePesquisa from "@/components/barraDePesquisa/BarraDePesquisa";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer/Footer";
import { Carro } from "@/types/auth";
import { api } from "@/lib/apis/carroApi";
import CardCarro from "@/components/cardCarro/CardCarro";

export default function PublicPage() {
  const [valorBusca, setValorBusca] = useState<string>("");

  const [carros, setCarros] = useState<Carro[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarros() {
      try {
        const res = await fetch(api.carros);
        if (!res.ok) {
          throw new Error("Erro ao buscar carros.");
        }
        const data = await res.json();
      
        setCarros(data);
      } catch (err) {
        console.error("Erro ao buscar carros:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCarros();
  }, [carros]);

  return (
    <div>
      <Header />
      <div className="w-full">
        <Image
          src={BannerImagem}
          alt="Mercedes Multimarcas"
          width={500}
          height={230}
          className=" bg-cover w-full h-[250px] object-cover object-center"
        />
      </div>
      <BarraDePesquisa
        valorFiltro={valorBusca}
        setValorFiltro={setValorBusca}
      />
      <div className="flex w-full px-48 justify-center h-auto">
        <aside className="w-[20%] h-full bg-white border-[1px] border-cinza-claro rounded-2xl p-4 gap-5 flex flex-col">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-center font-semibold text-[0.8rem]">Marca</h1>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Marca</SelectLabel>
                  <SelectItem value="apple">Hatch</SelectItem>
                  <SelectItem value="banana">Picape</SelectItem>
                  <SelectItem value="blueberry">Sedan</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-center font-semibold text-[0.8rem]">Modelo</h1>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Modelo</SelectLabel>
                  <SelectItem value="apple">Hatch</SelectItem>
                  <SelectItem value="banana">Picape</SelectItem>
                  <SelectItem value="blueberry">Sedan</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start gap-1 ">
            <h1 className="text-center font-semibold text-[0.8rem]">
              Categorias
            </h1>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  <SelectItem value="apple">Hatch</SelectItem>
                  <SelectItem value="banana">Picape</SelectItem>
                  <SelectItem value="blueberry">Sedan</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-vermelho w-full">
            <span className="font-semibold text-white">Filtrar</span>
          </Button>
        </aside>
        <div className="flex w-full flex-wrap gap-4 justify-center">
          {carros.length > 0 ? (
            carros.map((carro) => (
              <div key={carro.id}>
                <CardCarro carro={carro} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              {loading ? <p>Carregando...</p> : <p>Nenhum carro encontrado.</p>}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

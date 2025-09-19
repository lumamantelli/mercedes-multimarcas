import Image from "next/image";
import { Button } from "../ui/button";
import { FaInstagram, FaRegCopyright } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cinza w-full pt-10 pb-3 gap-5 flex flex-col justify-center items-center mt-10">
      <div className="flex items-start w-full justify-center gap-20">
        <div className="flex flex-col items-start gap-4">
          <Image src="/imagens/logo.svg" alt="Logo" width={200} height={100} />
          <div>
            <p className="text-[0.8rem] text-fundo">(66) 99623-1390</p>
            <p className="text-[0.8rem] text-fundo">
              mercedesmultimarcason@gmail.com
            </p>
          </div>
          <div className="flex gap-2">
            <FaInstagram className="text-fundo hover:scale-95 hover:ease-in-out hover:text-vermelho hover:transition-[1s] text-[1.3rem]" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h2 className="font=semibold  text-white">Acesso Rápido</h2>
          <nav className="flex flex-col text-[0.9rem] text-fundo font-light gap-2">
            <Link className="hover:text-vermelho" href="">
              Sobre
            </Link>
            <Link className="hover:text-vermelho" href="/contato">
              Contato
            </Link>
            <Link className="hover:text-vermelho" href="">
              Serviços
            </Link>
            <Link className="hover:text-vermelho" href="">
              Veículos
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div>
            <h2 className="font-semibold text-white">Novidades</h2>
            <p className="w-[300px] text-[0.9rem] text-fundo font-light">
              Quer ficar por dentro sempre que um carro for anunciado?
            </p>
          </div>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="bg-white p-1 rounded-lg w-[300px]"
          />
          <Button className="bg-vermelho text-white rounded-lg px-4 py-1">
            <span>Inscrever-se</span>
          </Button>
        </div>
      </div>
      <p className="flex gap-1 items-center text-fundo text-[0.8rem] bottom-0">
        <FaRegCopyright className="text-fundo" />
        Desenvolvido por Luma Mantelli - 2025. Todos os direitos reservados.
      </p>
    </footer>
  );
}

"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/lib/apis/usuarioApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await fetch(api.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      if (result) {
        // Redirecionar baseado no tipo de usuário
        router.push(
          '/dashboard'
        );
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center  gap-4 p-4 w-1/3 rounded-2xl shadow-2xl">
        <Image
          src="/imagens/logo.svg"
          alt="Logo Mercedes Multimarcas"
          width={200}
          height={200}
          className="object-contain mb-4"
        />
        <form className="flex flex-col w-full gap-4" method="POST">

          <div className="relative w-full ">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                        block w-full rounded-md border-gray-300 pr-10 
                        focus:ring-indigo-500 focus:border-indigo-500 
                        sm:text-sm p-2.5
                    "
                placeholder="Seu email"
              />
            </div>
          </div>
          <div className="relative w-full ">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="
                        block w-full rounded-md border-gray-300 pr-10 
                        focus:ring-indigo-500 focus:border-indigo-500 
                        sm:text-sm p-2.5
                    "
                placeholder="Sua senha"
              />

              <div
                className="
                        absolute inset-y-0 right-0 pr-3 flex items-center 
                        cursor-pointer text-gray-400 hover:text-gray-600
                    "
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-[1.25rem]" />
                ) : (
                  <FaEye className="text-[1.25rem]" />
                )}
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit} type="submit" className="bg-[var(--vermelho)]">Entrar</Button>
        </form>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
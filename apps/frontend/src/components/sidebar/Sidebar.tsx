"use client"

import { api } from "@/lib/apis/usuarioApi";
import { useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import {
    FaAlignJustify,
    FaAngleUp,
    FaArrowRightFromBracket,
    FaHouse,
    FaMagento,
    FaRegCircleUser,
    FaBuildingColumns,
    FaRug,
    FaUsers,
    FaShieldHalved,
} from "react-icons/fa6";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Usuario } from "@/types/auth";

export default function SidebarAdmin() {
    const [usuario,] = useState<Usuario | null>(null);
    const router = useRouter();

    // const mensagem = encodeURIComponent(
    //     `Olá, ${usuario?.nome}! Você está prestes a sair da sua conta.`
    // );

    const handleLogout = async () => {
        await fetch(api.logout, {
            method: "POST",
            credentials: "include", // ⚠️ precisa disso para enviar o cookie
        });

        // Opcional: redirecionar pro login
        router.push("/entrar");
    };

    const handlePerfil = async () => {
        router.push("/dashboard/perfil");
    };
    return (
        <Sidebar collapsible="icon" className="bg-[var(--sidebar)] py-4 ">
            <SidebarHeader className=" items-center h-[50px] border-b-1">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="bg-transparent hover:bg-transparente"
                            asChild
                        >
                            <div>
                                <FaAlignJustify
                                    className="text-[var(--vermelho)]
                "
                                />
                                <span className="font-semibold">Administrador</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel className="text-[var(--vermelho)] font-bold">
                            Início
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="font-medium">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="/dashboard">
                                                <FaHouse className="text-[var(--vermelho)] text-2xl" />
                                                <span>Início</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[var(--vermelho)] font-bold">
                        Configurações
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="font-medium">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="/dashboard/veiculos">
                                                <FaBuildingColumns className="text-[var(--vermelho)]" />
                                                <span>Veículos</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>


                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="font-medium">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="/superadmin/agentes">
                                                <FaMagento className="text-[var(--vermelho)]" />
                                                <span>Agentes</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="font-medium">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="/superadmin/usuarios">
                                                <FaUsers className="text-[var(--vermelho)]" />
                                                <span>Usuários</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="font-medium">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="/superadmin/grupos">
                                                <FaShieldHalved className="text-[var(--vermelho)]" />
                                                <span>Grupos</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="font-medium">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="/superadmin/sorteios">
                                                <FaRug className="text-[var(--vermelho)]" />
                                                <span>Sorteios</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel className="text-[var(--vermelho)] font-bold">
                            Ajuda
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="font-medium">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={`https://wa.me/556540429208?text=${mensagem}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaCircleQuestion className="text-[var(--vermelho)] text-2xl" />
                                                <span>Falar com Suporte</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
            </SidebarContent>
            <SidebarFooter className="border-t-1">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <FaRegCircleUser className="text-[var(--vermelho)]" />
                                    <span className="font-semibold">{usuario?.nome}</span>
                                    <FaAngleUp className="ml-auto text-[var(--vermelho)] " />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="left">
                                <DropdownMenuItem onClick={handlePerfil} className="w-[100%]">
                                    <span>Alterar senha</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="w-[100%] justify-between"
                                >
                                    <span>Logout</span>
                                    <FaArrowRightFromBracket />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
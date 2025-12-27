import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import Image from "next/image";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { SidebarTrigger } from "../ui/sidebar";


export function HeaderPrivado() {
    return (
        <header className="flex items-center justify-between bg-fundo p-4">
            <SidebarTrigger />
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src="/imagens/logo.svg"
                    alt="Logo Mercedes Multimarcas"
                    width={150}
                    height={50}
                    className="object-contain"
                />
            </Link>

         
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

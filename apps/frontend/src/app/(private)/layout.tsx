import '../globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import SidebarAdmin from '@/components/sidebar/Sidebar'
import { HeaderPrivado } from '@/components/headerPrivado/HeaderPrivado'
import FooterCopy from '@/components/footerCopywrite/FooterCopywrite'

export const metadata = {
  title: 'Mercedes | Administrador',
  description: 'Mercedes Multimarcas',
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='flex w-full'>
      <SidebarProvider>
        <SidebarAdmin />
        <main className="flex flex-col min-h-screen flex-1">
          <HeaderPrivado />
          <div className="flex-1 flex flex-col">
            <body className="flex-1 bg-[var(--background)] overflow-y-auto">
              {children}
            </body>
            <FooterCopy />
          </div>
        </main>
      </SidebarProvider>
    </html>
  )
}

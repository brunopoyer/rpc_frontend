import type { Metadata } from 'next'
import './globals.css'
import {Navbar} from "@/components/Navbar";
import {Inter} from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RPC - Lista de Tarefas',
  description: 'Projeto de lista de tarefas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}

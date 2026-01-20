import type { Metadata } from 'next'
import './globals.css'
import TailorBackground from '@/components/TailorBackground'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'DA COLLECTION - Tailleur de Luxe',
  description: 'Découvrez nos créations sur mesure et passez commande',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased relative min-h-screen">
        <TailorBackground />
        <div className="relative z-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}

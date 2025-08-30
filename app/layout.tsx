import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Duolingo Clone',
  description: 'A Duolingo-style language learning app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="min-h-[100svh] grid place-items-center p-4 bg-[#f7f9fc]">
          <main className="w-full max-w-[420px] md:max-w-[560px] bg-white rounded-2xl shadow-xl overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
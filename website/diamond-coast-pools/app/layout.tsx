import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diamond Coast Pools | Pool Service in Danbury, TX & Houston Area',
  description: 'Family owned pool service company with 10 years experience. Serving Danbury, Houston, and Galveston County. Reliable pool cleaning, equipment repair, and maintenance.',
  keywords: 'pool service Danbury TX, pool cleaning Houston, pool maintenance Galveston County, pool repair Texas',
  openGraph: {
    title: 'Diamond Coast Pools | Trusted Pool Service in Danbury, TX',
    description: 'Family owned pool service with 10 years experience. Serving Danbury, Houston & Galveston County.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
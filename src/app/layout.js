import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from "@/components/Navbar"
// import Footer from '@/components/Footer'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'Next js Auth',
  description: 'next js Authentication.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}

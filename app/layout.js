import './globals.css'
import { Readex_Pro } from 'next/font/google'

const readexPro = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata = {
  title: 'مُستثمر - تتبع استثماراتك',
  description: 'تطبيق لتتبع جميع استثماراتك وحساب الأرباح في مكان واحد',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={readexPro.className}>
      <body>{children}</body>
    </html>
  )
}

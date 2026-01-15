import './globals.css'

export const metadata = {
  title: 'مُستثمر - تتبع استثماراتك',
  description: 'تطبيق لتتبع جميع استثماراتك وحساب الأرباح في مكان واحد',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}

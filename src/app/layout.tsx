import { Poppins } from 'next/font/google';
import '../styles/main.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body>{children}</body>
    </html>
  );
}

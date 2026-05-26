import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Magazine Booth Co. | Step Onto The Cover',
  description: 'Elevate your event with a life-sized, walk-in magazine cover photobooth experience.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth bg-zinc-950">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-zinc-950 text-zinc-100`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

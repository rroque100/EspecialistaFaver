import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Especialista Faver | Automatización de Portones en Lima',
  description: 'Expertos en instalación, mantenimiento y reparación de portones automáticos en Lima. Servicio 24/7 y garantía total.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-black text-slate-300 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200" suppressHydrationWarning>
        {googleTagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleTagId}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}

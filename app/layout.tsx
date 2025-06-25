import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "色当てクイズ",
  description: "表示された色のRGB値を当てるゲームです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={cn(
          notoSansJp.variable, 
          "font-sans antialiased dark bg-gradient-to-br from-gray-900 to-slate-800 text-foreground"
        )}
      >
        {children}
      </body>
    </html>
  );
}
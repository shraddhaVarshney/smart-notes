import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Smart Notes Mini Project",
  description: "Developed by Shraddha Varshney",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} flex flex-col h-[100vh] ${geistMono.variable} antialiased`}
      >
        <div className="w-full flex justify-center items-center font-bold text-[35px] bg-[#B6A28E] text-white px-3 py-0.5">Smart Notes</div>
       <div className="w-full">{children}</div>
      </body>
    </html>
  );
}

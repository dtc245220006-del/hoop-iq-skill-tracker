import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoop IQ — Skill Tracker",
  description: "Theo dõi bóng rổ, gym, streak và tiến độ xuyên thiết bị.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

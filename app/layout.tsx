import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "カンタン！お仕事アンケート",
  description: "お仕事アンケート",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";
import Link from "next/link";
export const metadata = { title: "カンタン！お仕事アンケート" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="ja"><body>
    <nav className="mx-auto flex max-w-6xl gap-6 px-6 pt-5 text-sm font-bold text-violet-500">
      <Link href="/dashboard">ダッシュボード</Link><Link href="/staff">スタッフ管理</Link></nav>
    {children}</body></html>);
}

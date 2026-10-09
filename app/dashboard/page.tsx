"use client";
import { useEffect, useState } from "react";
import { Users, AlertCircle, Clock } from "lucide-react";
import Donut from "@/components/Donut";
import StatusBadge from "@/components/StatusBadge";
import AdminSelect from "@/components/AdminSelect";
import { ADMINS, getAnswers, getStaff, latestByStaff, fmt } from "@/lib/store";
import { currentPeriod } from "@/lib/status";
import { Answer, Status } from "@/types";

export default function Dashboard() {
  const [admin, setAdmin] = useState(ADMINS[0]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [members, setMembers] = useState(0);
  useEffect(() => { getAnswers(admin).then(setAnswers).catch(() => setAnswers([])); setMembers(getStaff(admin).length); }, [admin]);
  const latest = latestByStaff(answers);
  const counts: Record<Status, number> = { good: 0, normal: 0, follow: 0 };
  latest.forEach((a) => counts[a.status]++);
  const follow = latest.filter((a) => a.status === "follow");
  const recent = [...answers].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (<main className="mx-auto max-w-6xl space-y-6 p-6">
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div><h1 className="text-2xl font-black">チームコンディション ダッシュボード</h1><p className="text-sm text-slate-500">{currentPeriod()} 実施分</p></div>
      <div className="flex items-center gap-3"><AdminSelect value={admin} onChange={setAdmin} />
        <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm"><Users size={16} />対象メンバー {members || latest.length}名</span></div>
    </header>
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card md:row-span-2"><h2 className="mb-6 font-bold">コンディション分布</h2><Donut counts={counts} /></section>
      <section className="card"><h2 className="mb-4 flex items-center gap-2 font-bold"><AlertCircle size={18} className="text-rose-500" />要フォロー対象者
        <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs text-rose-600">{follow.length}</span></h2>
        <ul className="space-y-3">{follow.length === 0 && <li className="text-sm text-slate-400">現在、要フォローの方はいません</li>}
          {follow.map((a) => <li key={a.staffId} className="flex items-center justify-between rounded-2xl bg-rose-50/60 px-4 py-3">
            <div><p className="font-bold">{a.name} <span className="text-xs font-normal text-slate-400">ID: {a.staffId}</span></p>
              <p className="text-xs text-slate-500">{a.brand || "—"}・回答日 {fmt(a.date).split(" ")[0]}</p></div><StatusBadge status="follow" /></li>)}</ul></section>
      <section className="card"><h2 className="mb-4 flex items-center gap-2 font-bold"><Clock size={18} className="text-violet-500" />最近の回答</h2>
        <ul className="space-y-3">{recent.length === 0 && <li className="text-sm text-slate-400">まだ回答がありません</li>}
          {recent.map((a, i) => <li key={i} className="flex items-center justify-between rounded-2xl bg-violet-50/60 px-4 py-3">
            <div><p className="font-bold">{a.name}</p><p className="text-xs text-slate-500">{a.period || currentPeriod(new Date(a.date))}・{fmt(a.date)}</p></div><StatusBadge status={a.status} /></li>)}</ul></section>
    </div></main>);
}

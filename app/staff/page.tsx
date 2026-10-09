"use client";
import { useEffect, useState } from "react";
import AdminSelect from "@/components/AdminSelect";
import StatusBadge from "@/components/StatusBadge";
import { ADMINS, allStaff, getAnswers, latestByStaff, saveAllStaff, tokenOf } from "@/lib/store";
import { Answer, Staff } from "@/types";

const nonce = () => Math.random().toString(36).slice(2, 8);
export default function StaffPage() {
  const [admin, setAdmin] = useState(ADMINS[0]);
  const [list, setList] = useState<Staff[]>([]);
  const [latest, setLatest] = useState<Record<string, Answer>>({});
  const [f, setF] = useState({ id: "", name: "", brand: "" });
  const [msg, setMsg] = useState("");
  const reload = () => { setList(allStaff().filter((s) => s.admin === admin));
    getAnswers(admin).then((a) => setLatest(Object.fromEntries(latestByStaff(a).map((x) => [x.staffId, x])))).catch(() => {}); };
  useEffect(reload, [admin]); // eslint-disable-line
  const commit = (fn: (all: Staff[]) => Staff[]) => { saveAllStaff(fn(allStaff())); reload(); };
  const link = (s: Staff) => `${location.origin}/survey/${tokenOf(s)}`;
  const add = () => { if (!f.id || !f.name) return setMsg("スタッフ番号と氏名は必須です");
    if (allStaff().some((s) => s.admin === admin && s.id === f.id)) return setMsg("そのスタッフ番号は登録済みです");
    commit((a) => [...a, { ...f, admin, nonce: nonce() }]); setF({ id: "", name: "", brand: "" }); setMsg(""); };
  const copy = async (s: Staff) => { await navigator.clipboard.writeText(link(s)); setMsg(`${s.name}さんのリンクをコピーしました`); };
  const view = (s: Staff) => { const a = latest[s.id]; alert(a ? `Q1:${a.q1} Q2:${a.q2} Q3:${a.q3}\nやりがい: ${a.q4 || "—"}\n困りごと: ${a.q5 || "—"}` : "未回答です"); };
  const edit = (s: Staff) => { const name = prompt("氏名", s.name); if (!name) return; const brand = prompt("ブランド", s.brand) ?? s.brand;
    commit((a) => a.map((x) => (x === s || (x.admin === s.admin && x.id === s.id) ? { ...x, name, brand } : x))); };
  const reissue = (s: Staff) => confirm("古いリンクは使えなくなります。再発行しますか？") && commit((a) => a.map((x) => x.admin === s.admin && x.id === s.id ? { ...x, nonce: nonce() } : x));
  const del = (s: Staff) => confirm(`${s.name}さんを削除しますか？`) && commit((a) => a.filter((x) => !(x.admin === s.admin && x.id === s.id)));
  const lk = "font-bold text-violet-500 hover:underline";
  return (<main className="mx-auto max-w-6xl space-y-6 p-6">
    <header className="flex items-center justify-between"><div><h1 className="text-2xl font-black">スタッフ管理</h1>
      <p className="text-sm text-slate-500">スタッフを登録して、個人専用のアンケートリンクを発行します。</p></div><AdminSelect value={admin} onChange={setAdmin} /></header>
    <section className="card"><h2 className="mb-4 font-bold">スタッフを追加</h2>
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
        <input className="input" placeholder="スタッフ番号" value={f.id} onChange={(e) => setF({ ...f, id: e.target.value })} />
        <input className="input" placeholder="氏名" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input className="input" placeholder="ブランド（任意）" value={f.brand} onChange={(e) => setF({ ...f, brand: e.target.value })} />
        <button className="btn" onClick={add}>登録する</button></div>
      {msg && <p className="mt-3 text-sm text-violet-600">{msg}</p>}</section>
    <section className="card overflow-x-auto"><h2 className="mb-4 font-bold">登録済みスタッフ一覧</h2>
      <table className="w-full text-left text-sm"><thead className="text-xs text-slate-400"><tr>
        {["スタッフ番号", "氏名", "ブランド", "最新の状態", "個人リンク", "操作"].map((h) => <th key={h} className="py-2 pr-4 font-medium">{h}</th>)}</tr></thead>
        <tbody>{list.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-slate-400">まだスタッフが登録されていません</td></tr>}
          {list.map((s) => <tr key={s.id} className="border-t border-violet-50">
            <td className="py-3 pr-4">{s.id}</td><td className="pr-4 font-bold">{s.name}</td><td className="pr-4">{s.brand || "—"}</td>
            <td className="pr-4"><StatusBadge status={latest[s.id]?.status} /></td>
            <td className="pr-4"><button className="max-w-[180px] truncate rounded-lg bg-violet-50 px-2 py-1 text-xs text-violet-600" onClick={() => copy(s)}>/survey/{tokenOf(s).slice(0, 10)}…</button></td>
            <td className="space-x-3 whitespace-nowrap"><button className={lk} onClick={() => view(s)}>回答を見る</button><button className={lk} onClick={() => copy(s)}>コピー</button>
              <button className={lk} onClick={() => reissue(s)}>再発行</button><button className={lk} onClick={() => edit(s)}>編集</button>
              <button className="font-bold text-rose-500 hover:underline" onClick={() => del(s)}>削除</button></td></tr>)}</tbody></table></section></main>);
}

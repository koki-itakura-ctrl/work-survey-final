"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { parseToken, postAnswer } from "@/lib/store";
import { currentPeriod, judge } from "@/lib/status";

const QS = [["現在の業務内容には満足していますか？", "不満", "満足"], ["人間関係は良好ですか？", "不満", "良好"], ["体調は良好ですか？", "不振", "良好"]];
export default function Survey() {
  const { token } = useParams<{ token: string }>();
  const who = parseToken(token);
  const [q, setQ] = useState<number[]>([0, 0, 0]);
  const [q4, setQ4] = useState(""); const [q5, setQ5] = useState("");
  const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  if (!who) return <main className="p-10 text-center">このリンクは無効です。管理者に再発行を依頼してください。</main>;
  if (done) return <main className="mx-auto mt-24 max-w-md card text-center"><h1 className="text-xl font-black">回答ありがとうございました</h1><p className="mt-2 text-sm text-slate-500">このページは閉じて大丈夫です。</p></main>;
  const submit = async () => { setBusy(true);
    try { await postAnswer({ date: new Date().toISOString(), period: currentPeriod(), admin: who.admin, staffId: who.id, name: who.name, brand: who.brand,
      q1: q[0], q2: q[1], q3: q[2], q4, q5, status: judge(q, q4 + q5) }); setDone(true); } catch { alert("送信に失敗しました。もう一度お試しください。"); } setBusy(false); };
  return (<main className="mx-auto max-w-xl space-y-5 p-6">
    <h1 className="text-2xl font-black">カンタン！お仕事アンケート</h1><p className="font-bold text-violet-600">{who.name} さん</p>
    {QS.map(([t, lo, hi], i) => <section key={i} className="card"><p className="mb-3 font-bold">Q{i + 1}. {t}</p>
      <div className="flex justify-between gap-2">{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setQ(q.map((v, j) => (j === i ? n : v)))}
        className={`h-12 flex-1 rounded-2xl text-lg font-bold ${q[i] === n ? "bg-gradient-to-br from-violet-500 to-pink-400 text-white" : "bg-violet-50 text-violet-500"}`}>{n}</button>)}</div>
      <div className="mt-2 flex justify-between text-xs text-slate-400"><span>1:{lo}</span><span>5:{hi}</span></div></section>)}
    <section className="card"><label className="mb-2 block font-bold">Q4. やりがいに感じること</label><textarea className="input h-24" value={q4} onChange={(e) => setQ4(e.target.value)} /></section>
    <section className="card"><label className="mb-2 block font-bold">Q5. 業務やスタッフ間のやり取りなどで困っていること</label><textarea className="input h-24" value={q5} onChange={(e) => setQ5(e.target.value)} /></section>
    <button className="btn w-full disabled:opacity-40" disabled={q.includes(0) || busy} onClick={submit}>{busy ? "送信中…" : "送信する"}</button>
    {q.includes(0) && <p className="text-center text-xs text-slate-400">Q1〜Q3をすべて選ぶと送信できます</p>}</main>);
}

import { Status } from "@/types";
import { COLOR, LABEL } from "@/lib/status";
export default function Donut({ counts }: { counts: Record<Status, number> }) {
  const total = counts.good + counts.normal + counts.follow, R = 70, C = 2 * Math.PI * R;
  let off = 0;
  return (<div className="flex flex-col items-center gap-5">
    <div className="relative h-52 w-52"><svg viewBox="0 0 200 200" className="-rotate-90">
      <circle cx="100" cy="100" r={R} fill="none" stroke="#ede9fe" strokeWidth="26" />
      {(["good", "normal", "follow"] as Status[]).map((s) => { const len = total ? (counts[s] / total) * C : 0;
        const el = <circle key={s} cx="100" cy="100" r={R} fill="none" stroke={COLOR[s]} strokeWidth="26" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} />;
        off += len; return el; })}
    </svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-black">{total}名</span><span className="text-xs text-slate-500">が回答済み</span></div></div>
    <ul className="flex gap-5 text-sm">{(["good", "normal", "follow"] as Status[]).map((s) =>
      <li key={s} className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-full" style={{ background: COLOR[s] }} />{LABEL[s]} {counts[s]}</li>)}</ul>
  </div>);
}

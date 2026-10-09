import { ADMINS } from "@/lib/store";
export default function AdminSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (<select className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-600" value={value} onChange={(e) => onChange(e.target.value)}>
    {ADMINS.map((a) => <option key={a} value={a}>管理者：{a}</option>)}</select>);
}

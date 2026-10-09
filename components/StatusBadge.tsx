import { Status } from "@/types";
import { LABEL } from "@/lib/status";
const CLS: Record<Status, string> = { good: "bg-emerald-100 text-emerald-700", normal: "bg-amber-100 text-amber-700", follow: "bg-rose-100 text-rose-600" };
export default function StatusBadge({ status }: { status?: Status }) {
  if (!status) return <span className="text-xs text-slate-400">未回答</span>;
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${CLS[status]}`}>{LABEL[status]}</span>;
}

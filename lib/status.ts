import { Status } from "@/types";
export const NG = ["退職","辞め","辛い","つらい","しんどい","限界","不満","悩","休みたい","やめ"];
export const LABEL: Record<Status, string> = { good: "良好", normal: "ふつう", follow: "要フォロー" };
export const COLOR: Record<Status, string> = { good: "#10b981", normal: "#f59e0b", follow: "#f43f5e" };
export function judge(q: number[], text: string): Status {
  const ng = NG.some((w) => text.includes(w));
  if (q.includes(1) || q.filter((v) => v === 2).length >= 2 || ng) return "follow";
  if (q.every((v) => v >= 4)) return "good";
  return "normal";
}
export const currentPeriod = (d = new Date()) => `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`;

import { Answer, Staff, Status, SurveyPayload } from "@/types";
import { LABEL } from "./status";
export const ADMINS = ["山田", "佐藤"];
const GAS = process.env.NEXT_PUBLIC_GAS_API_URL;
const SK = "cd_staff", AK = "cd_answers";
const read = <T,>(k: string, d: T): T => { try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return d; } };
const write = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v));
const rev: Record<string, Status> = { 良好: "good", ふつう: "normal", 要フォロー: "follow" };

// token は回答に必要な情報を含む(GAS未連携でもスタッフ別リンクが機能する)
export const makeToken = (p: SurveyPayload & { nonce: string }) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(p)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
export const parseToken = (t: string): SurveyPayload | null => {
  try { return JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/"))))); } catch { return null; }
};
export const tokenOf = (s: Staff) => makeToken({ id: s.id, name: s.name, brand: s.brand, admin: s.admin, nonce: s.nonce });

export const getStaff = (admin: string): Staff[] => read<Staff[]>(SK, []).filter((s) => s.admin === admin);
export const saveAllStaff = (all: Staff[]) => write(SK, all);
export const allStaff = () => read<Staff[]>(SK, []);

export async function getAnswers(admin: string): Promise<Answer[]> {
  if (GAS) {
    const r = await fetch(`${GAS}?adminName=${encodeURIComponent(admin)}`);
    const rows: (string | number)[][] = (await r.json()).rows ?? [];
    return rows.map((c) => ({ date: String(c[0]), period: "", admin, staffId: String(c[1]), name: String(c[2]), brand: String(c[3]),
      q1: +c[4], q2: +c[5], q3: +c[6], q4: String(c[7]), q5: String(c[8]), status: rev[String(c[9])] ?? "normal" }));
  }
  return read<Answer[]>(AK, []).filter((a) => a.admin === admin);
}
export async function postAnswer(a: Answer) {
  if (GAS) {
    await fetch(GAS, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ adminName: a.admin,
      row: [a.date, a.staffId, a.name, a.brand, a.q1, a.q2, a.q3, a.q4, a.q5, LABEL[a.status]] }) });
  } else write(AK, [...read<Answer[]>(AK, []), a]);
}
export const latestByStaff = (list: Answer[]) => {
  const m = new Map<string, Answer>();
  [...list].sort((a, b) => a.date.localeCompare(b.date)).forEach((a) => m.set(a.staffId, a));
  return [...m.values()];
};
export const fmt = (iso: string) => { const d = new Date(iso); return isNaN(+d) ? iso : `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };

export type Status = "good" | "normal" | "follow";
export interface Staff { id: string; name: string; brand: string; admin: string; nonce: string }
export interface Answer {
  date: string; period: string; admin: string; staffId: string; name: string; brand: string;
  q1: number; q2: number; q3: number; q4: string; q5: string; status: Status;
}
export interface SurveyPayload { id: string; name: string; brand: string; admin: string }

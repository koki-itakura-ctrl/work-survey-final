'use client';

import React, { useState } from 'react';

export default function SurveyPage() {
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);
  const [q3, setQ3] = useState<number | null>(null);
  const [q4, setQ4] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f3f0ff] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">ご回答ありがとうございました！</h1>
          <p className="text-slate-600">アンケートの送信が完了しました。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f0ff] py-10 px-4 font-sans">
      <div className="max-w-xl mx-auto space-y-6">
        {/* ヘッダーナビゲーションを完全削除したタイトル表示 */}
        <div className="text-center py-2">
          <h1 className="text-2xl font-bold text-slate-900">カンタン！お仕事アンケート</h1>
          <p className="text-indigo-600 text-sm mt-1 font-medium">テスト さん</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-slate-800 font-semibold">Q1. 現在の業務内容には満足していますか？</h2>
          <div className="flex justify-between gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setQ1(num)}
                className={}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 px-1">
            <span>1:不満</span>
            <span>5:満足</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-slate-800 font-semibold">Q2. 人間関係は良好ですか？</h2>
          <div className="flex justify-between gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setQ2(num)}
                className={}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 px-1">
            <span>1:不満</span>
            <span>5:良好</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-slate-800 font-semibold">Q3. 体調は良好ですか？</h2>
          <div className="flex justify-between gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setQ3(num)}
                className={}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 px-1">
            <span>1:不振</span>
            <span>5:良好</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
          <h2 className="text-slate-800 font-semibold">Q4. やりがいに感じること</h2>
          <textarea
            value={q4}
            onChange={(e) => setQ4(e.target.value)}
            rows={3}
            className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="自由に入力してください"
          />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-sm"
        >
          回答を送信する
        </button>
      </div>
    </div>
  );
}

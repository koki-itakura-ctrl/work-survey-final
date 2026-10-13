'use client';

import React, { useState } from 'react';

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-slate-800">カンタン！お仕事アンケート</h1>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <p className="text-slate-600">回答を入力してください。</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

interface AdminSelectProps {
  admins: { id: string; name: string }[];
  selectedAdminId: string;
  onSelectAdmin: (id: string) => void;
}

export default function AdminSelect({ admins, selectedAdminId, onSelectAdmin }: AdminSelectProps) {
  useEffect(() => {
    // 起動時にローカルストレージから前回の選択を取得
    const savedId = localStorage.getItem('selected_admin_id');
    if (savedId && admins.some((a) => a.id === savedId)) {
      onSelectAdmin(savedId);
    }
  }, [admins]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    localStorage.setItem('selected_admin_id', newId); // 選択時にストレージ保存
    onSelectAdmin(newId);
  };

  return (
    <select
      value={selectedAdminId}
      onChange={handleChange}
      className="p-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {admins.map((admin) => (
        <option key={admin.id} value={admin.id}>
          {admin.name}
        </option>
      ))}
    </select>
  );
}

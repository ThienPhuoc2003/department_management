"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

interface Recipient {
  _id: string;
  name: string;
  role: string;
}

const NotificationsPage = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [recipient, setRecipient] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    async function fetchRecipients() {
      const response = await fetch('/api/recipients');
      const data: Recipient[] = await response.json();
      // Filter recipients by role 'truongBoMon' right after fetching
      const filteredData = data.filter(r => r.role === 'truongBoMon');
      setRecipients(filteredData);
    }

    fetchRecipients();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Recipient:', recipient);
    console.log('File:', file);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    // Add logic to handle the submission, e.g., sending to a server
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Gửi thông báo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Chọn người nhận:</label>
          <select 
            value={recipient} 
            onChange={e => setRecipient(e.target.value)}
            className="mt-1 p-2 border rounded-lg"
          >
            {recipients.map(r => (
              <option key={r._id} value={r.name}>{r.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Chọn tệp đính kèm:</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="mt-1 p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Thời gian bắt đầu:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)}
            className="mt-1 p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Thời gian kết thúc:</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)}
            className="mt-1 p-2 border rounded-lg"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Gửi thông báo
        </button>
      </form>
      <Link href="/dashboard">
        <span className="block mt-4 text-center text-blue-600 hover:underline">Quay lại trang chủ</span>
      </Link>
    </div>
  );
};

export default NotificationsPage;

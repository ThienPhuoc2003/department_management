"use client";

import { useState } from "react";
import { getData } from "../../../pages/api/recipients";
import { handleSendEmail } from "./action";
import { Session } from "next-auth";

export const FormSend = ({
  recipients,
}: {
  recipients: Awaited<ReturnType<typeof getData>>;
}) => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        const message = await handleSendEmail(formData);
        setMessage(message);
      }}
      className="space-y-4"
    >
      <div className="flex flex-col">
        <label className="font-medium">Chọn người nhận:</label>
        <select name="recipient" className="mt-1 p-2 border rounded-lg">
          {recipients.map((r) => (
            <option key={r._id} value={r.email}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Chọn tệp đính kèm:</label>
        <input name="file" type="file" className="mt-1 p-2 border rounded-lg" />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Thời gian bắt đầu:</label>
        <input
          name="startDate"
          type="date"
          className="mt-1 p-2 border rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Thời gian kết thúc:</label>
        <input
          name="endDate"
          type="date"
          className="mt-1 p-2 border rounded-lg"
        />
      </div>
      {message && <div className="text-center text-green-500 mt-4">{message}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700"
      >
        Gửi thông báo
      </button>
    </form>
  );
};

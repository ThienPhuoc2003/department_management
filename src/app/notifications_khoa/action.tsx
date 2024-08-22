"use server";

import { getServerSession } from "next-auth";
import { Resend } from "resend";

import { authOptions } from "../api/auth/[...nextauth]/route";

interface EmailTemplateProps {
  senderName: string;
  senderRole: string;
  startDate: string;
  endDate: string;
}


export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  senderName,
  senderRole,
  startDate,
  endDate,
}) => (
  <div>
    <h1>Welcome!</h1>
    <p>Người gửi: {senderName} - {senderRole}</p>
    <p>Thời gian bắt đầu: {startDate}</p>
    <p>Thời gian kết thúc: {endDate}</p>
  </div>
);


export const handleSendEmail = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  const file = formData.get("file") as File;
  const email = formData.get("recipient") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const senderName = session?.user?.name || "Unknown Sender";
  const senderRole = getRoleDisplayName(session?.user?.role || "Unknown Role");

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: `no-reply <no-reply@shareexam.asakuri.tech>`,
      to: [email],
      subject: "Thông báo từ " + senderName,
      react: EmailTemplate({ senderName, senderRole, startDate, endDate }),
      attachments: [
        {
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        },
      ],
    });

    if (error) {
      console.log(error);
      return "Có lỗi xảy ra khi gửi email.";
    } else {
      console.log("Gửi thành công email", data);
      return "Gửi thông báo thành công!";
    }
  } catch (error) {
    console.log(error);
    return "Có lỗi xảy ra khi gửi email.";
  }
};

function getRoleDisplayName(role: string | undefined): string {
  if (!role) {
    return "Unknown Role";
  }

  switch (role) {
    case 'truongBoMon':
      return 'Trưởng Bộ Môn';
    case 'phongKhaoThi':
      return 'Phòng khảo thí';
    case 'giaoVuKhoa':
      return 'Giáo vụ khoa';
    case 'giangVien':
      return 'Giảng viên';
    default:
      return role;
  }
}

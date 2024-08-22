import Link from "next/link";
import { redirect } from "next/navigation";

import { getData } from "../../../pages/api/recipients";
import { FormSend } from "./client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
const getRoleDisplayName = (role: any) => {
  switch (role) {
    case 'phongKhaoThi':
      return 'Phòng khảo thí';
      case 'truongBoMon':
        return 'Trưởng Bộ Môn';
    case 'giaoVuKhoa':
      return 'Giáo vụ khoa';
    case 'giangVien':
      return 'Giảng viên';
    default:
      return role; // Trả về role nguyên bản nếu không có trường hợp đặc biệt
  }
};

const NotificationsPage = async () => {
  
  const session = await getServerSession(authOptions);
  const data = await getData();
  const recipients = data.filter((r) => r.role === "truongBoMon");
 
  if (!session) redirect("/");

    return (
<div className="max-w-4xl mx-auto p-6 border-2 border-blue-600 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Gửi thông báo</h1>
          <div className="mt-20 grid grid-cols-2 gap-4 items-center">
    <p className="text-sm text-gray-500">Tên: {session.user?.name}</p>
    <p className="text-sm text-gray-500">Vai trò: {getRoleDisplayName(session.user?.role)}</p>
</div>

        </div>
        <FormSend recipients={recipients} />

      <Link href="/dashboard">
        <span className="block mt-4 text-center text-blue-600 hover:underline">
          Quay lại trang chủ
        </span>
      </Link>
    </div>
  );
};

export default NotificationsPage;

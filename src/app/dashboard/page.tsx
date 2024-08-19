"use client";
import Sidebar from "@/components/Sidebar";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing out:", error);
      // Optionally, handle errors in UI, e.g., show a notification
    }
  };
  

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-10">
       
      </div>
      <div className="p-5">
        <button 
          onClick={handleSignOut}
          className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
          aria-label="Sign out"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

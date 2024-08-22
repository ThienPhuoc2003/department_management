import Link from "next/link";
import { useState } from 'react';
import Image from 'next/image';
import { FaBell, FaRegRegistered } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const sidebarStyle: React.CSSProperties = {
        width: isOpen ? '250px' : '50px',
        transition: 'width 300ms ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
    };

    const headerStyle: React.CSSProperties = {
        width: '100%',
        height: '50px', // Fixed height for the header
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div 
            className="h-full shadow-md bg-gray-200 fixed"
            style={sidebarStyle}
            onMouseOver={() => setIsOpen(true)}
            onMouseOut={() => setIsOpen(false)}
        >
            <div style={headerStyle}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                        src="/logo.png" 
                        alt="Logo"
                        layout="fill"
                        objectFit="cover" // Ensures the image covers the area without distorting aspect ratio
                    />
                </div>
                {/* {isOpen && <span className="ml-2 text-white text-xl font-bold">Quản lý</span>} */}
            </div>
            <ul className="w-full flex-1 flex flex-col justify-start items-center space-y-4 mt-4">
            {session && session.user?.role === 'phongKhaoThi' && (
                <li className="text-gray-800 text-base hover:bg-gray-100 p-2 cursor-pointer flex items-center">
                    <Link href="/notifications_khaothi">
                        <span className="flex items-center justify-center w-full">
                            <FaBell className="text-lg"/>
                            {isOpen && <span className="ml-2 text-sm">Tạo thông báo của PKT</span>}
                        </span>
                    </Link>
                </li>
            )}
                {session && session.user?.role === 'giaoVuKhoa' && (
                    <li className="text-gray-800 text-base hover:bg-gray-100 p-2 cursor-pointer flex items-center">
                        <Link href="/notifications_khoa">
                            <span className="flex items-center justify-center w-full">
                                <FaBell className="text-lg"/>
                                {isOpen && <span className="ml-2 text-sm">Tạo thông báo của GVK</span>}
                            </span>
                        </Link>
                    </li>
                )}
                 {session && session.user?.role === 'phongKhaoThi' && (
                <li className="text-gray-800 text-base hover:bg-gray-100 p-2 cursor-pointer flex items-center">
                    <Link href="/lenlichthi">
                        <span className="flex items-center justify-center w-full">
                            <FaBell className="text-lg"/>
                            {isOpen && <span className="ml-2 text-sm">Lên lịch thi</span>}
                        </span>
                    </Link>
                </li>
            )}
            </ul>
        </div>
    );
};

export default Sidebar;

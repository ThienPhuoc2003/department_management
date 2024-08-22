'use client'
import { NextPage } from 'next';
import Link from "next/link";
import { useState, FormEvent } from "react"; 
import {useRouter} from"next/navigation";

const RegisterForm: NextPage = () => {
    const [name, setName] = useState<string>(""); 
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 
    const [role, setRole] = useState<string>("");
    const [error, setError] = useState<string>(""); 

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Using type assertions to inform TypeScript about the element types
        const nameInput = form.elements.namedItem('name') as HTMLInputElement;
        const emailInput = form.elements.namedItem('email') as HTMLInputElement;
        const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
        const roleSelect = form.elements.namedItem('role') as HTMLSelectElement;

        if(!nameInput.value || !emailInput.value || !passwordInput.value) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        
        try {
            const resUserExists = await fetch('api/userExists',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                }), 
            });
            const {user} =await resUserExists.json();
            
            if(user){
                setError("Email đã tồn tại. Vui lòng đăng nhập hoặc đăng ký với email khác.");
                return;
            }
            const res = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                    role: roleSelect.value
                })
            });
    
            if (res.ok) {
                form.reset(); 
                router.push("/");
            } else {
                console.log("User registration failed");
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration", error);
            setError("An error occurred during registration.");
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="form-container shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4 text-center">Đăng ký</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input name="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="Họ và tên" className="input" />
                    <input name="email" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="input" />
                    <input name="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mật khẩu" className="input" />
                    <select name="role" onChange={(e) => setRole(e.target.value)} className="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Vai trò</option>
                        <option value="phongKhaoThi">Phòng khảo thí</option>
                        <option value="giaoVuKhoa">Giáo vụ khoa</option>
                        <option value="truongBoMon">Trưởng bộ môn</option>
                        <option value="giangVien">Giảng viên</option>
                    </select>
                    <button className="button bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Đăng ký</button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <Link className="text-sm mt-3 text-right" href={'/'}>Đã có tài khoảng ? <span className="underline">Đăng nhập</span></Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;

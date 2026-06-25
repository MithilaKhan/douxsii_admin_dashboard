import { useState } from 'react';
import { Button, Checkbox, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setToLocalStorage } from '../../utils/localStorage';
import { FormInput } from '../../components/ui/FormInput';
import AuthLayout from '../../components/layout/AuthLayout';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState<'Support Agent' | 'Support Manager'>('Support Agent');

    const onFinish = async (values: { email: string, password: string }) => {
        console.log("Mock logging in with email:", values.email, "as role:", role);
        Swal.fire({
            title: "Login Successful",
            text: `Welcome to Douxsii ${role} Dashboard`,
            icon: "success",
            timer: 1200,
            showConfirmButton: false
        }).then(() => {                
            setToLocalStorage("accessToken", "dummy-access-token-12345");
            setToLocalStorage("userRole", role);

            const dummyUser = {
                email: values.email,
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256",
                name: "Alex John",
                role: role,
                status: "active"
            };
            setToLocalStorage("userData", JSON.stringify(dummyUser));

            navigate("/");
            window.location.reload();
        });
    };

    return (
        <AuthLayout>
            <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-[#56000c]/10 shadow-sm">
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-[#333333] mb-2">Welcome!</h1>
                <p className="text-sm text-[#707070] leading-relaxed max-w-[360px] mx-auto">
                    Please sign in to access your dashboard and manage your platform securely
                </p>
            </div>

            <Form name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                {/* Select Role Box */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                        Select Role<span className="text-[#ff4d4f] ml-0.5">*</span>
                    </label>
                    <div className="bg-[#FFF0F0] border border-[#FFD2D2] rounded-xl p-3 flex items-center justify-around">
                        {/* Support Agent Option */}
                        <div 
                            onClick={() => setRole('Support Agent')}
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${role === 'Support Agent' ? 'bg-[#56000c] border-[#56000c]' : 'bg-white border-[#d9d9d9]'}`}>
                                {role === 'Support Agent' && (
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm font-medium text-[#333333]">Support Agent</span>
                        </div>

                        {/* Support Manager Option */}
                        <div 
                            onClick={() => setRole('Support Manager')}
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${role === 'Support Manager' ? 'bg-[#56000c] border-[#56000c]' : 'bg-white border-[#d9d9d9]'}`}>
                                {role === 'Support Manager' && (
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm font-medium text-[#333333]">Support Manager</span>
                        </div>
                    </div>
                </div>

                <FormInput 
                    name="email" 
                    label={<span className="text-[#333333] text-sm font-semibold">Email<span className="text-[#ff4d4f] ml-0.5">*</span></span>} 
                    placeholder="Enter your email" 
                    type="text" 
                    inputClassName="bg-[#f0f0f0] border-none text-[#333333] placeholder:text-[#8c8c8c]"
                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email address!' }]} 
                />
                
                <FormInput 
                    name="password" 
                    label={<span className="text-[#333333] text-sm font-semibold">Password<span className="text-[#ff4d4f] ml-0.5">*</span></span>} 
                    placeholder="Enter your password" 
                    type="password" 
                    inputClassName="bg-[#f0f0f0] border-none text-[#333333] placeholder:text-[#8c8c8c]"
                    rules={[{ required: true, message: 'Please input your Password!' }]} 
                />

                <div className="flex items-center justify-between mb-6 mt-2">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="text-[#333333] select-none text-sm">Remember me</Checkbox>
                    </Form.Item>
                    <Link to="/forget-password" className="text-[#ff4d4f] text-sm font-semibold hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Form.Item className="mb-0">
                    <Button type="primary" htmlType="submit" className="w-full text-base font-bold uppercase tracking-wider" style={{ border: 'none' }}>
                        Login as {role}
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    );
};

export default Login;

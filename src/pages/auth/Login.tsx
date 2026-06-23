import { Button, Checkbox, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setToLocalStorage } from '../../utils/localStorage';
import { FormInput } from '../../components/ui/FormInput';
import AuthLayout from '../../components/layout/AuthLayout';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values: { email: string, password: string }) => {
        console.log("Mock logging in with email:", values.email);
        Swal.fire({
            title: "Login Successful",
            text: "Welcome to Admin Dashboard",
            icon: "success",
            timer: 1200,
            showConfirmButton: false
        }).then(() => {                
            setToLocalStorage("accessToken", "dummy-access-token-12345");
            navigate("/");
            window.location.reload();
        });
    };

    return (
        <AuthLayout>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">Welcome!</h1>
                <h2 className="text-xl font-medium text-[#f1cdd2] mb-4">to Admin Dashboard.</h2>
                <p className="text-sm text-[#b7868b] leading-relaxed max-w-[340px] mx-auto">
                    Please sign in to access your admin dashboard and manage your platform securely
                </p>
            </div>

            <Form name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                <FormInput 
                    name="email" 
                    label={<span className="text-white text-sm font-semibold">Email<span className="text-red-400 ml-0.5">*</span></span>} 
                    placeholder="Enter your email" 
                    type="text" 
                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email address!' }]} 
                />
                
                <FormInput 
                    name="password" 
                    label={<span className="text-white text-sm font-semibold">Password<span className="text-red-400 ml-0.5">*</span></span>} 
                    placeholder="Enter your password" 
                    type="password" 
                    rules={[{ required: true, message: 'Please input your Password!' }]} 
                />

                <div className="flex items-center justify-between mb-8 mt-2">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="text-white select-none text-sm">Remember me</Checkbox>
                    </Form.Item>
                    <Link to="/forget-password" className="text-[#e57373] text-sm font-medium hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Form.Item className="mb-0">
                    <Button type="primary" htmlType="submit" className="w-full text-base font-bold uppercase tracking-wider" style={{ border: '1px solid #7d1522' }}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </AuthLayout>
    );
};

export default Login;

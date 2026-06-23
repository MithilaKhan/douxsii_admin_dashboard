import { Button, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FormInput } from '../../components/ui/FormInput';
import AuthLayout from '../../components/layout/AuthLayout';

const NewPassword = () => {
    const navigate = useNavigate(); 

    const onFinish = async (values: { password: string, confirmPassword: string }) => {
        console.log("Mock updating password to:", values.password);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Password Updated",
            text: "Your password has been reset successfully.",
            timer: 1200,
            showConfirmButton: false
        }).then(() => {
            navigate("/login");
        });
    }

    return (
        <AuthLayout>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-white mb-4">Set a Password</h1>
                <p className="text-sm text-[#b7868b] leading-relaxed max-w-[360px] mx-auto">
                    Your previous password has been reset. Please set a new password for your account.
                </p>
            </div>

            <Form name="new_password" layout="vertical" onFinish={onFinish}>
                <FormInput 
                    name="password" 
                    label={<span className="text-white text-sm font-semibold">Create Password</span>} 
                    placeholder="Enter New password" 
                    type="password" 
                    rules={[
                        { required: true, message: "Please input your new Password!" },
                        { min: 8, message: "Password must be at least 8 characters!" }
                    ]} 
                />

                <FormInput 
                    name="confirmPassword" 
                    label={<span className="text-white text-sm font-semibold">Re-enter Password</span>} 
                    placeholder="Confirm password" 
                    type="password" 
                    dependencies={["password"]} 
                    rules={[
                        { required: true, message: "Please confirm your password!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("The passwords do not match!"));
                            }
                        })
                    ]} 
                />

                <Form.Item className="mb-4 mt-6">
                    <Button type="primary" htmlType="submit" className="w-full text-base font-semibold" style={{ border: '1px solid #7d1522' }}>
                        Reset Password
                    </Button>
                </Form.Item>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-white text-sm hover:underline hover:text-gray-200">
                        Back to login
                    </Link>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default NewPassword;

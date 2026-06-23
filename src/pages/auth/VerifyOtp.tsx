import { Button, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorage';
import { FormInput } from '../../components/ui/FormInput';
import AuthLayout from '../../components/layout/AuthLayout';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const email = getFromLocalStorage("email");
    const userEmail = email ? JSON.parse(email) : "your email";

    const handleResendEmail = () => {
        Swal.fire({
            title: "OTP Resent",
            text: `A new 4-digit code has been sent to ${userEmail}`,
            icon: "success",
            timer: 1200,
            showConfirmButton: false
        });
    };

    const onFinish = async (values: { otp: string }) => {
        console.log("Mock verifying OTP:", values.otp);
        Swal.fire({
            text: "OTP Verified Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
        }).then(() => { 
            setToLocalStorage("resetToken", "dummy-reset-token-56789");
            navigate("/new-password");
        });
    };

    return (
        <AuthLayout>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-white mb-4">Verify Code</h1>
                <p className="text-sm text-[#b7868b] leading-relaxed max-w-[340px] mx-auto">
                    An Authentication code has been sent to your email
                </p>
            </div>

            <Form name="verify_otp" layout="vertical" onFinish={onFinish}>
                <FormInput 
                    name="otp" 
                    label={<span className="text-white text-sm font-semibold">Enter Code</span>} 
                    placeholder="Enter verification code" 
                    type="password" 
                    rules={[{ required: true, message: 'Please input code here!' }]} 
                />

                <div className="text-sm flex items-center justify-start gap-1 mb-8 mt-1">
                    <span className="text-[#b7868b]">Didn't receive a code?</span>
                    <button 
                        type="button" 
                        className="text-[#e57373] font-bold hover:underline" 
                        onClick={handleResendEmail}
                    >
                        Resend
                    </button>
                </div>

                <Form.Item className="mb-4">
                    <Button type="primary" htmlType="submit" className="w-full text-base font-semibold" style={{ border: '1px solid #7d1522' }}>
                        Next
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

export default VerifyOtp;

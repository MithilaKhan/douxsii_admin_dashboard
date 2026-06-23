import { Form, Button } from 'antd';
import Swal from 'sweetalert2';
import { FormInput } from '../../components/ui/FormInput';

const ChangePassword = () => {
    const [form] = Form.useForm();

    const handleChangePassword = async (values: any) => {
        console.log("Mock change password requested:", values);
        Swal.fire({ title: "Success", text: "Password updated successfully!", icon: "success", timer: 1200, showConfirmButton: false })
            .then(() => form.resetFields());
    };   

    return (
        <div className="max-w-lg mx-auto py-4">
            <Form form={form} layout="vertical" onFinish={handleChangePassword}>
                <FormInput name="currentPassword" label={<span className="block text-white/80 font-medium text-base mb-1">Current Password</span>} type="password" rules={[{ required: true, message: 'Please input Current password!' }]} />
                <FormInput name="newPassword" label={<span className="block text-white/80 font-medium text-base mb-1">New Password</span>} type="password" rules={[{ required: true, message: "Please input your New password!" }, { min: 8, message: "Password must be at least 8 characters long!" }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('currentPassword') !== value) return Promise.resolve(); return Promise.reject(new Error('The New password cannot be the same as the current Password')); } })]} />
                <FormInput name="confirmPassword" label={<span className="block text-white/80 font-medium text-base mb-1">Confirm Password</span>} type="password" dependencies={['newPassword']} rules={[{ required: true, message: "Please input your Confirm password!" }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('newPassword') === value) return Promise.resolve(); return Promise.reject(new Error('The passwords do not match!')); } })]} />

                <Form.Item className="flex justify-center mt-6">
                    <Button 
                        style={{ 
                            height: 44, 
                            borderRadius: '8px', 
                            fontWeight: 600, 
                            paddingLeft: '32px', 
                            paddingRight: '32px',
                            background: '#560e18',
                            borderColor: 'transparent',
                            color: '#ffffff'
                        }} 
                        type="primary" 
                        htmlType="submit"
                    >
                        Save Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;

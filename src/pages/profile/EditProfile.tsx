import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { UserContext, DUMMY_USER } from '../../providers/UserProvider';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { setToLocalStorage } from '../../utils/localStorage';
import { FormInput } from '../../components/ui/FormInput';

const EditProfile: React.FC = () => {
    const user = useContext(UserContext) || DUMMY_USER;
    const [profileForm] = Form.useForm();
    const [imgURL, setImgURL] = useState("");

    useEffect(() => {
        if (user) {
            profileForm.setFieldsValue({ name: user.name, email: user.email });
            setImgURL(user.image || "/user.svg");
        }
    }, [profileForm, user]);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImgURL(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const onProfileFinish = async (values: { name: string, email: string }) => {
        const updatedUser = { ...user, name: values.name, email: values.email, image: imgURL || user.image };
        setToLocalStorage("userData", JSON.stringify(updatedUser));
        Swal.fire({ text: "Profile updated successfully!", icon: "success", timer: 1200, showConfirmButton: false })
            .then(() => window.location.reload());
    }

    return (
        <div className="max-w-lg mx-auto py-4">
            <Form name="update_profile" layout="vertical" onFinish={onProfileFinish} form={profileForm}>
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <input onChange={onChange} type="file" id="img" accept="image/*" style={{ display: 'none' }} />
                        <label htmlFor="img" className="relative block w-28 h-28 cursor-pointer rounded-full bg-cover bg-center border-4 border-white/10 shadow-sm" style={{ backgroundImage: `url(${imgURL})` }}>
                            <div 
                                className="absolute bottom-0 right-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shadow-sm"
                                style={{ background: '#560e18' }}
                            >
                                <AiOutlineEdit size={18} className="text-white" />
                            </div>
                        </label>
                    </div>
                </div>

                <FormInput name="name" label={<span className="block text-white/80 font-medium text-base mb-1">Full Name</span>} placeholder="Enter your name" rules={[{ required: true, message: 'Please input your full name!' }]} />
                <FormInput name="email" label={<span className="block text-white/80 font-medium text-base mb-1">Email</span>} placeholder="Enter your email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]} />

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
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;

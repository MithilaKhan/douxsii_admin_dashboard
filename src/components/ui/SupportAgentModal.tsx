import { useEffect, useRef, useState } from 'react';
import { Modal, Form, ConfigProvider } from 'antd';
import { FiCamera } from 'react-icons/fi';
import { SupportAgent } from '../../pages/support-team/support.types';
import ModalHeader from './ModalHeader';
import { FormInput } from './FormInput';

interface SupportAgentModalProps {
    open: boolean;
    editingAgent: SupportAgent | null;
    onClose: () => void;
    onSubmit: (values: AgentFormValues, avatar: string | null) => void;
}

export interface AgentFormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: SupportAgent['role'];
}

const ROLE_OPTIONS = [
    { value: 'Support Agent', label: 'Support Agent' },
    { value: 'Senior Agent',  label: 'Senior Agent' },
    { value: 'Team Lead',     label: 'Team Lead' },
];

const fieldLabel = (text: string) => (
    <span className="text-white text-sm font-medium">{text}</span>
);

export const SupportAgentModal = ({ open, editingAgent, onClose, onSubmit }: SupportAgentModalProps) => {
    const [form] = Form.useForm();
    const fileRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            form.setFieldsValue(
                editingAgent
                    ? { name: editingAgent.name, email: editingAgent.email, phone: editingAgent.phone, password: '', role: editingAgent.role }
                    : { name: '', email: '', phone: '', password: '', role: 'Support Agent' }
            );
            setAvatarPreview(editingAgent?.avatar ?? null);
        }
    }, [open, editingAgent, form]);

    const handleClose = () => {
        form.resetFields();
        setAvatarPreview(null);
        onClose();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarPreview(url);
        }
    };

    const handleFinish = (values: AgentFormValues) => {
        onSubmit(values, avatarPreview);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            closeIcon={null}
            centered
            width={500}
            styles={{
                content: {
                    background: '#46000B',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    padding: 24,
                },
                mask: {
                    backdropFilter: 'blur(4px)',
                    background: 'rgba(0,0,0,0.55)',
                },
            }}
        >
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#560e18',
                        colorText: '#ffffff',
                        colorTextPlaceholder: '#b7868b',
                        colorBorder: 'transparent',
                        borderRadius: 10,
                    },
                    components: {
                        Input: {
                            activeBorderColor: '#b02636',
                            hoverBorderColor: '#7a101b',
                            colorBgContainer: '#560e18',
                            colorText: '#ffffff',
                            colorTextPlaceholder: '#b7868b',
                        },
                        Select: {
                            colorBgContainer: '#560e18',
                            colorText: '#ffffff',
                            colorTextPlaceholder: '#b7868b',
                            optionSelectedBg: '#7a101b',
                            colorBgElevated: '#46000B',
                        },
                    },
                }}
            >
                <div className="flex flex-col gap-5">
                    <ModalHeader
                        title={editingAgent ? 'Edit Agent' : 'Add New Agent'}
                        onClose={handleClose}
                    />

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-20 h-20">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ff4b72]/30 bg-[#560e18] flex items-center justify-center">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white text-3xl font-bold">
                                        {editingAgent?.name?.charAt(0) ?? '?'}
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer border-0 outline-none"
                                style={{ background: '#ff2150' }}
                            >
                                <FiCamera size={12} color="#fff" />
                            </button>
                        </div>
                        <span className="text-white/40 text-xs">Upload profile photo</span>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </div>

                    {/* Form */}
                    <Form form={form} layout="vertical" onFinish={handleFinish} className="flex flex-col gap-1">
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="name"  label={fieldLabel('Full Name')}    placeholder="James Don"          rules={[{ required: true, message: 'Required' }]} />
                            <FormInput name="email" label={fieldLabel('Email')}         placeholder="emily@gmail.com"    rules={[{ required: true, message: 'Required' }, { type: 'email', message: 'Invalid email' }]} type="email" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="phone"    label={fieldLabel('Phone Number')} placeholder="James Don"       rules={[{ required: true, message: 'Required' }]} />
                            <FormInput name="password" label={fieldLabel('Password')}     placeholder="emily@gmail.com" rules={editingAgent ? [] : [{ required: true, message: 'Required' }]} type="password" />
                        </div>

                        {/* Role select */}
                        <Form.Item name="role" label={fieldLabel('Role')} rules={[{ required: true }]}>
                            <select
                                className="w-full h-12 px-4 rounded-xl text-white text-sm font-medium appearance-none cursor-pointer outline-none border-0"
                                style={{ background: '#560e18' }}
                            >
                                {ROLE_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value} style={{ background: '#46000B' }}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </Form.Item>

                        <button
                            type="submit"
                            className="w-full h-12 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer border-0 outline-none mt-1"
                            style={{ background: '#7a0015' }}
                        >
                            {editingAgent ? 'Update Agent' : 'Create Agent'}
                        </button>
                    </Form>
                </div>
            </ConfigProvider>
        </Modal>
    );
};

export default SupportAgentModal;

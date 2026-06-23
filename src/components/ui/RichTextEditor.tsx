import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    height?: number;
}

const RichTextEditor = ({ value, onChange, height = 500 }: RichTextEditorProps) => {
    const editor = useRef(null);

    const config = useMemo(() => ({
        height,
        theme: 'dark',
        readonly: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        toolbarAdaptive: false,
        style: {
            background: '#2a0008',
            color: '#ffffff',
        },
        editorStyle: {
            background: '#2a0008',
            color: '#ffffff',
        },
    }), [height]);

    return (
        <div className="jodit-theme-dark">
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onBlur={(newContent) => onChange(newContent)}
            />
        </div>
    );
};

export default RichTextEditor;

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CustomQuill({ handleChange, value }) {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'code-block'],
            ['clean'],
        ],

    };
    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'link', 'image', 'code-block'
    ];
    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={handleChange}
        />
    )
}

export default CustomQuill; 
import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";

import React, { useRef } from "react";

export default function FileUpload() {

    const fileElement = useRef(null);

    const sendFile = async () => {
        const formData = new FormData();
        for (const file of fileElement.current.files) {
            formData.append('file', file);
        }
        console.log('formData');
        console.log(formData);
        const res = await fetch(`http://localhost:8080/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            <input type="file" ref={fileElement} />
            <button onClick={sendFile}>Send file</button>
        </div>
    );
}

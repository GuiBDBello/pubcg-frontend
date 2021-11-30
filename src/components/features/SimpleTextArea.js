import React, { useState } from "react";
import tw from "twin.macro";

const TextArea = tw.textarea`w-full px-8 py-4 rounded-lg font-medium 
bg-gray-100 border-2 border-gray-200 placeholder-gray-500 text-sm 
focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0 
transition duration-300 hocus:border-primary-500`;

export default function SimpleTextArea(props) {

    const [text, setText] = useState("");

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <TextArea
            type="textarea"
            name="textValue"
            value={text}
            onChange={handleChange}
            placeholder={props.placeholder}
            rows={5}
        />
    );
}

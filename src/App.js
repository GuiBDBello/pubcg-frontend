import './App.css';
import { useRef } from 'react';

function App() {
  const fileElement = useRef(null);

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of fileElement.current.files) {
      dataForm.append('file', file);
    }
    const res = await fetch(`http://localhost:8080/upload`, {
      method: 'POST',
      body: dataForm,
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

export default App;

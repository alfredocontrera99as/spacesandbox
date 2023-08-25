import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react-improve'

function App() {
  const { editor, onReady } = useFabricJSEditor()
  const [color, setColor] = useState("#ffffff");
  const changeColor = (e) => {
    setColor(e.target.value)
    editor?.setFillColor(color)
  }
  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle();
    
  }
  const onAddTriangle = () => {
    editor.addTriangle();
  }
  const deleteSelected = () => {
    editor?.deleteSelected();
  }

  useEffect(() => {
    const deleteElements = () => {
      editor.deleteSelected();
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Delete') {
        deleteElements();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
  return (
    <div className="App" >
      <Nav
        className='bg-black p-2'
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item className=' bg-white rounded m-1'>
          <Nav.Link onClick={onAddCircle}>Circle</Nav.Link>
        </Nav.Item>
        <Nav.Item className=' bg-white rounded m-1'>
          <Nav.Link onClick={onAddRectangle}>Rect</Nav.Link>
        </Nav.Item>
        <Nav.Item className=' bg-white rounded m-1'>
          <Nav.Link onClick={onAddTriangle}>Triangle</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={deleteSelected}>
          <Nav.Link >
            Delete1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='bg-white rounded p-2 d-flex flex-row justify-content-center align-items-center' >
          <h5 className='m-1'>
            Color
          </h5>
          <input type="color" value={color} onInput={changeColor}/>
        </Nav.Item>
      </Nav>

      <FabricJSCanvas className='canvas' onReady={onReady} />
    </div>
  );
}

export default App;

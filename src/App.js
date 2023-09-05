import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import { useState, useRef, useEffect } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react-improve'
import OpenButton from './components/OpenButton/OpenButton';
import { AiOutlineTool, AiFillProfile } from 'react-icons/ai'
import PlayButton from './components/PlayButton/PlayButton';
import Menu from './components/Menu/Menu';
import useDeleteSelectedOnKeyPress from './hooks/useDeleteSelectedOnKeyPress';
import { BsCircle, BsFillCircleFill, BsTriangle, BsSquare, BsZoomIn, BsZoomOut, BsTrashFill } from 'react-icons/bs';
import { TbAbc } from "react-icons/tb";
import MenuButton from './components/MenuButtton/MenuButton';
import ColorTable from './components/ColorTable/ColorTable';
import ZIndexInput from './components/ZIndexInput/ZIndexInput';
import { saveAs } from 'file-saver';
import { json } from 'react-router-dom';
import AudioManager from './components/AudioManager/AudioManager';

// import { useMobileOrientation } from 'react-device-detect';
function App() {
  // const { isLandscape } = useMobileOrientation()

  const { editor, onReady, selectedObjects } = useFabricJSEditor()
  const [play, setPlay] = useState(false);
  const [index, setIndex] = useState(0)
  const [name, setName] = useState("Nombre composicion");
  const [playList, setPlayList] = useState([])
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const openToolbar = () => { setToolbarOpen((toolbarOpen) => !toolbarOpen) }
  const openProperties = () => { setPropertiesOpen((propertiesOpen) => !propertiesOpen) }
  const [selectTool, setSelectedTool] = useState("CIRCLE_WHITE");
  const [jsonData, setJsonData] = useState(null);
  const fileInputRef = useRef(null);
  // this effect adds a shorcut for delete key
  useDeleteSelectedOnKeyPress(editor)
  const cleanCanvas = () => {
    editor?.deleteAll();
    setName("Nueva Composicion 1")
  }
  const changeColor = (color) => {
    editor?.setFillColor(color)
  }

  const bringForward = () => {
    editor?.moveForward();
  }
  const bringBack = () => {
    editor?.sendBack();
  }

  const changeSelectedTool = (text) => {
    if (selectTool !== text) {
      setSelectedTool(text)
    } else {
      setSelectedTool("")

    }
  }
  const doFunction = (e) => {
    if (selectedObjects.length === 0) {

      switch (selectTool) {
        case "CIRCLE":
          editor?.addCircle({ left: e.clientX - 80, top: e.clientY - 160, width: 80, height: 80, radius: 80, angle: 0 });
          setPlayList((list) => [...list, editor?.fillColor]);
          break;
        case "CIRCLE_WHITE":
          editor?.addCircle({ left: e.clientX - 40, top: e.clientY - 90, width: 80, height: 80, radius: 80, angle: 0 }, { type: "CIRCLE_WHITE" });
          setPlayList((list) => [...list, editor?.fillColor]);
          break;
        case "RECT":
          editor?.addRectangle({ left: e.clientX - 40, top: e.clientY - 90, width: 80, height: 80, angle: 0 });
          setPlayList((list) => [...list, editor?.fillColor]);
          break;
        case "TRIANGLE":
          editor?.addTriangle({ left: e.clientX - 40, top: e.clientY - 90, width: 80, height: 80, angle: 0 });
          setPlayList((list) => [...list, editor?.fillColor]);
          break;
        case "TEXT":
          editor?.addText({});
          setPlayList((list) => [...list, editor?.fillColor]);
          break;
        default:
          break;
      }
    }
  }
  const changeName = (e) => {
    setName(e.target.value)
  }
  const downloadJSON = () => {
    const jsonData = JSON.stringify(editor?.toJSON(), null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    if (name.length > 0) {
      saveAs(blob, `${name}.json`);
    } else {
      saveAs(blob, 'composicion_1.json');

    }
  };
  const openFileDialog = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        const parsedData = await JSON.parse(content);
        setJsonData(parsedData)
      };
      reader.readAsText(file);
    }
  };
  useEffect(() => {
    editor?.loadJSON(jsonData)
  }, [jsonData])
  return (
    <div className="App" >
      <Nav
        className='bg-black d-flex justify-content-between'
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >

        <OpenButton Icon={AiOutlineTool} condition={toolbarOpen} changeFunction={openToolbar} altDescription="Abrir Barra de Herramientas" title="Cerrar Barra de Herramientas" />
        <div className='w-75 d-flex justify-content-start  align-items-center '>
          <input className=' file-button bg-transparent text-white border-0 h5 me-3 my-1' type="text" value={name} onChange={changeName}></input>
          <button onClick={cleanCanvas} className='bg-transparent text-white border-0 h5 me-3 my-1 p-1' title="Crear nueva composicion">Nueva</button>
          <label htmlFor="fileInput">
            <button onClick={openFileDialog} className='bg-transparent text-white border-0 h5 me-3 my-1 p-1' title="Abrir una composicion">Abrir</button>
            <input
              type="file"
              id="fileInput"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          <button onClick={downloadJSON} className='bg-transparent text-white border-0 h5 me-3 my-1 p-1' title="Descargar composicion">Descargar</button>
          <PlayButton changeFunction={setPlay} setIndex={setIndex} condition={play} title="Pausar Composicion" altDescription="Reproducir Composicion" />
        </div>
        <OpenButton Icon={AiFillProfile} condition={propertiesOpen} changeFunction={openProperties} altDescription="Abrir menú de propiedades" title="Cerrar menú de propiedades" />
      </Nav>
      <div onClick={doFunction}>
        <FabricJSCanvas className='canvas' onReady={onReady} />
      </div>
      {
        toolbarOpen ?
          <Menu show={toolbarOpen} toggleShow={openToolbar} title="Barra de Herramientas" >
            <div className='d-flex flex-column justify-content-start align-items-baseline w-100  h-100'>
              <div className='text-dark h-25 w-100 p-2 d-flex flex-column'>
                <h5 className='p-1'>Formas</h5>
                <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                  <MenuButton onClick={() => {
                    editor.setFillColor("rgb(255,255,255,1)")
                    changeSelectedTool("CIRCLE_WHITE")
                  }} selected={selectTool === "CIRCLE_WHITE"}>
                    <BsCircle size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => {
                    editor.setFillColor("rgb(255,0,0,1)")
                    changeSelectedTool("CIRCLE")
                  }} selected={selectTool === "CIRCLE"}>
                    <BsFillCircleFill size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => {
                    if(selectedObjects.length == 0 ){
                      editor.setFillColor("rgb(255,0,0,1)")
                    }else{
                    }
                    changeSelectedTool("TRIANGLE")
                  }} selected={selectTool === "TRIANGLE"}>
                    <BsTriangle size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => {
                    editor.setFillColor("rgb(255,0,0,1)")
                    changeSelectedTool("RECT")
                  }} selected={selectTool === "RECT"}>
                    <BsSquare size={40} />
                  </MenuButton>
                </div>
              </div>
              <div className='text-dark h-25 w-100 p-2 d-flex flex-column'>
                <h5 className='p-1'>Otras</h5>
                <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                  <MenuButton onClick={() => changeSelectedTool("TEXT")} selected={selectTool === "TEXT"}>
                    <TbAbc size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => editor?.zoomIn()}>
                    <BsZoomIn size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => editor?.zoomOut()} >
                    <BsZoomOut size={40} />
                  </MenuButton>
                  <MenuButton onClick={() => editor?.deleteSelected()}>
                    <BsTrashFill size={40} />
                  </MenuButton>

                </div>
              </div>
            </div>
          </Menu>
          : null
      }
      {
        propertiesOpen ?
          <Menu show={propertiesOpen} placement="end" toggleShow={openProperties} title="Propiedades" >
            <div className='d-flex flex-column gap-3  justify-content-start align-items-baseline w-100  h-100'>
              {selectedObjects[0]?.optional.type !== "CIRCLE_WHITE" && selectedObjects[0]
                ?
                <div className='bg-white rounded text-dark h-25 w-100 p-2 d-flex flex-column'>
                  <h5 className='p-1'>Colores</h5>
                  <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                    <ColorTable changeColor={changeColor} />
                  </div>
                </div>
                :
                null
              }
              {selectedObjects[0]
                ?
                <div className='bg-white rounded text-dark h-25 w-100 p-2 d-flex flex-column'>

                  <h5>Z-Index</h5>
                  <div className='h-100 w-100 p-2 d-flex flex-row  gap-3 '>
                    <ZIndexInput index={editor?.getIndex(selectedObjects[0])} bringBack={bringBack} bringForward={bringForward} />
                  </div>
                </div>
                : null
              }
            </div>
          </Menu>
          :
          null
      }
      <AudioManager list={playList} index={index} setIndex={setIndex} play={play} length={playList.length} changeFunction={setPlay} />
    </div>
  );
}

export default App;

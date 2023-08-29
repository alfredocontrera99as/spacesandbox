import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const disable = {
  name: 'Disable backdrop',
  scroll: false,
  backdrop: true,
}
function Backdrop ({name,show,toggleShow, title, placement = "start", children, ...props}) {
  const clicked = (e) => {
    e.stopPropagation();
  }
  return (
    <>
      <div onClick={clicked}>
      <Offcanvas className="bg-info text-white" show={show} placement={placement} onHide={toggleShow} scroll={false} backdrop={false} style={{marginTop: "6vh", height: "94vh"}} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{minHeight: "280px"}}>
            {children}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
    </>)
}

const Menu = ({show, toggleShow, title, placement, children}) => {
  return (
    <Backdrop show={show} title={title} placement={placement} children={children} toggleShow={toggleShow} props={disable}></Backdrop>
  )
}

export default Menu

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//How Implement Compound Component using Context API
//1.Create a Context
const ModalContext = createContext()

//2.Create Parent Component
function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  // cross or close symbol button 
  const close = () => {
    setOpenName("")
  }
  // open window
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }} >
      {children}
    </ModalContext.Provider>
  )
}

//3.Create Child components to help implementing the common task
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return (
    //const clonedElement = cloneElement(element, props, ...children)
    cloneElement(children, {
      onClick: () => open
        (opensWindowName)
    })
  )


}


function Window({ children, name, onClose }) {
  const { openName, close } = useContext(ModalContext);

  // const ref = useRef();

  // useEffect(() => {
  //   function handleClick(e) {

  //     if(ref.current && !ref.current.contains(e.target))
  //     {
  //       //Click Outside and then Form Window close
  //       console.log("Click Outside");        
  //       close();
  //     }
  //   };

  //   document.addEventListener("click", handleClick , true);

  //   return () => document.removeEventListener("click", handleClick , true);
    
  // }, [close]);

  const ref = useOutsideClick(close);




  if (name !== openName) return null;

  // createPortal --> use DOM in react[a DOM structure in outside]
  return createPortal(

    //Overlay means blur outside.
    <Overlay>

      <StyledModal ref={ref}>
        {/*-------------------cross or close symbol button OR CLOSE THE MODAL-------------------*/}
        <Button onClick={close} ><HiXMark /></Button>
        <div>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </StyledModal>

    </Overlay>,

    //modal window is direct child window of body element
    document.body

  )
}
//4.Add child components as properties to parent component
Modal.Open = Open;
Modal.Window = Window;







//new model window for Add new cabin form
// function Modal({children , onClose})
// {
//   //Overlay means blur outside. createPortal --> use DOM in react[a DOM struchture in outside]
//  return createPortal(

//   <Overlay>
//   <StyledModal>
//     {/* cross or close symbol button */}
//     <Button onClick={onClose} ><HiXMark/></Button>
//     <div>
//       {children}
//     </div>
//   </StyledModal>
//   </Overlay>,

//   //modal window is direct child window of body element
//   document.body

//  )
// }
export default Modal;
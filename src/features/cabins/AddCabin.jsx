import Modal from "../../ui/Modal";
//import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../../ui/Button";

import CreateCabinForm from "./CreateCabinForm";
//import CabinTable from "./CabinTable";

// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal((show) => !show)}  >Add new cabin</Button>
//             {/* CreateCabinForm after the Add new cabin button */}
//             {/* {isOpenModal && <CreateCabinForm />} */}
//             {isOpenModal &&
//             (
//                 // close form after click cross button
//                 <Modal onClose={() => setIsOpenModal(false)} >

//                     {/* close form after cancel button */}
//                     <CreateCabinForm  onCloseModal={() => setIsOpenModal(false)}  />

//                 </Modal>

//             )}
//         </div>
//     );
// }

//-----------CONVERTING MODEL USING COMPOUND COMPONENT---------//

function AddCabin() {
    return (
       <div>
         <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>


           

                {/* <Modal.Open opens="table">
                    <Button>Show Table</Button>
                </Modal.Open>
                <Modal.Window name="table">
                    <CabinTable />
                </Modal.Window> */}
            

        </Modal>
       </div>
    )
}
export default AddCabin;
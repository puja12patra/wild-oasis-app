import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

//import { useState } from "react";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


function CabinRow({ cabin }) {

  //const [showForm, setShowForm] = useState(false);


  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image
  } = cabin

  //--------------FOR DUPLICATE CABIN WE NEED TO COPY THE CABIN'S OBJECT DATA---------------//
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image
    })
  }

  //MAKE THE DELETE BUTTON WORK FOR DELETE EACH ROW 
  // const queryClient = useQueryClient();

  // const { isLoading: isDeleting, mutate } = useMutation({
  //   mutationFn: deleteCabin,
  //   //when mutation successful then ReactQuery provide onSuccess
  //   onSuccess: () => {
  //     toast.success('Cabin successfully deleted')
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],

  //     })
  //   },
  //   onError: (err) => {
  //     toast.error(err.message)
  //   }
  // })

  //NOW USE CUSTOMHOOKS useDeleteCabin FOR DELETE Cabin
  const { isDeleting, deleteCabin } = useDeleteCabin();


  return (


    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {/* <Discount>{formatCurrency(discount)}</Discount> */}
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}


      <div>
        {/*-------------------Copy/ Duplicate cabin Button----------------- */}
        {/* <button  disabled={isCreating} ><HiSquare2Stack /></button> */}


        <Modal>

          {/******************FULL TABLE MENU[LIsts of elements opening after clicking button]******************  */}
          <Menus.Menu>

           {/* OPEN AND CLOSE MENU / TOGGLING */}
           <Menus.Toggle id={cabinId} />


           {/* LISTS OR BUNCH / BUTTONS */}
          <Menus.List id={cabinId} >

             <Menus.Button icon={<HiSquare2Stack/>} onClick={handleDuplicate} disabled={isCreating} > Copy </Menus.Button>
            
              {/* ---------------------------------- EDIT --------------------------------------*/}
          <Modal.Open opens="edit">
            {/*------------------- Edit cabin Button----------------- */}
            {/* <button onClick={() => setShowForm((show) => !show)} ><HiPencil /></button> */}
            {/* <button><HiPencil /></button> */}
             <Menus.Button icon={<HiPencil/>} > Edit </Menus.Button>
          </Modal.Open>
            

           {/* ----------------------------------DELETE--------------------------------------*/}
          <Modal.Open opens="delete">
            {/* useMutation hook, are necessary when performing operations that modify data on a server or have side effects */}
            {/*------------------- Delete cabin Button----------------- */}
            {/* <button onClick={() => mutate(cabinId)} disabled={isDeleting} >Delete</button> */}
            {/* <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting} ><HiTrash /></button> */}
            {/* <button><HiTrash /></button> */}
             <Menus.Button icon={<HiTrash/>} > Delete </Menus.Button>

          </Modal.Open>

           

          </Menus.List>

           {/* FOR EDIT */}
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

         {/* FOR DELETE */}
          <Modal.Window name="delete">
            {/*1ST ASK TO CONFIRM THEN ONLY CLICK TO DELETE --->ConfirmDelete.jsx */}
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}

              onConfirm={() => {
                //console.log("Deleting cabinId:", cabinId);
                deleteCabin(cabinId)
              }}
            />
          </Modal.Window>


           </Menus.Menu> 

        </Modal>


          {/******************FULL TABLE MENU[LIsts of elements opening after clicking button]******************  */}
        
        


      </div>
    </Table.Row>

    //  {showForm && <CreateCabinForm cabinToEdit={cabin} />} 


  );
}
export default CabinRow;






// {/***********************FULL TABLE MENU[LIsts of elements opening after clicking button]******************  */}
//         <Menus.Menu>

//           {/* OPEN AND CLOSE MENU / TOGGLING */}
//           <Menus.Toggle id={cabinId} />


//           {/* LISTS OR BUNCH / BUTTONS */}
//           <Menus.List id={cabinId} >
//             <Menus.Button icon={<HiSquare2Stack/>} onClick={handleDuplicate} > Copy </Menus.Button>
            

//             <Menus.Button icon={<HiPencil/>} > Edit </Menus.Button>

//             <Menus.Button icon={<HiTrash/>} > Delete </Menus.Button>
//           </Menus.List>


//         </Menus.Menu> 
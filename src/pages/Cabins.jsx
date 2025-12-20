
import Heading from "../ui/Heading";
import Row from "../ui/Row";
//import Button from "../ui/Button";

//import {getCabins} from "../../services/apiCabins";

import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
//import CreateCabinForm from "../features/cabins/CreateCabinForm";
//import { useState } from "react";

function Cabins() {

  //as soon as page loads it fetch the data from supabase
  // useEffect( () =>{
  //  getCabins().then((data) => console.log(data));
  // }, []);
  //INSTEAD OF MANUALLY FETCHING DATA USING USEEFFECT, WE NOW USE REACTQUERY FROM CABINTABLE WE CREATE TABLE


  //const [showForm, setShowForm] = useState(false);


  return (
    <>
    
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      {/* <p>Filter / Sort</p> */}
      <CabinTableOperations />

      {/* <img src="https://ptblboatccgsccmniktl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"/> */}
    </Row>

    <Row>
      <CabinTable/>
    </Row>
   
   
    {/* <Button onClick={() => setShowForm( (show) => !show)}  >Add new cabin</Button> */}
    {/* CreateCabinForm after the Add new cabin button */}
    {/* {showForm && <CreateCabinForm/>} */}
    
    <AddCabin/>
    
    </>
  );
}

export default Cabins;

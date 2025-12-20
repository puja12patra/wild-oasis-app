

import Spinner from "../../ui/Spinner";

//import styled from "styled-components";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;


function CabinTable() {

  // //REACT QUERY FOR FETCH DATA::
  // const {isLoading, data: cabins, error, } = useQuery({
  //   queryKey: ["cabins"],//cabins is Table and it is usniquely identified 
  //   queryFn: getCabins, //From apiCabins , the getCabins will fetch full data of cabins 
  // })
  //USE CUSTOM HOOK useCabins



  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  //1. 1st Load data
  if (isLoading) return <Spinner />


  if (!cabins.length) return <Empty resourceName="bookings" />

  //1.---------------FILTER----------------------------//
  const filterValue = searchParams.get('discount') || "all";
  console.log(filterValue);

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);


  //2.-------------------------SORT----------------------------//
  const sortBy = searchParams.get('sortBy') || "startDate-asc";
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier); //a.price - b.price

  console.log(modifier, sortedCabins);


  //RETURN CABIN DATA IN A TABLE FORMAT
  return (
    //NORMAL DATA-->
    // <div>
    // {cabins.map((cabin) => (
    //   JSON.stringify(cabin)
    // ))}
    // </div>

    ///////////////////BUILDING REUSABLE TABLE Under MENU's//////////////////
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header role="row">
          <div>Images</div>
          <div>Cabin ID</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* <Table.Body>
         {cabins.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)}
      </Table.Body> */}
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}

          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />



      </Table>
    </Menus>
  );
}

export default CabinTable;
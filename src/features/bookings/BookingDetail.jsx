import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  //NOW USE CUSTOMHOOKS useDeleteBooking FOR DELETE Booking
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const { checkout, isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  // const booking = {};
  const { isLoading, booking } = useBooking();

  const moveBack = useMoveBack();


  if (isLoading) return <Spinner />
  if(!booking) return <Empty resourceName="booking" />

  //const status = "checked-in";
  const { status, id: bookingId } = booking;



  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };



  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>

          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>

        {/* CHECK-IN BUTTON */}
        {/* //1. Bookings may not have been paid yet on guest arrival, The unconfirmed user, For check in, users need to accept payment and then confirm payment has been recieved
        //2. For check in, guest have ability to add breakfast  */}
        {status === "unconfirmed" && (
          <Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)} >
            Check In
          </Button>
        )}


        {/* CHECKOUT BUTTON */}
        {status === "checked-in" && (
          <Button icon={<HiArrowUpOnSquare />} onClick={() => checkout(bookingId)} disabled={isCheckingOut} >
            Check Out
          </Button>
        )}


        <Modal>

          {/* DELETE BUTTON -[SAME AS DELETE CABIN FROM CABINROW] USE CUSTOM HOOK useDeleteBooking*/}
          <Modal.Open opens="delete">
            <Button variation='danger' > Delete Booking </Button>
          </Modal.Open>


          {/* DELETE MODAL WINDOW */}
          <Modal.Window name="delete">
            {/*1ST ASK TO CONFIRM THEN ONLY CLICK TO DELETE --->ConfirmDelete.jsx */}
            <ConfirmDelete
              // resourceName="booking"
              resourceName="bookings"
              disabled={isDeleting}

              onConfirm={() => {
                //console.log("Deleting cabinId:", cabinId);
                //AS SOON AS BOOKING DELETED WE MOVING BACK navigate(-1)
                deleteBooking(bookingId , {
                  onSettled: ()=> navigate(-1)
                })
              }}
            />
          </Modal.Window>

        </Modal>



        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;






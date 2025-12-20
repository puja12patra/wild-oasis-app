import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  // CHECK OUT
  const { checkout, isCheckingOut } = useCheckout();


  //NOW USE CUSTOMHOOKS useDeleteBooking FOR DELETE Booking
  const { isDeleting, deleteBooking } = useDeleteBooking();



  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>


      {/* WE DON NOT IMMEDIATELY DELETE BOOKING , 1ST WE SHOW MODEL WINDOW TO DELETE THEN ONLY CLICK DELETE BUTTON */}
      <Modal>



        {/* BUILDING SINGLE BOOKING PAGE */}
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId} >

            <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}  >
              See Details
            </Menus.Button>
            {/* CHECK-IN BUTTON */}
            {/* //1. Bookings may not have been paid yet on guest arrival, The unconfirmed user, For check in, users need to accept payment and then confirm payment has been recieved
          //2. For check in, guest have ability to add breakfast  */}

            {status === "unconfirmed" && (
              <Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)} >
                Check In
              </Menus.Button>
            )}

            {/* CHECKOUT BUTTON */}
            {status === "checked-in" && (
              <Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => checkout(bookingId)} disabled={isCheckingOut} >
                Check Out
              </Menus.Button>
            )}

            {/* DELETE BUTTON -[SAME AS DELETE CABIN FROM CABINROW] USE CUSTOM HOOK useDeleteBooking*/}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} > Delete </Menus.Button>
            </Modal.Open>

          </Menus.List>

        </Menus.Menu>

        {/* DELETE MODAL WINDOW */}
        <Modal.Window name="delete">
          {/*1ST ASK TO CONFIRM THEN ONLY CLICK TO DELETE --->ConfirmDelete.jsx */}
          <ConfirmDelete
            // resourceName="booking"
            resourceName="bookings"
            disabled={isDeleting}

            onConfirm={() => {
              //console.log("Deleting cabinId:", cabinId);
              deleteBooking(bookingId)
            }}
          />
        </Modal.Window>


      </Modal>


    </Table.Row>
  );
}

export default BookingRow;

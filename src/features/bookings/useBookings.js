import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  //-----------------FILTER---------------------//
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //------------------SORT-----------------------//
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION LOGIC
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //REACT QUERY FOR FETCH DATA::
  const {
    isLoading,
    data: { data: bookings, count } = {}, //initially data not yet exist So need a default value empty obj ->{}
    error,
  } = useQuery({
    //USING REACT QUERY WE MAKE A DEPENDENCY ARRAY TO STORE DATA IN OUR CACHE
    queryKey: ["bookings", filter, sortBy, page], //Bookings is Table and it is usniquely identified from supabase
    //queryFn: getBookings, //From apiBookings , the getBookings will fetch full data of Bookings
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], //Bookings is Table and it is usniquely identified from supabase
      //queryFn: getBookings, //From apiBookings , the getBookings will fetch full data of Bookings
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });


   if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], //Bookings is Table and it is usniquely identified from supabase
      //queryFn: getBookings, //From apiBookings , the getBookings will fetch full data of Bookings
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });


  return { isLoading, error, bookings, count };
}

import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../../services/apiCabins"





export function useCabins()
{
    //REACT QUERY FOR FETCH DATA::
      const {isLoading, data: cabins, error, } = useQuery({
        queryKey: ["cabins"],//cabins is Table and it is usniquely identified from supabase
        queryFn: getCabins, //From apiCabins , the getCabins will fetch full data of cabins 
      })

      return {isLoading, error, cabins}
}
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";



//CUSTOM HOOK + REACT QUERY
export function useSettings()
{
   const {isLoading, error, data:settings} = useQuery({
     queryKey: ['settings'],//settings is Table and it is usniquely identified from supabase
     queryFn: getSettings,//From apiSettings , the getSettings will fetch full data 
   })

   return {isLoading, error, settings};
}
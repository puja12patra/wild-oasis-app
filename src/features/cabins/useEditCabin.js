import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";




export function useEditCabin()
{
 const queryClient = useQueryClient();
const { mutate: editCabin, isLoading: isEditing } = useMutation({
    //
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    //when mutation successful then ReactQuery provide onSuccess
    onSuccess: () => {
      toast.success('Cabin successfully Edited')
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      //Reset the form 
      //reset();

    },
    onError: (err) => {
      toast.error(err.message)
    }

  })

  return {editCabin , isEditing}
}

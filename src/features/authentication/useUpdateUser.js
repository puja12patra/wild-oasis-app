import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    //
    mutationFn: updateCurrentUser,
    //when mutation successful then ReactQuery provide onSuccess
    onSuccess: ({user}) => {
      console.log(user);

      toast.success("User Account successfully Updated!");
      queryClient.setQueryData(["user"], user);

      //   queryClient.invalidateQueries({
      //     queryKey: ["user"],
      //   });

      //Reset the form
      //reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}

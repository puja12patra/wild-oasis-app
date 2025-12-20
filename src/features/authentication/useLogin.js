//We’re using Supabase Auth: 👉 Supabase already uses JWT internally, you just don’t touch it.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      //REACT QUERY COULD SIMPLY GET THIS DATA FROM THE CACHE, IF WE PU IMMEDIATELY LOGGIN IN
      //TAKE NEWLY LOGGEDIN USER, MANUALLY ADD THEM INTO REACT QUERY CACHE.
      //queryClient.setQueriesData(['user'], user); //setQueriesData updates all queries whose keys partially match ['user'].setQueriesData is not for auth  setQueriesData means: “Update ALL queries whose keys start with ['user']”
      //setQueriesData unintentionally overwrite multiple caches with login response data

      queryClient.setQueryData(["user"], user.user);
      console.log(user);
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email & password are incorrect");
    },
  });

  return { login, isLoading };
}

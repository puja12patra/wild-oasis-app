//We’re using Supabase Auth 👉 Supabase already uses JWT internally, you just don’t touch it.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      //REACT QUERY SOULD REMOVE THIS DATA FROM THE QUERY CACHE AFTER LOGOUT, Otherwise malicious person get data
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { isLoading, logout };
}

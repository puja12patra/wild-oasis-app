import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() 
{
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    //
    // mutationFn: ({ newSettingsData, id }) =>
    //   updateSettingApi(newSettingsData, id),

     mutationFn: updateSettingApi,
    //when mutation successful then ReactQuery provide onSuccess
    onSuccess: () => {
      toast.success("Settings successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      //Reset the form
      //reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  
  return { isUpdating, updateSetting };
}

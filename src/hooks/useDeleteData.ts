import { message } from "antd";
import axios from "axios";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

// Custom hook to delete user data
export const useDeleteData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (id: string) => {
      await axios.delete(`http://localhost:3000/users/${id}`);
    },
    {
      onSuccess: () => {
        message.success("Deleted successfully");
        // Invalidate the cache for 'getCall' so that the data gets refetched
        queryClient.invalidateQueries("getCall");
      },
      onError: () => {
        message.error("Failed to delete the data");
      },
    }
  );

  return mutation;
};

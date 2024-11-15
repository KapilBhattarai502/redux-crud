import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { closeDrawer } from "../features/DrawerSlice/DrawerSlice";
import { useDispatch } from "react-redux";


const queryClient = useQueryClient();

export const usePutData=(updateUserById:any,editingId:any)=>{
    const dispatch=useDispatch();
    return useMutation(
        (updatedData: any) => updateUserById(editingId, updatedData), // The PUT request
        {
          onSuccess: () => {
            message.success('User updated successfully');
            // queryClient.invalidateQueries(['user', editingId]);
            queryClient.invalidateQueries('getCall');
    
             // Invalidate the query and refetch the data
             dispatch(closeDrawer());
          },
          onError: () => {
            message.error('Failed to update user');
          },
        }
      );
}
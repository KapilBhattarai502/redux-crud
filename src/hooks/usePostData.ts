import axios from "axios"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"


const post= async (payload: any) => {
    try {
      const response = await axios.post(`http://localhost:3000/users`, payload)
      return response.data
    } catch (error: any) {
      throw new Error(`${error.response.data.message}`)
    }
  }
  
  const usePost = () => {
    const queryClient =useQueryClient()
  
    return useMutation((payload: any) => post(payload), {
      onSuccess: async (response) => {
        // if (response?.resCod == 200) {
          toast.success("Successfull!!")
                 queryClient.invalidateQueries('getCall')
        },
    //   },
      onError: (error: Error) => {
        toast.error(`Error: ${error?.message ?? 'An error occurred'}`)
      },
    })
  }
  
  export default usePost
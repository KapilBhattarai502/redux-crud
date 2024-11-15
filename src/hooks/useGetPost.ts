import axios from "axios"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"


const post= async (payload: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${payload}`)
      return response.data
    } catch (error: any) {
      throw new Error(`${error.response.data.message}`)
    }
  }
  
  const useGetPost = (setResponse:React.Dispatch<React.SetStateAction<undefined>>) => {
    const queryClient =useQueryClient()
    
  
    return useMutation((payload: string) => post(payload), {
      onSuccess: async (response) => {
        // if (response?.resCod == 200) {
          toast.success("Successfull!!")
                 queryClient.invalidateQueries('getCall')
                 setResponse(response);
        },
    //   },
      onError: (error: Error) => {
        toast.error(`Error: ${error?.message ?? 'An error occurred'}`)
      },
    })
  }
  
  export default useGetPost
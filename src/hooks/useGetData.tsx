/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const QUERY_KEY = "getCall";
//standard
interface IProps{
  order:string,
  search:string,
  status:boolean,

}


export const useGet = (params:IProps) => {
  const cache = useQueryClient();
  const {order,search,status}=params
  return useQuery(
    [QUERY_KEY,search,order],
    async () => {
      const { data } = await axios.get("http://localhost:3000/users");
      return data;
    },
    {
      onError: (error) => {
        console.error("Error fetching account schema:", error);
      },
      onSuccess: () => {
        // cache.invalidateQueries("getCall");
      },
      enabled:status,
      
      
    }
  );
};
// const cache = useQueryClient();
// cache.invalidateQueries(QUERY_KEY);

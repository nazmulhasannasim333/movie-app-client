import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
    const [axiosSecure] = useAxiosSecure()

    const {data: users=[], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users`)
          // const notAdmin = res.data.filter((user => user?.role !== 'admin'))
          // console.log(notAdmin);
          // console.log(res.data);
          return res.data;
        },
      })
      return [users, refetch]
}
export default useUsers;
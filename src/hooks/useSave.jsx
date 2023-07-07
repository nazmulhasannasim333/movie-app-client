import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useSave = () => {
    const {user, loading} = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { data: Saves=[], refetch  } = useQuery({
        queryKey: ['favorites', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/save/${user?.email}`)
            return response.data;
          },
      })

return [Saves, refetch];
}

export default useSave;
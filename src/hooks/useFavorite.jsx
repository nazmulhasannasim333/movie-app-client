import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useFavorite = () => {
    const {user, loading} = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { data: favorites=[], refetch  } = useQuery({
        queryKey: ['favorites', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/favorite/${user?.email}`)
            return response.data;
          },
      })

return [favorites, refetch];
}

export default useFavorite;
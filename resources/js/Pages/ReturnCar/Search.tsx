import { Head } from '@inertiajs/react'
import { Box, Button, Container, Text, TextInput } from '@mantine/core'
import { FC, ReactElement, useCallback, useState } from 'react'
import Navbar from '../../Components/Home/Navbar'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Car, CarReturn, PageProps } from '@/types'
import axios from 'axios'
import CarCard from '@/Components/Home/CarCard'
import RentCard from '../Rents/RentCard'
import { showNotification } from '@mantine/notifications'

const Search: FC<PageProps> = ({ auth: { user } }): ReactElement => {
  const [license, setLicense] = useState<string>('');
  const rent = useQuery({
    queryKey: ['search', user.id, license],
    queryFn: () => axios.get<Car>(`/api/search-rent/${user.id}`, {
      params: {
        license
      }
    }),
    onSuccess(data) {
      console.log(data)
    },
  });
  const createReturn = useMutation({
    mutationFn: (val: { car_id: number; car_rent_id: number }) => axios.post<CarReturn>('/api/returns', {
      ...val
    }),
    onSuccess(data) {
      showNotification({
        message: 'Pengajuan pengembalian mobil berhasil dibuat',
        color: 'green',
      });
      setLicense('');
      console.log(data);
    },
  });

  const returnCar = useCallback(() => {
    console.log(rent.data, 'data')
    if (typeof rent.data !== "undefined" && rent.data.data.car_rent !== null) {
      const { data: { id, car_rent } } = rent.data;
      createReturn.mutate({ car_id: id, car_rent_id: car_rent.id });
    }
  }, [rent]);

  return (
    <Box>
      <Head title="Pengembalian Mobil" />
      <Navbar />
      <Container>
        <TextInput my="md" placeholder='Masukkan plat nomor mobil' size="lg" value={license} onChange={e => setLicense(e.target.value)} />
        <Button fullWidth >Cari</Button>

        {
          typeof rent.data !== "undefined" && typeof rent.data.data !== "string" && license.length > 0 &&
          <>
            <CarCard withButton={false} car={rent.data.data} isAuthenticated={false} user={user} />
            {
              rent.data.data.car_rent !== null ?
                <>
                  <RentCard withCarCard={false} cost={rent.data.data.cost} rent={rent.data.data.car_rent} user={user} />
                  <Button loading={createReturn.isLoading} onClick={returnCar} mt="md" fullWidth color="blue">Ajukan Pengembalian Mobil</Button>
                </>
                :
                <Box my="xl">
                  <Text align="center" color="dimmed">Anda tidak menyewa mobil ini</Text>
                </Box>
            }
          </>
        }
      </Container>
    </Box>
  )
}

export default Search
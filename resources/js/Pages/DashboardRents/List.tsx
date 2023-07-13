import Navbar from '@/Components/Home/Navbar'
import { CarRent, PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import { Container, SimpleGrid, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { FC, ReactElement } from 'react'
import RentCard from '@/Pages/Rents/RentCard'
import Authenticated from '@/Layouts/AuthenticatedLayout'

type props = PageProps;

const List: FC<props> = ({ auth: { user } }): ReactElement => {
  const rents = useQuery({
    queryKey: ['rent-list'],
    queryFn: () => axios.get<CarRent[]>(`/api/rents`),
    onSuccess: (data) => {
      console.log(data)
    }
  });

  return (
    <>
      <Head title='Daftar Sewa' />
      <Authenticated user={user} title="Daftar Sewa">
        {user !== null ? <SimpleGrid verticalSpacing={0} cols={2}>
          {
            rents.data?.data.map(rent => (
              <RentCard user={user} rent={rent} key={`${rent.id}-${rent.created_at}`} />
            ))
          }
        </SimpleGrid>
          :
          <Text>Halaman ini tidak dapat diakses</Text>
        }
      </Authenticated>
    </>
  )
}

export default List
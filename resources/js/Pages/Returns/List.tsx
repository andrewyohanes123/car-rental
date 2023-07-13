import Authenticated from '@/Layouts/AuthenticatedLayout'
import { CarReturn, PageProps } from '@/types'
import { Card, SimpleGrid, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { FC, ReactElement } from 'react'
import RentCard from '../Rents/RentCard';
import CarCard from '@/Components/Home/CarCard';
import dayjs from 'dayjs';

const List: FC<PageProps> = ({ auth: { user } }): ReactElement => {
  const returns = useQuery({
    queryKey: ['returns'],
    queryFn: () => axios.get<CarReturn[]>(`/api/returns`),
    onSuccess: (data) => {
      console.log(data)
    },
    onError(err) {
      console.log(err, 'err')
    },
  });
  return (
    <Authenticated user={user} title='Pengembalian'>
      <SimpleGrid cols={2} verticalSpacing={0}>
        {
          returns.data?.data.map(carReturn => (
            <Card withBorder key={`${carReturn.id}-${carReturn.created_at}`}>
              <Text color="dimmed" mb="md">Dikembalikan pada {dayjs(carReturn.created_at).format('DD/MM/YYYY hh:mm:ss')}</Text>
              <RentCard rent={carReturn.car_rent} user={user} withCarCard={false} />
              <CarCard isAuthenticated={false} user={user} withButton={false} car={carReturn.car} />
            </Card>
          ))
        }
      </SimpleGrid>
    </Authenticated>
  )
}

export default List
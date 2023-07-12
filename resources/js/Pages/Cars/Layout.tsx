import { FC, ReactElement, useState } from 'react'
import { Box, Button, SimpleGrid } from '@mantine/core';
import { Car, PageProps } from '@/types';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import AddModal from './AddModal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CarCard from './CarCard';

type props = PageProps;

const Layout: FC<props> = ({ auth: { user } }): ReactElement => {
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const cars = useQuery({
    queryKey: ['cars'],
    queryFn: () => {
      return axios.get<Car[]>('/api/cars');
    },
    onSettled: (data, error) => {
      console.log({ data, error })
    }
  });

  return (
    <Authenticated title="Mobil" user={user}>
      <Button onClick={() => setModal("add")} >Tambah Mobil</Button>
      <AddModal opened={modal === "add"} onClose={() => setModal(null)} />
      <SimpleGrid cols={4}>
        {
          cars.data?.data.map(car => (
            <CarCard key={`${car.id}-${car.updated_at}`} car={car} />
          ))
        }
      </SimpleGrid>
    </Authenticated>
  )
}

export default Layout
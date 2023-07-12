import { Car, User } from '@/types';
import { Box, Container, SimpleGrid, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FC, ReactElement, useMemo } from 'react'
import CarCard from './CarCard';

interface props {
  user: User | null;
}

const CarList: FC<props> = ({ user }): ReactElement => {
  const cars = useQuery({
    queryKey: ['cars'],
    queryFn: () => {
      return axios.get<Car[]>('/cars');
    },
    onSettled: (data, error) => {
      console.log({ data, error })
    }
  });
  const isAuthenticated = useMemo(() => (user !== null), [user]);

  return (
    <Container>
      <Box p="md">
        <Title order={2} color="teal" >Mobil yang tersedia</Title>
        <SimpleGrid verticalSpacing={0} cols={2}>
          {
            cars.data?.data.map(car => (
              <CarCard user={user} isAuthenticated={isAuthenticated} key={`${car.id}-${car.updated_at}-${car.created_at}`} car={car} />
            ))
          }
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default CarList
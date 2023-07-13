import { Car, User } from '@/types'
import { ActionIcon, Badge, Box, Button, Card, Divider, Group, Text, Title } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FC, ReactElement, useCallback, useState } from 'react'
import { router } from '@inertiajs/react';
import RentModal from './RentModal';

interface props {
  car: Car;
  isAuthenticated: boolean;
  user: User | null;
  withButton?: boolean;
}

const CarCard: FC<props> = ({ car, isAuthenticated, user, withButton = true }): ReactElement => {
  const [rentModal, toggleRentModal] = useState<boolean>(false);
  const rent = useCallback(() => {
    if (isAuthenticated) {
      toggleRentModal(true);
    } else {
      router.visit('/login')
    }
  }, []);

  return (
    <Card withBorder my="xs">
      <Group align='flex-start' grow>
        <Box>
          <Title order={4}>{car.name}</Title>
          <Text color="dimmed">{car.model}</Text>
        </Box>
        <Badge size="xl" color="blue" >{car.license_plate}</Badge>
      </Group>
      <Text color="teal" my="xs" fw="bold" >Rp. {car.cost}</Text>
      {withButton &&
        <>
          <Divider my="xs" />
          <Button onClick={rent} fullWidth>Sewa</Button>
        </>
      }
      {user !== null && <RentModal user={user} opened={rentModal} onClose={() => toggleRentModal(false)} car={car} />}
    </Card>
  )
}

export default CarCard
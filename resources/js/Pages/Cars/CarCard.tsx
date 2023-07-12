import { Car } from '@/types'
import { ActionIcon, Badge, Box, Card, Divider, Group, Text, Title } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react';
import { FC, ReactElement } from 'react'

interface props {
  car: Car;
}

const CarCard: FC<props> = ({ car }): ReactElement => {
  return (
    <Card withBorder my="md">
      <Group align='flex-start' grow>
        <Box>
          <Title order={4}>{car.name}</Title>
          <Text color="dimmed">{car.model}</Text>
        </Box>
        <Badge color="blue" >{car.license_plate}</Badge>
      </Group>
      <Text color="teal" my="xs" fw="bold" >Rp. {car.cost}</Text>
      <Divider my="xs" />
      <Group>
        <ActionIcon color="red" variant="light">
          <IconTrash />
        </ActionIcon>
      </Group>
    </Card>
  )
}

export default CarCard
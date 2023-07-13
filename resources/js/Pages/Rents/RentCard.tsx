import { CarRent, User } from '@/types'
import { Badge, Card, Text } from '@mantine/core'
import dayjs from 'dayjs';
import React, { FC, ReactElement, useMemo } from 'react'
import CarCard from '@/Components/Home/CarCard';

interface props {
  rent: CarRent;
  user: User;
  withCarCard?: boolean;
  cost?: number;
}

const RentCard: FC<props> = ({rent, user, withCarCard = true, cost = 0}): ReactElement => {
  const startDate = useMemo(() => (dayjs(rent.start_date).format('DD/MM/YYYY')), [rent.start_date]);
  const endDate = useMemo(() => (dayjs(rent.end_date).format('DD/MM/YYYY')), [rent.end_date]);
  const calculatedDays = useMemo(() => (dayjs(rent.end_date).diff(rent.start_date, 'days')), [rent.end_date, rent.start_date]);

  return (
    <Card withBorder>
      <Text>Tanggal</Text>
      <Text fw="bolder" >{startDate} - {endDate} ({calculatedDays} hari)</Text>
      <Text>Jumlah Pembayaran</Text>
      <Text fw="bolder">Rp. {calculatedDays * (rent?.car?.cost ?? cost)}</Text>
      <Badge color={rent.active ? 'green' : 'red'} >{rent.active ? 'Aktif' : 'Tidak Aktif'}</Badge>
      {withCarCard && <CarCard withButton={false} car={rent.car} isAuthenticated={false} user={user} />}
    </Card>
  )
}

export default RentCard
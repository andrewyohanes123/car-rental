import { FC, ReactElement, useCallback, useMemo } from 'react'
import { Box, Button, Modal, Text } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates';
import { Car, CarRent, User } from '@/types';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

interface props {
  opened: boolean;
  onClose: () => void;
  car: Car;
  user: User;
}

const initialValues = {
  dates: [new Date(), dayjs().add(1, 'day').toDate()]
};

const validate = yupResolver(yup.object().shape({
  dates: yup.array().of(yup.date()).required('Pilih tanggal')
}))

const RentModal: FC<props> = ({ car, onClose, opened, user }): ReactElement => {
  const { values, onSubmit, getInputProps, reset } = useForm({ initialValues, validate });
  const queryClient = useQueryClient();

  const calculatedDays = useMemo(() => {
    const [start_date, end_date] = values.dates;
    return dayjs(end_date).diff(start_date, 'day');
  }, [values.dates]);
  const createRent = useMutation({
    mutationFn: (val: { start_date: string; end_date: string; }) => axios.post<CarRent>('/api/rents', { ...val, car_id: car.id, user_id: user.id }),
    onSuccess(data) {
      console.log(data);
      showNotification({
        message: 'Pengajuan sewa berhasil dibuat',
      });
      onClose();
      reset();
      queryClient.invalidateQueries(['cars']);
    },
  })

  const onFinish = useCallback((val: typeof initialValues) => {
    const [start_date, end_date] = values.dates;
    createRent.mutate({ start_date: dayjs(start_date).format('YYYY-MM-DD'), end_date: dayjs(end_date).format('YYYY-MM-DD') })
  }, []);

  return (
    <Modal styles={{ body: { overflow: 'visible', height: window.innerHeight * .5 } }} opened={opened} onClose={onClose} title={`Sewa ${car.name}`} >
      <Box onSubmit={onSubmit(onFinish)} component='form'>
        <DatePickerInput type="range" {...getInputProps('dates')} label="Pilih tanggal" placeholder='Pilih Tanggal' />
        <Text my="md">Durasi Penyewaan : {calculatedDays} hari</Text>
        <Text color="teal" size="lg" fw="bold" my="md">Rp. {calculatedDays * car.cost}</Text>
        <Button type="submit" fullWidth >Sewa</Button>
      </Box>
    </Modal>
  )
}

export default RentModal
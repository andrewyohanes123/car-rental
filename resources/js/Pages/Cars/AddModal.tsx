import { useForm } from '@inertiajs/react';
import { Box, Button, Modal, NumberInput, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FC, FormEvent, ReactElement, useCallback } from 'react'

interface props {
  opened: boolean;
  onClose: () => void;

}

const initialValues = {
  name: '',
  model: '',
  license_plate: '',
  cost: 1000
}

const AddModal: FC<props> = ({ opened, onClose }): ReactElement => {
  const { data, reset, errors, setData, processing, submit, post } = useForm(initialValues);
  const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.name as keyof typeof initialValues;
    const value = ev.target.value;
    setData(name, value);
  }, [setData]);
  const queryClient = useQueryClient();

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('car.store'), {
      onSuccess: () => {
        showNotification({
          message: 'Mobil berhasil ditambahkan'
        });
        queryClient.invalidateQueries(['cars']);
        reset();
        onClose();
      }
    });
  }, [post]);

  return (
    <Modal opened={opened} onClose={onClose} title="Tambah Mobil">
      <Box component='form' onSubmit={onSubmit}>
        <TextInput label="Merk Mobil" placeholder="Merk Mobil. Contoh : Daihatsu Xenia" name="name" onChange={onChange} error={errors.name} value={data.name} />
        <TextInput label="Model" placeholder="Model" name="model" onChange={onChange} value={data.model} error={errors.model} />
        <TextInput label="Plat Nomor" placeholder="B 0000 XX" name="license_plate" onChange={onChange} value={data.license_plate} error={errors.license_plate} />
        <NumberInput label="Harga Sewa Per Hari" placeholder="B 0000 XX" name="license_plate" min={1000} onChange={value => setData('cost', value)} value={data.cost} error={errors.cost} />
        <Button loading={processing} type="submit" mt="md" fullWidth>Tambah</Button>
      </Box>
    </Modal>
  )
}

export default AddModal
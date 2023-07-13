import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps, User } from '@/types'
import { Card, Divider, SimpleGrid, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC, ReactElement } from 'react'

const List: FC<PageProps> = ({auth}): ReactElement => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users'),
    onSuccess(data) {
      console.log(data)
    },
  });

  return (
    <Authenticated user={auth.user} title='Pengguna' >
      <SimpleGrid verticalSpacing={0} cols={4}>
        {
          users.data?.data.map(user => (
            <Card withBorder key={`${user.id}-${user.username}`}>
              <Title order={3}>{user.name}</Title>
              <Text color="dimmed">{user.username}</Text>
              <Divider />
              <Text>ID SIM : {user.driving_license_number ?? "-"}</Text>
              <Text>Nomor Telepon : {user.phone ?? "-"}</Text>
            </Card>
          ))
        }
      </SimpleGrid>
    </Authenticated>
  )
}

export default List
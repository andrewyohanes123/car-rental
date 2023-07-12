import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Title, Text, createStyles, Box, Center, Group } from '@mantine/core';
import { Link } from "@inertiajs/react"
import CarList from '@/Components/Home/CarList';
import Navbar from '@/Components/Home/Navbar';

const useStyles = createStyles(theme => ({
  welcomeSplash: {
    padding: theme.spacing.md,
    height: window.innerHeight * .45,
    flexDirection: 'column',
    width: '100%'
  },
  welcomeContainer: {
    background: theme.fn.linearGradient(10, theme.colors.blue[4], theme.colors.teal[5]),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
}))

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
  const { classes } = useStyles();

  return (
    <>
      <Head title="Selamat Datang" />
      <Box component={Center} className={classes.welcomeContainer} >
        <Group p="sm" spacing="md">
          <Box component={Link} href='register' >Daftar</Box>
          <Box component={Link} href='login' >Login</Box>
        </Group>
        <Center className={classes.welcomeSplash}>
          <Title order={2} color="white">Selamat Datang</Title>
          <Text size="sm" color="dimmed">Silakan pilih mobil</Text>
        </Center>
      </Box>
      {
        auth.user !== null && <Navbar />
      }
      <CarList user={auth.user} />
    </>
  );
}

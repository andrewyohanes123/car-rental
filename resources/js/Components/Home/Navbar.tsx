import { FC, ReactElement } from 'react'
import {Center, Group, createStyles} from '@mantine/core'
import { Link } from '@inertiajs/react'

const useStyles = createStyles(theme =>({
  link : {
    textDecoration: 'none',
    color: theme.colors.blue[4],
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    ':hover': {
      background: theme.colors.blue[5],
      color: 'white',
      borderRadius: theme.radius.md
    }
  }
}))

const Navbar:FC = (): ReactElement => {
  const {classes}= useStyles();
  return (
    <Center>
      <Group spacing="sm" p="md">
        <Link className={classes.link} href="/">Daftar Mobil</Link>
        <Link className={classes.link} href="/rents">Daftar Sewa</Link>
      </Group>
    </Center>
  )
}

export default Navbar
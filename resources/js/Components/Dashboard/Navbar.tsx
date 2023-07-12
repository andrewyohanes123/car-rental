import { FC, ReactElement, useCallback } from "react";
import { createStyles, Box, Center, NavLink, Navbar, ScrollArea, Title, UnstyledButton, getStylesRef, Text, } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconUser, IconLogout, IconCar, IconCash } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

const useStyles = createStyles((theme, _params) => {
  // const icon = getRef("icon");
  return {
    navbar: {
      // background: theme.colors.blue[6],
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.fn.gradient({
            from: theme.colors.green[5],
            to: theme.colors.teal[5],
            deg: 75,
          }),
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderBottom: `1px solid ${theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.pink[2]
        }`,
      background: theme.white,
      height: 65,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.pink[2]
        }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === "dark" ? theme.white : theme.white,
      padding: theme.spacing.sm,
      borderRadius: theme.radius.md,
      // borderTopRightRadius: theme.radius.lg,
      // borderBottomRightRadius: theme.radius.lg,
      fontWeight: 600,
      width: "100%",
      transition: "all .15s ease-in-out",
      [`& .${getStylesRef("icon")}`]: {
        color: theme.white,
      },

      "&:hover": {
        backgroundColor: theme.colors.teal[1],
        // [`& .${icon}`]: {
        //   opacity: 0.9,
        //   color: theme.white,
        // },
        transition: "all .15s ease-in-out",
        color: theme.colors.dark[5],
        [`& .${getStylesRef("icon")}`]: {
          transition: "all .15s ease-in-out",
          color: theme.colors.dark[5],
        },
      },
    },

    linkIcon: {
      ref: getStylesRef("icon"),
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    activeLinkIcon: {
      // ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.pink[5],
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.xs,
      marginTop: theme.spacing.xs,
      borderRadius: theme.radius.md,
      // borderTopRightRadius: theme.radius.lg,
      // borderBottomRightRadius: theme.radius.lg,
      fontWeight: 600,
      width: "100%",
      transition: "all .15s ease-in-out",
      boxShadow: theme.shadows.md,
      backgroundColor: theme.white,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.colors.pink[5],
      },
      scale: 1.25,

      "&:hover": {
        backgroundColor: theme.colors.pink[1],
        // [`& .${icon}`]: {
        //   opacity: 0.9,
        //   color: theme.white,
        // },
        transition: "all .15s ease-in-out",
        color: theme.colors.dark[5],
        [`& .${getStylesRef("icon")}`]: {
          transition: "all .15s ease-in-out",
          color: theme.colors.dark[5],
        },
      },
    },
    appName: {
      display: "inline-block",
      textAlign: "center",
    },
  };
});

interface props {
  user: User;

}

const Sidebar: FC<props> = ({ user }): ReactElement => {
  const {
    classes,
    cx,
    theme: { colors, colorScheme },
  } = useStyles();

  return (
    <Navbar width={{ sm: 300 }} className={classes.navbar}>
      <Center pt="md" className={classes.header}>
        <Text>Rental Mobil</Text>
      </Center>
      <Navbar.Section component={ScrollArea} p="xs" grow>
        <Link
          href={`/dashboard/user`}
          className={classes.link}
        >
          <IconUser className={classes.linkIcon} stroke={1.5} />
          <span>Pengguna</span>
        </Link>
        <Link
          href={`/dashboard/cars`}
          className={classes.link}
        >
          <IconCar className={classes.linkIcon} stroke={1.5} />
          <span>Mobil</span>
        </Link>
        <Link
          href={`/dashboard/rents`}
          className={classes.link}
        >
          <IconCash className={classes.linkIcon} stroke={1.5} />
          <span>Sewa</span>
        </Link>
      </Navbar.Section>
      <Navbar.Section px="xs" py="md" className={classes.footer}>
        <UnstyledButton className={classes.link}>
          <IconUser className={classes.linkIcon} stroke={1.5} />
          <Box>
            <Title order={4}>{user?.name}</Title>
            <Text color={colorScheme === "dark" ? "white" : colors.dark[6]}>
              {user?.username}
            </Text>
          </Box>
        </UnstyledButton>

        <Link method="post" href={route('logout')} className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
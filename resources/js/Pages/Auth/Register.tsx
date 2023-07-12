import { useEffect, FormEventHandler, useCallback, ChangeEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { TextInput, PasswordInput, Button, Card, Center, createStyles, Title } from '@mantine/core';

const initialValues = {
    name: '',
    phone: '',
    password: '',
    driving_license_number: '',
    username: '',
    password_confirmation: '',
}

const useStyles = createStyles(theme => ({
    centerContainer: {
        height: window.innerHeight * .8,
        width: '100%',
        flexDirection: 'column',
        padding: theme.spacing.md
    },
    card: {
        width: window.innerWidth * .5,
        maxWidth: '100%',
    }
}))

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm(initialValues);
    const { classes } = useStyles();

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault();

        post(route('register'));
    }, [post]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name as keyof typeof initialValues;
        const value = e.target.value;
        // console.log(inputName, value)
        setData(inputName, value);
    }, [setData]);

    return (
        <>
            <Head title="Daftar Member" />
            <Center className={classes.centerContainer}>
                <Card className={classes.card} withBorder>
                    <Title order={3}>Daftar Member</Title>
                    <form onSubmit={submit}>
                        <TextInput name="name" onChange={onChange} error={errors.name} label="Nama Lengkap" placeholder='Nama Lengkap' value={data.name} />
                        <TextInput name="username" onChange={onChange} error={errors.username} label="Username" placeholder='Username' value={data.username} />
                        <TextInput maxLength={19} name="driving_license_number" onChange={onChange} error={errors.driving_license_number} label="ID SIM" placeholder='ID SIM' value={data.driving_license_number} />
                        <TextInput name="phone" onChange={onChange} error={errors.phone} label="Nomor Telepon" placeholder='Nomor Telepon' value={data.phone} />
                        <PasswordInput name="password" onChange={onChange} error={errors.password} label="Password" placeholder='Password' value={data.password} />
                        <PasswordInput name="password_confirmation" onChange={onChange} error={errors.password_confirmation} label="Konfirmasi Password" placeholder='Konfirmasi Password' value={data.password_confirmation} />
                        <Button type="submit" color="teal" loading={processing} fullWidth mt="md" >Daftar</Button>
                    </form>
                </Card>
            </Center>
        </>
    );
}

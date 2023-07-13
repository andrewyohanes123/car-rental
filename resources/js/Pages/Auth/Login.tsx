import { useEffect, FormEventHandler, useCallback } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { TextInput, Button, PasswordInput, Container, Checkbox, Divider } from '@mantine/core';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const goToRegister = useCallback(() => {
        router.visit('/register')
    }, []);

    return (
        <>
            <Head title="Login" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <Container mt="xl" pt="xl">
                <form onSubmit={submit}>
                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        label="Username"
                        onChange={(e) => setData('username', e.target.value)}
                        error={errors.username}
                        placeholder='Username'
                    />
                    <PasswordInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        placeholder='Password'
                        label="Password"
                    />
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        label="Remember Me"
                        mt="md"
                    />
                    <Button mt="md" fullWidth type="submit" loading={processing}>
                        Login
                    </Button>
                    <Divider label="Tidak punya akun?" my="md" labelPosition='center' />
                    <Button onClick={goToRegister} mt="md" fullWidth color="blue" variant="outline" loading={processing}>
                        Daftar
                    </Button>
                </form>
            </Container>
        </>
    );
}

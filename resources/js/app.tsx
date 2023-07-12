import './bootstrap';
// import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';

const appName = import.meta.env.VITE_APP_NAME || 'Rental Mobil';

const client = new QueryClient();

const customTheme: MantineThemeOverride = {
    primaryColor: 'teal'
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <MantineProvider theme={customTheme} withGlobalStyles withNormalizeCSS>
                <Notifications position='top-right' />
                <QueryClientProvider client={client}>
                    <App {...props} />
                </QueryClientProvider>
            </MantineProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

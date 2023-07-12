export interface User {
    username: string;
    id: number;
    name: string;
    driving_license_number: string;
    phone: string;
    type: "admin" | "customer";
}

export interface Car {
    name: string;
    id: number;
    model: string;
    cost: number;
    license_plate: string;
    created_at: string;
    updated_at: string;
}

export interface CarRent {
    start_date: string;
    end_date: string;
    car_id:number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

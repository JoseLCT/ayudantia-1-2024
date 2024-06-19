import z from 'zod';

const userSquema = z.object({
    name: z.string().min(2).max(100),
    last_name: z.string().min(2).max(100),
    email: z.string().email(),
    phone_number: z.string().min(7).max(20),
    password: z.string().min(8)
});

export function validateUser(user) {
    return userSquema.safeParse(user);
}

export function validatePartialUser(user) {
    return userSquema.partial().safeParse(user);
}
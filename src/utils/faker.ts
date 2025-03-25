import { faker } from "@faker-js/faker"

export interface FakeUser {
    avatar: string
    name?: string
    // Add other properties as needed
}

export function createRandomUser(): FakeUser {
    return {
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
        name: faker.person.fullName(),
    }
}

export function createRandomUsers(count: number): FakeUser[] {
    return Array.from({ length: count }, createRandomUser);
}

// This can be removed if you're only exporting the functions
const user = createRandomUser();



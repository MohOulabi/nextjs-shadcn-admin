import { faker } from '@faker-js/faker';

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
}

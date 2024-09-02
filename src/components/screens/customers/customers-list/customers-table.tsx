'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { DataTable } from './customers-data-table';
import { Customer } from './mock-customers';

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value) || customer.email.toLowerCase().includes(value)
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div>
      <Input placeholder='Filter customers...' onChange={handleFilter} className='mb-4 max-w-sm' />
      <DataTable data={filteredCustomers} />
    </div>
  );
}

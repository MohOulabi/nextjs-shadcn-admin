import { ArrowUp, ArrowDown, Edit, Eye, Trash, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ColumnDef } from '@tanstack/react-table';
import { Customer } from './mock-customers';

export const customer_columns: ColumnDef<Customer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className='flex items-center'>
        Name
        <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : (
            <ArrowDown className='h-4 w-4' />
          )}
        </button>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <div className='flex items-center'>
        Email
        <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : (
            <ArrowDown className='h-4 w-4' />
          )}
        </button>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => alert(`Edit ${row.original.name}`)}>
                <Edit className='h-4 w-4 ltr:mr-2 rtl:ml-2' /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert(`View ${row.original.name}`)}>
                <Eye className='h-4 w-4 ltr:mr-2 rtl:ml-2' /> View
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DialogTrigger asChild>
                  <div className='flex items-center'>
                    <Trash className='h-4 w-4 ltr:mr-2 rtl:ml-2' /> Delete
                  </div>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {row.original.name}?
            </DialogDescription>
            <DialogFooter>
              <Button variant='outline'>Cancel</Button>
              <Button variant='destructive' onClick={() => alert(`Deleted ${row.original.name}`)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

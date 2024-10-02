import { TableUsers } from '@/Components/Users/TableUsers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Select, Option, Alert } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function Index({ users }) {
  const { data, setData } = useForm({
    perPage: 10
  });
  console.log(data);
    return (
        <AuthenticatedLayout>
            <Head title="User Management" />
            
            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-y-8">
                    <div className="overflow-hidden">
                        <div className="border-b-2 pb-4 border-gray-500">
                            <h1 className="font-medium text-xl">User Management</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between">
                          <div>
                            {/* <Select 
                              label="Entry per page"
                              name="perPage" 
                              selected={data.perPage}
                              onChange={(e) => setData('perPage', e.target.selected)}
                              >
                              <Option value='10'>10</Option>
                              <Option value='20'>20</Option>
                              <Option value='50'>50</Option>
                              <Option value='100'>100</Option>
                            </Select> */}
                          </div>
                          <Link href={route('users.create')}>
                            <Button color="green" className="flex items-center gap-x-2">
                              <UserPlusIcon className="h-5 w-5" />
                              Add New User
                            </Button>
                          </Link>
                        </div>
                        <TableUsers users={users}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

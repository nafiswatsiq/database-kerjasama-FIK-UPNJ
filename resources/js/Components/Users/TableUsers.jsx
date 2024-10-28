import { Card, Chip, Typography } from "@material-tailwind/react";
import { Pagination } from "../Pagination";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, router, useForm } from "@inertiajs/react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
 
export function TableUsers({ users }) {
  const TABLE_HEAD = ["No", "Nama", "NIP", "Jabatan", "Status User", "Action"];
  const { data, setData } = useForm({
    page: users.current_page
  })

  const deleteSwal = (id) => {
    withReactContent(Swal).fire({
      title: 'Kamu yakin?',
      text: 'Anda tidak akan dapat memulihkan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Dihapus!',
          text: 'Data telah dihapus.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });

        router.delete(route('user.destroy', id), {
          preserveScroll: true,
          onSuccess: () => {
            setData('page', users.current_page)
          }
        });
      }
    });
  }

  return (
    <Card className="h-full w-full px-6">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.data.map(({ id, name, nip, jabatan, is_admin }, index) => {
            const isLast = index === users.data.length - 1;
            const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";
 
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {nip}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {jabatan}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className={`border w-fit px-3 font-normal rounded-md ${is_admin ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                  >
                    {is_admin ? 'admin' : 'non-admin'}
                  </Typography>
                </td>
                <td className={`${classes} w-16`}>
                  <div className="flex justify-start gap-x-6">
                    <Link href={route('user.edit', id)} className="text-blue-500 flex">
                      <PencilSquareIcon className="h-5 w-5" />
                      Edit
                    </Link>
                    <Link onClick={() => deleteSwal(id)} as="button" className="text-red-500 flex">
                      <TrashIcon className="h-5 w-5" />
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full flex justify-end py-5">
        <Pagination 
          links={users.links}
          currentPage={users.current_page}
          setCurrentPage={(page) => setData('page', page)}
          />
      </div>
    </Card>
  );
}
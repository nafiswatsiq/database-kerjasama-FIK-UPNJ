import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon, DocumentPlusIcon, PencilSquareIcon, TrashIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { Pagination } from "../Pagination";
 
export function Table({ agreementArchives}) {
  const TABLE_HEAD = ["No","Nama Instansi", "Bidang Kerja Sama", "Bidang Mitra", "Kurun Waktu", "Waktu Mulai", "Waktu Berakhir", "Status", "Action"];
  const { data, setData } = useForm({
    page: agreementArchives.current_page
  })

  return (
    <Card className="h-full w-full px-6 overflow-x-scroll max-w-screen-xl shadow-none">
      <div className="flex justify-between pt-6">
        <div className="">
        </div>
        <div className="w-6/12">
          <div className="flex gap-x-4">
            <div className="w-full">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />} />
            </div>
            <div className="w-fit">
              <Link href={route('agreementarchives.create')}>
                <Button color="green" className="flex items-center gap-x-2 py-2 text-nowrap ">
                  <DocumentPlusIcon className="h-6 w-6 text-white" />
                  <span className="text-white">Add New Agrement</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
          {agreementArchives.data.map(({ id, nama_instansi, bidang_kerjasama, kriteria_mitra, durasi_kerjasama, waktu_kerjasama_mulai, waktu_kerjasama_selesai, dokumen_kerjasama }, index) => {
            const isLast = index === agreementArchives.length - 1;
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
                    {nama_instansi}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {bidang_kerjasama === 'Pendidikan' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-purple-50 text-purple-500">
                        {bidang_kerjasama}
                      </span> : bidang_kerjasama === 'Pelatihan' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-blue-50 text-blue-500">
                        {bidang_kerjasama}
                      </span> : bidang_kerjasama === 'Abdimas' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-orange-50 text-orange-500">
                        {bidang_kerjasama}
                      </span> : null
                    }
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {kriteria_mitra === 'Perguruan Tinggi Negeri' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-blue-50 text-blue-500">
                        {kriteria_mitra}
                      </span> : kriteria_mitra === 'Perguruan Tinggi Swasta' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-orange-50 text-orange-500">
                        {kriteria_mitra}
                      </span> : kriteria_mitra === 'Dunia Industri/Dunia Usaha' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-purple-50 text-purple-500">
                        {kriteria_mitra}
                      </span> : kriteria_mitra === 'Pemerintahan' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-teal-50 text-teal-500">
                        {kriteria_mitra}
                      </span> : null
                    }
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {durasi_kerjasama}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {format(waktu_kerjasama_mulai, 'dd MMMM yyyy')}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {format(waktu_kerjasama_selesai, 'dd MMMM yyyy')}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {
                      new Date(waktu_kerjasama_selesai) > new Date() ?
                      <span className="border px-3 py-0.5 rounded-md bg-green-50 text-green-500">
                        Active
                      </span> :
                      <span className="border px-3 py-0.5 rounded-md bg-red-50 text-red-500">
                        Inactive
                      </span>
                    }
                  </Typography>
                </td>
                <td className={`${classes} w-16`}>
                  <div className="flex justify-start gap-x-3">
                    <a href={route('agreementarchives.download', dokumen_kerjasama)}>
                      <DocumentArrowDownIcon className="h-5 w-5 text-green-500" />
                    </a>
                    <Link href={route('agreementarchives.edit', id)} className="text-blue-500 flex">
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <Link href={route('agreementarchives.destroy', id)} method="delete" as="button" className="text-red-500 flex">
                      <TrashIcon className="h-5 w-5" />
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
          links={agreementArchives.links}
          currentPage={agreementArchives.current_page}
          setCurrentPage={(page) => setData('page', page)}
          />
      </div>
    </Card>
  );
}
import { Typography } from "@material-tailwind/react";

export function Gallery({ data }) {
 
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.map(({ nama_instansi, date, path }, index) => (
        <div key={index} className="relative rounded-lg overflow-hidden">
          <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#00000074] via-transparent to-transparent">
            <div className="p-2 text-white">
              <Typography variant="small" className="font-normal">
                {nama_instansi}
              </Typography>
              <Typography variant="small" className="font-normal text-xs mt-1">
                {date}
              </Typography>
            </div>
          </div>
          <img
            className="h-40 w-full max-w-full rounded-lg object-cover object-center"
            src={path}
            alt="gallery-photo"
          />
        </div>
      ))}
    </div>
  );
}
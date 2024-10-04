import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
 
export function Pagination({ search, links, currentPage, setCurrentPage }) {
  const [active, setActive] = React.useState(currentPage);
 
  const getItemProps = (index, url) =>
    ({
      variant: active == index ? "filled" : "text",
      color: "orange",
      onClick: () => clicked(index, url),
    });

  const clicked = (index, url) => {
    setActive(index)
    router.visit(url)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        {links.map(link => (
          <IconButton {...getItemProps(link.label, search != null ? link.url + '&search=' + search : link.url)} className="">
            <Link href={search != null ? link.url + '&search=' + search : link.url} dangerouslySetInnerHTML={{ __html: link.label }} className="text-nowrap"/>
          </IconButton>
        ))}
      </div>
    </div>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid } from "lucide-react";
import GlobalAPI from "../_utils/GlobalAPI";
import Link from "next/link";

type category = {
  id: number;
  name: string;
  slug: string;
};

function Category() {
  const [category, setCategory] = useState<category[]>([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = () => {
    GlobalAPI.getCategory().then((res) => {
      setCategory(res.data.data);
    });
  };
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <h2 className="hidden md:flex gap-2 items-center p-2 px-5 border rounded-full bg-slate-200 cursor-pointer">
            <LayoutGrid className="h-5 w-5" /> Category
          </h2>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {category.map((category, index) => (
            <Link href={`/category/${category.slug}`} key={index}>
              <DropdownMenuItem>
                <h2>{category.name}</h2>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Category;

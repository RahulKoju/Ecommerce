import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import ProductItemDetail from "./ProductItemDetail";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: Array<{
    url: string;
  }>;
  slug: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
};

type ProductItemProps = {
  products: Product[];
};

function ProductItem({ products }: ProductItemProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-xl shadow-sm hover:shadow-xl 
               transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
          {product.images?.[0]?.url && (
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].url}`}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, 
                   (max-width: 1024px) 33vw,
                   25vw"
                priority={false}
                className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          )}
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
              {product.description.replace(/\*\*/g, "")}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-green-600 font-bold text-lg">
                Rs. {product.price.toLocaleString()}
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg 
                           hover:bg-green-600 active:bg-green-700 
                           transform active:scale-95 transition-all duration-200
                           shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="sr-only">
                      {product.name}
                    </DialogTitle>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      <ProductItemDetail product={product} />
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            {product.categories?.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {product.categories.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    className="text-xs bg-green-50 text-green-700 px-3 py-1 
                         rounded-full border border-green-100
                         hover:bg-green-100 transition-colors duration-200 cursor-pointer"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductItem;
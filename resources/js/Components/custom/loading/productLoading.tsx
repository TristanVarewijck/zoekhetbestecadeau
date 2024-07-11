import { Skeleton } from "@/Components/ui/skeleton";

const ProductLoading = () => {
    return (
        <div className="mt-8 lg:mt-10 mb-8 lg:mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
                {/* image box */}
                <div className="flex flex-col gap-2 h-full">
                    {/* product route */}
                    <div>
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    {/* image */}
                    <Skeleton className="h-[300px] md:h-[550px] w-full" />
                </div>

                {/* product details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            {/* stock */}
                            <Skeleton className="h-4 w-[150px]" />
                            {/* brand */}
                            <Skeleton className="h-4 w-[75px]" />
                        </div>

                        {/* product name */}
                        <Skeleton className="h-8 w-full" />

                        {/* description */}
                        <div>
                            <Skeleton className="h-[85px] w-full" />
                        </div>
                    </div>

                    {/* price container */}
                    <Skeleton className=" w-full h-[150px]"></Skeleton>

                    {/* additional details */}
                    <div className="flex flex-col gap-4">
                        {/* delivery time */}
                        <Skeleton className="h-10 w-full" />
                        {/* more details (accordion) */}
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductLoading;

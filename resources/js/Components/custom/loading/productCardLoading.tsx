import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";

const ProductCardLoading = () => {
    return (
        <Card className="flex flex-col h-full gap-3 p-4 bg-white border shadow-none lg:border-none lg:p-0">
            <CardHeader className="p-0 h-[150px] md:h-[200px] relative">
                <Skeleton className="w-full h-full" />
            </CardHeader>
            <CardContent className="p-0">
                <div className={`flex flex-col gap-2`}>
                    {/* brand */}
                    <Skeleton className="h-4 w-[75px]" />
                    {/* name */}
                    <Skeleton className="w-full h-4" />
                    {/* price */}
                    <Skeleton className="h-4 w-[125px]" />
                    {/* rating */}
                    {/* <Skeleton className="w-full h-4" /> */}
                    {/* shipping */}
                    <Skeleton className="w-full h-4" />
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCardLoading;

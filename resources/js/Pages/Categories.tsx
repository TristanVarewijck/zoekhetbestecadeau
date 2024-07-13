import { Interest } from "@/types/types";

interface CategoriesProps {
    categories: Interest[];
}

export default function Categories({ categories }: CategoriesProps) {
    console.log(categories);

    return (
        <div>
            <h1>Categories</h1>
        </div>
    );
}

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from "lucide-react"
import { Sidebar } from "@/components/sidebar"


export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-24">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
    };
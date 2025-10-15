import { ShieldIcon } from "lucide-react";
import { Divider } from "./divider";

export function Header() {
    return (
        <>
            <header className="flex flex-col items-center py-6 w-full">
                <div className="flex flex-col gap-2 text-center max-w-80">
                    <h1 className="flex items-center justify-center gap-2 text-blue-500 font-bold text-2xl"><span className="pulse-animation"><ShieldIcon className="size-7" /></span>UnderCode News</h1>
                    <p className="dark:text-[#aaaaaa] text-[#666666] mt-1">Curated security & technology news from The Hacker News</p>
                </div>
            </header>
            <Divider />
        </>
    )
}
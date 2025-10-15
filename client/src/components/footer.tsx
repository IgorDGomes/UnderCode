import { Divider } from "./divider";

export function Footer() {
  const year = new Date().getFullYear();

    return (
        <>
            <Divider />
            <footer className="flex flex-col items-center py-6 w-[90%] mx-auto text-center">
                <div className="text-sm text-gray-500 dark:text-gray-300">
                    <span>{`UnderCode News © ${year} | Using News from `}</span>
                    <a href="https://thehackernews.com/" target="_blank" referrerPolicy="no-referrer" className="hover:underline">The Hacker News</a>
                </div>
            </footer>
        </>
    )
}
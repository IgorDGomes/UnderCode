interface FilterProps {
    active: string;
    onChange: (category: string) => void;
}

export function Filter({ active, onChange }: FilterProps) {
    const categories = [
        "All",
        "Malware",
        "Cybersecurity",
        "Vulnerability",
        "Data Breach",
        "Enterprise Security",
    ]
    return (
        <nav className="py-6 mx-auto text-center">
            {categories.map((category) => {
                return <button key={category} onClick={() => onChange(category)} className={`hover:cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 mx-1 my-1 text-sm rounded-full shadow-md transition 
            ${
              active === category
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-400 hover:text-white"
            }`}>{category}</button>
            })}
        </nav>
    )
}
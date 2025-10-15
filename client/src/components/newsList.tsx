import { useCallback, useEffect, useRef, useState } from "react"
import type { NewsData, NewsDataItem } from "../types"
import { RobotIcon } from "../assets/robot";

export function NewsList({ filter }: { filter: string }) {
    const [news, setNews] = useState<NewsDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [fetchingMore, setFetchingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:3000/news");
                const data: NewsData = await res.json();
                
                setNews(data.news);
                setNextPage(data.nextPage);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [])

    const loadMore = useCallback(async () => {
        if (!nextPage || fetchingMore) return;
        try {
            setFetchingMore(true);
            const res = await fetch(`http://localhost:3000/news?page=${encodeURIComponent(nextPage)}`);
            const data: NewsData = await res.json();

            setNews(prev => [...prev, ...data.news]);
            setNextPage(data.nextPage);
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingMore(false);
        }
    }, [nextPage, fetchingMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        const loader = loaderRef.current;
        if (loader) observer.observe(loader);

        return () => {
            if (loader) observer.unobserve(loader);
        };
    }, [loadMore]);

    const filtered = filter === "All" ? news : news.filter(item => item.tags.toLowerCase().includes(filter.toLowerCase()));

    return (
        <section className="max-w-[90%] md:max-w-2xl lg:max-w-4xl mx-auto py-6">
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="loader"></div>
                </div>
            ) : filtered.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {filtered.map((item, i) => (
                        <article
                            key={i}
                            className="sm:flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
                        >
                            <a href={decodeURIComponent(item.link)} target="_blank" rel="noopener noreferrer" className="sm:w-2/6">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            </a>
                            <div className="p-4 flex-1">
                                <h3 className="font-semibold text-lg mb-2 hover:text-blue-400">
                                <a href={decodeURIComponent(item.link)} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                                </h3>
                                <p className="text-xs text-gray-400 mb-1">{item.tags}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">{item.desc}</p>
                                <div className="text-xs text-gray-500 mt-2">{item.date}</div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <RobotIcon size={80} stroke={1} color="white" />
                    <p>No News found!</p>
                </div>
            )}
            {nextPage && (
                <div ref={loaderRef} className="flex justify-center py-8">
                    {fetchingMore && <div className="loader"></div>}
                </div>
            )}
        </section>
    )
}
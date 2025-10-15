interface NewsDataItem {
    title: string;
    tags: string;
    date: string;
    link: string;
    img: string;
    desc: string;
}

interface NewsData {
    nextPage: string;
    news: NewsDataItem[];
}

export type { NewsData, NewsDataItem };
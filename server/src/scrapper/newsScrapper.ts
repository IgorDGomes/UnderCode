import { CheerioAPI } from "cheerio";

const NewsScrapper = ($: CheerioAPI) => {

    const news: any[] = [];
    
    $("div > a.story-link").each((i: number, e) => {
    
        const link = $(e).attr("href")
        const tags = $(e).find("div > div > span.h-tags").text()
        const title = $(e).find("div > div > h2.home-title").text()
        const img = $(e).find("div > div > div > img.home-img-src").attr("data-src")
        const desc = $(e).find("div > div > div.home-desc").text()
        const date = $(e).find("div > div > div > span.h-datetime").text()

        news.push({title, tags, date, link, img, desc});         
    });

    return news;
}

export default NewsScrapper;
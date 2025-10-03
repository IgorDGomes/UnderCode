import { CheerioAPI } from "cheerio";

const ArticleScrapper = ($: CheerioAPI) => {
    const article: any = {}
    
    article.title = $("h1.story-title").text()
    article.author = $("span.author").eq(1).text()
    article.tags = $("span.p-tags").text()         
    article.date = $("span.author").eq(0).text()

    article.body = $("div.articlebody").text() // temporary

    return article;
}

export default ArticleScrapper;
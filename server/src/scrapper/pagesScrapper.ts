import { CheerioAPI } from "cheerio";

const NewsScrapper = ($: CheerioAPI) => {
    const nextPageLink = $('a[title="Older Posts"]').attr("href");
    const lastPageLink = $('a[title="Newer Posts"]').attr("href");

    const nextPage = nextPageLink && encodeURI(nextPageLink)
    const lastPage = lastPageLink && encodeURI(lastPageLink)

    return { nextPage, lastPage };
}

export default NewsScrapper;
import { CheerioAPI } from "cheerio";

const PagesScrapper = ($: CheerioAPI) => {
    const nextPageLink = $('a[title="Older Posts"]').attr("href");
    const lastPageLink = $('a[title="Newer Posts"]').attr("href");

    const nextPage = nextPageLink && encodeURIComponent(nextPageLink)
    const lastPage = lastPageLink && encodeURIComponent(lastPageLink)

    return { nextPage, lastPage };
}

export default PagesScrapper;
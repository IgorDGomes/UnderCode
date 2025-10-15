import axios from "axios";
import * as cheerio from "cheerio";
import NewsScrapper from "./newsScrapper";
import PagesScrapper from "./pagesScrapper";
import ArticleScrapper from "./articleScrapper";

const Scrapper = async (url: string) => {
    const response = await axios.get(url);
    const data = response.data;
    const $ = cheerio.load(data);

    return {
        GetNews: () => NewsScrapper($),
        GetPages: () => PagesScrapper($),
        GetArticle: () => ArticleScrapper($)
    };
}

export default Scrapper;
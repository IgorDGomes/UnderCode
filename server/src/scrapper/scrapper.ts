import axios from "axios";
import * as cheerio from "cheerio";

const Scrapper = async (url: string) => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    return $;
}

export default Scrapper;
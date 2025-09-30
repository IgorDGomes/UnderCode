import axios from "axios";
import * as cheerio from "cheerio";
import { Application } from "express";

const NewsRoute = (app: Application) => {
    app.get("/news", async (req: any, res: any) => {
        try {
            const response = await axios.get("https://thehackernews.com/");
            const html = response.data;
            const $ = cheerio.load(html);

            const news: any[] = [];

            $(".story-link").each((i: number, el: any) => {
                const tags = $(".h-tags").eq(i).text();
                const title = $(".home-title").eq(i).text();
                const img = $(".home-img-src").eq(i).attr("data-src");
                const desc = $(".home-desc").eq(i).text();
                const date = $(".h-datetime").eq(i).text();
                const link = el.attribs.href;

                news.push({title, tags, link, img, desc, date});            
            });

            res.json({ news });
        } catch (error) {
            console.error("Error receiving news:", error);
            res.status(500).json({ error: "Error receiving news" });
        }
    });
}

export default NewsRoute;
import { Application, Request, Response } from "express";
import PagesScrapper from "../scrapper/pagesScrapper";
import NewsScrapper from "../scrapper/newsScrapper";
import Scrapper from "../scrapper/scrapper";   

const NewsRoute = async (app: Application) => {
    app.get("/news", async (req: Request, res: Response) => {

        const url = req.query.page ? decodeURI(String(req.query.page)) : "https://thehackernews.com"

        if(!url.includes("thehackernews.com"))
        {
            console.log(`Invalid link: ${url}`)
            return res.status(500).json({ error: `Invalid link: ${url}` });
        }

        try {
            const $ = await Scrapper(url);

            const news: any[] = NewsScrapper($);

            if(news.length == 0)
            {
                console.log("Not found news:\n - link -> ", url)
                return res.status(404).json({ error: "Not found news" })
            }

            const { lastPage, nextPage } = PagesScrapper($)

            return res.json({ lastPage, nextPage, news });
        } catch (error) {
            console.error("Error receiving news");
            return res.status(500).json({ error: "Error receiving news" });
        }
    });
}

export default NewsRoute;
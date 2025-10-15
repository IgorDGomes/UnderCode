import { CheerioAPI } from "cheerio";

const ArticleScrapper = ($: CheerioAPI) => {
    const article: any = {}

    article.title = $("h1.story-title").text()
    article.author = $("span.author").eq(1).text()
    article.tags = $("span.p-tags").text()         
    article.date = $("span.author").eq(0).text()

    article.body = []
    
    $("div.articlebody").children().each((_, e) => {
        const tagmapped = MappTags(e.tagName, e, $);
        if (tagmapped !== null)
            article.body.push(tagmapped);
    })

    return article;
}

const MappTags = (tag: string, e: any, $: CheerioAPI) => {
    switch(tag) {
        case "p": return { text: $(e).text()}
        
        case "div": 
            const classDiv =  $(e).attr("class")
            const ignoreClass = ["dog_two clear", "stophere", "cf note-b", "article-board"]

            if(classDiv == "separator") 
                return { img: $(e).find("img").attr("data-src")}
            else if(classDiv == "video-container")
                return { video: $(e).find("iframe").attr("src") }
            
            !ignoreClass.find((s) => s == classDiv) && console.log("Unmapped <div>: class - ", classDiv)
            
            return null

        case "table":
            const classTable = $(e).attr("class")
            if(classTable == "tr-caption-container")
            {
                const img = $(e).find("img").attr("data-src")
                const desc = $(e).find("td").text()
                return { img, desc }
            }
            console.log("Unmapped <table>: class - ", classTable)
            return null
        
        case "h2": return { subtitle: $(e).text(), type: "h2"}
        case "h3": return { subtitle: $(e).text(), type: "h3"}
        case "h4": return { subtitle: $(e).text(), type: "h4"}
        case "h5": return { subtitle: $(e).text(), type: "h5"}
        case "h6": return { subtitle: $(e).text(), type: "h6"}

        case "ol":
        case "ul":
            const list: string[] = []
            $(e).find("li").each((_, li) => {
                list.push($(li).text())
            })
            if(list.length == 0)
                return null 
            return { list };  
        
        default: 
            console.log("Unmapped tag: ", tag)
            return null
    }
}

export default ArticleScrapper;
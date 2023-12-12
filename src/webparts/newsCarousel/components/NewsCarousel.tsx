import * as React from "react";
import { getSP } from "../pnpjsConfig";
import AwesomeSlider from "react-awesome-slider";

import 'react-awesome-slider/dist/styles.css';
// import { mergeStyles } from "@fluentui/react";
import { useEffect, useState } from "react";
import "./NewsCarousel.css";
import { Icon, Link } from "@fluentui/react";

// const iconClass = mergeStyles({
//   fontSize: 12,
//   height: 12,
//   width: 12,
//   margin: "0 5px",
// });

export interface NewsCarouselProps {
  context: any;
  pathurl: string;
  resultsource: string;
}

export const NewsCarousel = (props: NewsCarouselProps) => {
  //States
  const [items, setItems] = useState<any[]>([]);

  //Effects
  useEffect(() => {
    const getNewsPosts = async (): Promise<void> => {
      try {
        const sp = getSP();
        const items: any[] = await sp.web.lists
          .getByTitle("Site Pages")
          .items.select(
            "id,Title,Description,Created,BannerImageUrl,Created,FileRef"
          )();

        console.log(items);

        //How do I get the URL of the page?

        setItems(items);
      } catch (err) {
        console.log(err);
      }
    };
    getNewsPosts();
  }, []);

  //If no items, show loading screen
  if (items.length === 0) {
    return <div>Loading...</div>;
  }

  const getImageUrl = (item: any) => {
    if (item.BannerImageUrl) {
      // Append &resolution=6 to the end of the existing URL
      //item.BannerImageUrl.Url += '&resolution=6';
      return `url('${item.BannerImageUrl.Url += '&resolution=6'}')`;
    } else {
      return `url('https://sharepointsenpai.sharepoint.com/_layouts/15/images/sitepagethumbnail.png&resolution=6')`;
    }
  };
  const getLinkUrlFromFileRef = (item: any) => {
    //Get site URL from context
 
   //  const siteUrl = props.context.pageContext.web.absoluteUrl + "/_api/search/query?querytext=%27Corporate  path:" + props.pathurl + "%27&rowlimit=5&trimduplicates=false&selectproperties=%27Title,OriginalPath,PictureThumbnailURL,Description,created%27&sourceid=%27" + props.resultsource + "%27";
   const siteUrl = props.context.pageContext.web.absoluteUrl;
   const newsArticleUrl = `${siteUrl}/${item.FileRef}`;
    return newsArticleUrl;
  };

  //Filter out any items with Title == "Home"
  const updatedItems = items.filter((item) => {
    return item.Title !== "Home";
  });

  return (
    <>
     {/*  <pre>
        {JSON.stringify(
          updatedItems.map((item) => {
            return {
              Title: item.Title,
              Description: item.Description,
              Created: item.Created,
              BannerImageUrl: item.BannerImageUrl,
              FileRef: item.FileRef,
            };
          }),
          null,
          2
        )}
      </pre>
         
       <AwesomeSlider>
        <div>1</div>
        <div>2</div>

     </AwesomeSlider>
     */}
      <AwesomeSlider
         // autoplay={true}
         // cancelOnInteraction={false} // should stop playing on user interaction
         // interval={600}
         animation="openAnimation"
      >
        {updatedItems.slice(0, 5).map(function (item, i) {
        return (
          <div id="CarouselContainer" key={i}>
            <div className="carousel-item">
              <div
                className="carousel-image"
                style={{
                  backgroundImage: getImageUrl(item),
                  backgroundSize: "cover!important",
                }}
              ></div>
              <div className="contentContainer">
                <div className="content">
                  {/* Title */}
                  <div className="title">{item.Title}</div>

                  {/* Description */}
                  <div className="description">{item.Description}</div>

                  {/* Created On */}
                  <div>
                    Published on:{" "}
                    {new Date(item.Created).toLocaleDateString()}
                  </div>

                  {/* Add a FluentUI Link that opens in a new tab */}
                  <Link className="readmorebtn" href={item.FileRef} target="_blank">
                    Read more
                    <Icon iconName="ChevronRight" aria-hidden="true" />
                  </Link>
                  <Link className="readmorebtn" href={getLinkUrlFromFileRef(item)} target="_blank">
                    Read unch more
                    <Icon iconName="ChevronRight" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="overlay"></div>
          </div>
        );
      })}
      </AwesomeSlider>
    </>
  );

  
};

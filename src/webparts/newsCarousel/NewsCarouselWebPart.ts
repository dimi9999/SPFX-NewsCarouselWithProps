import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjsConfig";
import { NewsCarousel, NewsCarouselProps } from "./components/NewsCarousel";
//import * as strings from 'NewsCarouselDimitriWebPartStrings';

export interface INewsCarouselWebPartProps {
  pathurl: string;
  resultsource: string;
}

export default class NewsCarouselWebPart extends BaseClientSideWebPart<INewsCarouselWebPartProps> {
  protected async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
  }

  public render(): void {
    const element: React.ReactElement<NewsCarouselProps> = React.createElement(
      NewsCarousel,
      {
        pathurl: this.properties.pathurl,
        resultsource: this.properties.resultsource,
        context:this.context

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
       // {
       //   header: {
       //     description: strings.PropertyPaneDescription
       //   },
       //   groups: [
       //     {
       //       groupName: strings.BasicGroupName,
       //       groupFields: [
       //           PropertyPaneTextField('pathurl', {
       //           label: "Path URL"
       //         }),
       //         PropertyPaneTextField('resultsource', {
       //           label: "Result Source ID"
       //         })
       //       ]
       //     }
       //   ]
       // }
      ]
    };
  }
}

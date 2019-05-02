import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default Component => props => {
  try {
    const sheet = new ServerStyleSheet();
    const componentHtml = renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <Component {...props} />
      </StyleSheetManager>
    );

    const componentCss = sheet.getStyleTags();

    sheet.seal();

    return {
      renderedHtml: {
        componentHtml,
        componentCss
      }
    };
  } catch (err) {
    return {
      renderedHtml: {
        componentHtml: "",
        componentCss: ""
      }
    };
  }
};

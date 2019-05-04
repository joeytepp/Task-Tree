import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default Component => props => {
  const sheet = new ServerStyleSheet();
  let componentHtml;

  try {
    componentHtml = renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <Component {...props} />
      </StyleSheetManager>
    );
  } catch (err) {
    componentHtml = "<div></div>";
  }

  const componentCss = sheet.getStyleTags();

  sheet.seal();

  return {
    renderedHtml: {
      componentHtml,
      componentCss
    }
  };
};

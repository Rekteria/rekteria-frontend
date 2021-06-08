// import { muiTheme } from 'storybook-addon-material-ui'
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import theme from "../src/theme";
import store from "../src/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  )
];

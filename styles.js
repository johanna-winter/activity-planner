import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --primary-500: #7abfbf;
  --primary-600: #6bb0b0; /* darker shade for hover */

  --background-100: #d8f2e6;
  --background-200: #ffffff;

  --accent-500: #1e1226;
  --accent-600: #2a1c35; /* darker shade for hover */

  --success-100: #e5f7ee;
  --success-500: #44a66e; /* success message */

  --error-100: #f9dedc;
  --error-500: #d9534f; /* error message */

  --grey-100: #f2f2f2;
  --grey-300: #cccccc;
  --grey-700: #888888;
  --grey-900: #333333;
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }
`;

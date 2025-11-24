// src/App.tsx

import "./App.css";
/**
 * USWDS Elements provides a React wrapper of each component.
 * Import the components you need as shown in the example the below.
 * For purposes of demonstration, we are importing the USA Banner component.
 */
import { UsaBanner } from "@uswds/elements/components/frameworks/react/index";

function App() {
  return (
    <>
      {/* With the React wrapper components, you import and use USWDS Elements as you would any other React component */}
      <UsaBanner />
      <h1>My React App</h1>
      {/* the rest of your app... */}
    </>
  );
}

export default App;

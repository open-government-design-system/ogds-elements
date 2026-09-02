// src/App.tsx

import "./App.css";
/**
 * OGDS Elements provides a React wrapper of each component.
 * Import the components you need as shown in the example the below.
 * For purposes of demonstration, we are importing the OGDS Banner component.
 */
import { OgdsBanner } from "@ogds/elements/components/frameworks/react/index";

function App() {
  return (
    <>
      {/* With the React wrapper components, you import and use OGDS Elements as you would any other React component */}
      <OgdsBanner />
      <h1>My React App</h1>
      {/* the rest of your app... */}
    </>
  );
}

export default App;

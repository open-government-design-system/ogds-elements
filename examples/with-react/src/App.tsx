// src/App.tsx

import "./App.css";
/**
 * OGDS Elements provides a React wrapper of each component. Import each one
 * from its own module under `@ogds/elements/components/frameworks/react/`,
 * named after the component in PascalCase — importing a wrapper directly
 * registers only that custom element, so you don't pay for components your
 * app never renders. For purposes of demonstration, we are importing the OGDS
 * Banner component.
 */
import { OgdsBanner } from "@ogds/elements/components/frameworks/react/OgdsBanner";

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

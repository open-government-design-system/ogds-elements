import "./App.css";
// @ts-expect-error - OGDS Web Components imports will be flagged as unused elements. This is the element definition.
import { OgdsBanner } from "@ogds/elements";

function App() {
  return (
    <>
      <ogds-banner></ogds-banner>
      <h1>My Solid App</h1>
      {/*  the rest of the application...  */}
    </>
  );
}

export default App;

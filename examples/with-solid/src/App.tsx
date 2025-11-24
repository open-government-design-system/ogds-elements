import "./App.css";
// @ts-expect-error - USWDS Web Components imports will be flagged as unused elements. This is the element definition.
import { UsaBanner } from "@uswds/elements";

function App() {
  return (
    <>
      <usa-banner></usa-banner>
      <h1>My Solid App</h1>
      {/*  the rest of the application...  */}
    </>
  );
}

export default App;

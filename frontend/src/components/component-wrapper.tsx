import MyComponent, {
    MyComponentTestNamedExport,
    MyComponentTestNamedExportT,
    MyComponentTestNamedExportTT,
  } from "./my-component.js";
  
  export const ComponentsWrapper = () => {
    return (
      <>
        <MyComponent />
        <MyComponentTestNamedExport />
        <MyComponentTestNamedExportT />
        <MyComponentTestNamedExportTT />
      </>
    );
  };
  
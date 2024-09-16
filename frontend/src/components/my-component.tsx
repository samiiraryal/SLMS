// default export
const MyComponent = () => {
    return (
      <>
        <h1>My component</h1>
      </>
    );
  };
  
  export default MyComponent;
  
  // named export
  export const MyComponentTestNamedExport = () => {
    return <h1>named export</h1>;
  };
  
  const MyComponentTestNamedExportT = () => {
    return <h1>named export one</h1>;
  };
  
  const MyComponentTestNamedExportTT = () => {
    return <h1>named export two</h1>;
  };
  
  export { MyComponentTestNamedExportT, MyComponentTestNamedExportTT };
  
const { runFigmaReact, contentPlugins } = require("figma-react");
const { mobx } = require("figma-react/presets");

runFigmaReact({
  ...mobx,
  contentPlugins: [
    // function addValue(state, { props: componentProps }) {
    //   const { props, nodeProps } = state;
    //   if (Object.keys(props).includes("value")) {
    //     const args = props.value.split(".");
    //     const value = args[0];
    //     const elementType = args[1];
    //     nodeProps["value"] = value;
    //     componentProps[value] = `${elementType || "any"}`;
    //   }
    // },
    // function addOnChange(state, { props: componentProps }) {
    //   const { props, nodeProps } = state;
    //   if (Object.keys(props).includes("onChange")) {
    //     const args = props.onChange.split(".");
    //     const value = args[0];
    //     const elementType = args[1];
    //     nodeProps["onChange"] = value;
    //     componentProps[value] = `React.ChangeEventHandler<${elementType ||
    //       "any"}>`;
    //   }
    // },
    ...contentPlugins,
  ],
}).catch((err) => {
  console.error(err);
  console.error(err.stack);
  process.exit(1);
});

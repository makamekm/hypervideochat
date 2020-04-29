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
    function addTabIndex(state, { props: componentProps }) {
      const { props, nodeProps } = state;
      if (Object.keys(props).includes("tabIndex")) {
        nodeProps["tabIndex"] = props.tabIndex || "0";
        if (props.tabIndex) {
          componentProps[props.tabIndex] = `number`;
        }
      }
    },
    function addOnKeyDown(state, { props: componentProps }) {
      const { props, nodeProps } = state;
      if (Object.keys(props).includes("onKeyDown")) {
        const args = props.onKeyDown.split(".");
        const value = args[0];
        const elementType = args[1];
        nodeProps["onKeyDown"] = value;
        componentProps[value] = `React.KeyboardEventHandler<${elementType ||
          "any"}>`;
      }
    },
    ...contentPlugins,
  ],
}).catch((err) => {
  console.error(err);
  console.error(err.stack);
  process.exit(1);
});

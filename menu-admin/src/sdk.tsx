import ReactDOM from "react-dom/client";
import App from "./App";
import styles from "./index.css?inline";

interface MountOptions {
  element: string;
  restaurantId: string;
  themeColor?: string;
}

const mount = ({
  element,
  restaurantId,
  themeColor = "default",
}: MountOptions) => {
  const hostElement = document.querySelector<HTMLElement>(element);

  if (!hostElement) {
    throw new Error(`Could not find element "${element}"`);
  }

  const shadowRoot =
    hostElement.shadowRoot ?? hostElement.attachShadow({ mode: "open" });

  const styleElement = document.createElement("style");
  styleElement.textContent = styles;

  const appContainer = document.createElement("div");
  appContainer.className = "menu-admin-sdk";

  shadowRoot.replaceChildren(styleElement, appContainer);

  const root = ReactDOM.createRoot(appContainer);

  root.render(<App restaurantId={restaurantId} themeColor={themeColor} />);
};

export { mount };
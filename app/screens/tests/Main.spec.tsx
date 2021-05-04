import React from "react";
import {render} from "@testing-library/react-native";
import {Provider} from "react-redux";
import {ThemeProvider} from "@shopify/restyle";

import App from "../Main";
import {store} from "../../store/getStore";
import theme from "../../theme/Theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

it("Should render an item", () => {
    const props: Props = {};
    render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App {...props} />
            </ThemeProvider>
        </Provider>,
    );
});

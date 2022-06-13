import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
    persistence: "localStorage",
    secure_cookie: true,
});

const Mixpanel = {
    identify: (id) => {
        mixpanel.identify(id);
    },
    alias: (id) => {
        mixpanel.alias(id);
    },
    track: (name, props) => {
        mixpanel.track(name, props);
    },
    people: {
        set: (props) => {
            mixpanel.people.set(props);
        }
    },
    TYPES: {
        OPEN_SEARCH_MODAL: "OPEN_SEARCH_MODAL",
        SEARCH_ON_MODAL: "SEARCH_ON_MODAL",
        GO_TO_ACCOUNT: "GO_TO_ACCOUNT",
        GO_TO_CART: "GO_TO_CART",
        TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
        ADD_TO_CART: "ADD_TO_CART",
    }
};

export default Mixpanel;
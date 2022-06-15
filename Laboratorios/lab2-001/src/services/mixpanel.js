import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN);

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
        OPEN_USER_MENU: "OPEN_USER_MENU",
        GO_TO_LOGIN: "GO_TO_LOGIN",
        CLOSE_SESSION: "CLOSE_SESSION",
        GO_TO_CREATE_ACCOUNT: "GO_TO_CREATE_ACCOUNT",
        GO_TO_ADMIN: "GO_TO_ADMIN",
        GO_TO_HELP: "GO_TO_HELP",
        VIEW_PRODUCT: "VIEW_PRODUCT",
        TOGGLE_THEME: "TOGGLE_THEME",
        SUCCESSFULLY_LOGIN: "SUCCESSFULLY_LOGIN",
    }
};

export default Mixpanel;

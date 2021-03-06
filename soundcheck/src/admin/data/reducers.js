const DEFAULT_STATE = {
    speakables: {
        posts: [],
        pages: []
    },
    voiceApps: {
        selectedAppId: null,
        apps: [],
        news: {},
        loaded: false
    },
    soundcheckAuth: {
        user: null,
        loaded: false,
        token: localStorage.getItem("jwt")
    }
};

const speakables = (state = DEFAULT_STATE.speakables, action) => {
    // console.log("speakables reducing", action);
    // console.log(state);
    switch (action.type) {
        case 'SPEAKABLE_SET_POSTS':
            return {
                ...state,
                posts: action.posts
            };
        case 'SPEAKABLE_SET_PAGES':
            return {
                ...state,
                pages: action.pages
            };
        default:
            return state;
    }
};

const voiceApps = (state = DEFAULT_STATE.voiceApps, action) => {
    // console.log("voiceapps reducing", action);
    // console.log(state);
    switch (action.type) {
        case 'VOICEAPPS_SET_APPS':
            return {
                ...state,
                apps: action.apps,
                selectedAppId: (action.apps.length > 0 ? action.apps[0].id : null),
                loaded: true
            };
        case 'VOICEAPPS_SET_NEWS':
            return {
                ...state,
                news: { ...state.news, [action.appId]: action.news }
            };
        case 'VOICEAPPS_SELECT_APP':
            return {
                ...state,
                selectedAppId: action.id
            };
        default:
            return state;
    }
};

const soundcheckAuth = (state = DEFAULT_STATE.soundcheckAuth, action) => {
    // console.log("auth reducing", action);
    // console.log(state);
    switch (action.type) {
        case 'AUTH_SET_USER':
            return {
                ...state,
                user: action.user,
                loaded: true
            };
        case 'AUTH_SET_TOKEN':
            localStorage.setItem("jwt", action.token);
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
}

export { speakables, voiceApps, soundcheckAuth };
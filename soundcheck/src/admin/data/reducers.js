const DEFAULT_STATE = {
    speakables: {
        posts: [],
        pages: []
    },
    voiceApps: {
        selectedAppId: null,
        apps: [],
        stats: {},
        sources: {}
    },
    soundcheckAuth: {
        user: null,
        token: localStorage.getItem("jwt")
    }
};

const speakables = (state = DEFAULT_STATE.speakables, action) => {
    console.log("speakables reducing", action);
    console.log(state);
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
    console.log("voiceapps reducing", action);
    console.log(state);
    switch (action.type) {
        case 'VOICEAPPS_SET_APPS':
            return {
                ...state,
                apps: action.apps,
                selectedAppId: (action.apps.length > 0 ? action.apps[0].id : null)
            };
        case 'VOICEAPPS_SET_SOURCES':
            return {
                ...state,
                sources: { ...state.sources, [action.commandId]: action.sources }
            };
        case 'VOICEAPPS_SET_STATS':
            const time = Math.round((action.end - action.start) / 1000 / 3600 / 24);
            return {
                ...state,
                stats: { ...state.stats, [`${action.appId}-${time}`]: action.stats }
            };
        case 'VOICEAPPS_SET_SOURCE':
            let sources = { ...state.sources };
            sources[action.commandId].map(s => s.id == action.source.id ? action.source : s);
            return {
                ...state,
                sources
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
    console.log("auth reducing", action);
    console.log(state);
    switch (action.type) {
        case 'AUTH_SET_USER':
        console.log("SETTING USER",action.user)
            return {
                ...state,
                user: action.user
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
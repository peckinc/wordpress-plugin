const actions = {

    setSpeakablePosts(posts) {
        return {
            type: 'SPEAKABLE_SET_POSTS',
            posts,
        };
    },

    setSpeakablePages(pages) {
        return {
            type: 'SPEAKABLE_SET_PAGES',
            pages,
        };
    },

    setVoiceApps(apps) {
        return {
            type: 'VOICEAPPS_SET_APPS',
            apps,
        };
    },

    setSelectedVoiceAppId(appId) {
        return {
            type: 'VOICEAPPS_SELECT_APP',
            id: appId
        };
    },

    setSpeakableNews(appId,news) {
        return {
            type: 'VOICEAPPS_SET_NEWS',
            appId,
            news
        };
    },

    setUser(user) {
        return {
            type: 'AUTH_SET_USER',
            user
        };
    },

    fetchFromWPAPI( path ) {
        return {
            type: 'FETCH_FROM_WPAPI',
            path,
        };
    },

    fetchFromSoundcheckAPI( path ) {
        return {
            type: 'FETCH_FROM_SOUNDCHECKAPI',
            path,
        };
    },

    updateToSoundcheckAPI(path,body) {
        return {
            type: 'UPDATE_TO_SOUNDCHECKAPI',
            path,
            body
        };
    },

    fetchVoiceAppDetailsFromSoundcheckAPI( voiceApp ) {
        return {
            type: 'FETCH_VOICE_APP_DETAILS_FROM_SOUNDCHECKAPI',
            voiceApp,
        };
    },
};

export {actions};
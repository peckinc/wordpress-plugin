import { render } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import soundcheckApiFetch from './api/soundcheck-api-fetch'
import { combineReducers, registerStore } from '@wordpress/data';

import PageLayout from './layout/index';
import { speakables, voiceApps, soundcheckAuth } from './data/reducers';
import { actions } from './data/actions';

registerStore('soundcheck', {
    reducer: combineReducers({ speakables, voiceApps, soundcheckAuth }),

    actions,

    selectors: {
        getSpeakablePosts(state) {
            const { speakables } = state;
            const posts = speakables.posts;

            return posts;
        },

        getSpeakablePages(state) {
            const { speakables } = state;
            const pages = speakables.pages;

            return pages;
        },

        getVoiceApps(state) {
            const { voiceApps } = state;
            return voiceApps.apps;
        },

        getCommandSources(state, appId, commandId) {
            const { voiceApps } = state;
            return voiceApps.sources[commandId];
        },

        getSelectedVoiceAppId(state) {
            const { voiceApps } = state;

            return voiceApps.selectedAppId;
        },

        getVoiceAppStats(state, appId, start, end) {
            const { voiceApps } = state;

            const time = Math.round((end - start) / 1000 / 3600 / 24);
            return voiceApps.stats[`${appId}-${time}`];

        },

        getUser(state) {
            const { soundcheckAuth } = state;
            console.log("auth state", state);
            return soundcheckAuth.user;

        }
    },

    controls: {
        FETCH_FROM_WPAPI(action) {
            return apiFetch({ path: action.path });
        },
        FETCH_FROM_SOUNDCHECKAPI(action) {
            return soundcheckApiFetch({ path: action.path });
        },

    },

    /**
     * These resolvers call the API the first time through
     * The * syntax is a generator function and `yield` indicates the code that will run on the first time through.
     */
    resolvers: {
        * getSpeakablePosts(page) {
            const path = `/wp/v2/posts?page=${page}`;
            const posts = yield actions.fetchFromWPAPI(path);
            return actions.setSpeakablePosts(posts);
        },

        * getSpeakablePages(page) {
            const path = `/wp/v2/pages?page=${page}`
            const pages = yield actions.fetchFromWPAPI(path);
            return actions.setSpeakablePages(pages);
        },

        * getVoiceApps() {
            const path = `/v4/user/voice_apps`
            const apps = yield actions.fetchFromSoundcheckAPI(path);
            return actions.setVoiceApps(apps);
        },

        * getVoiceAppStats(appId, start, end) {
            const path = `/v4/user/voice_apps/${appId}/stats?start=${start}&end=${end}`;
            const stats = yield actions.fetchFromSoundcheckAPI(path)
            return actions.setVoiceAppStats(appId, stats, start, end);
        },

        * getCommandSources(voiceAppId, commandId) {
            const path = `/v4/user/voice_apps/${voiceAppId}/commands/${commandId}/sources`;
            const sources = yield actions.fetchFromSoundcheckAPI(path)
            return actions.setCommandSources(commandId, sources);
        },

        * getUser() {
            const path = `/v4/user`;
            try {
                const user = yield actions.fetchFromSoundcheckAPI(path);
                return actions.setUser(user);
            } catch (e) {
                return actions.setUser(null);
            }

        },
    },
});

render(
    <PageLayout></PageLayout>,
    document.getElementById('soundcheck-root')
);
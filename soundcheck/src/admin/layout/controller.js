import { Component, createElement } from '@wordpress/element';
import { compose, withState } from '@wordpress/compose';

import Dashboard from '../dashboard';
import VoiceApps from '../voice-apps';
import SpeakableNews from '../speakable-news';

let uri = window.location.search;

let pageParams = /[?&]page=([^&]*)/.exec(uri);
let page = decodeURIComponent(pageParams[1]);

const Controller = withState(
	{
		route: page
	}
)(({ route }) => {
	switch (route) {
		case 'soundcheck-structured-data':
			return 
		case 'soundcheck-speakable-news':
			return <SpeakableNews></SpeakableNews>
		case 'soundcheck-voice-interactions':
			return <VoiceApps></VoiceApps>
		default:
			return <Dashboard></Dashboard>
	}

});

export { Controller };

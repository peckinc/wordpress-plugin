import { Component, createElement } from '@wordpress/element';
import { compose, withState } from '@wordpress/compose';

import Dashboard from '../dashboard';
import VoiceApps from '../voice-apps';
import VoiceHosting from '../voice-hosting';

let uri = window.location.search;

let pageParams = /[?&]page=([^&]*)/.exec(uri);
let page = decodeURIComponent(pageParams[1]);

const Controller = withState(
	{
		route: page
	}
)(({ route }) => {
	console.log(route);
	switch (route) {
		case 'soundcheck-structured-data':
			return 
		case 'soundcheck-voice-hosting':
			return <VoiceHosting></VoiceHosting>
		case 'soundcheck-voice-interactions':
			return <VoiceApps></VoiceApps>
		default:
			return <Dashboard></Dashboard>
	}

});

export { Controller };

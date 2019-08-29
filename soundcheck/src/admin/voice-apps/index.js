import { Panel, PanelBody, PanelRow, SelectControl, Spinner, ExternalLink } from '@wordpress/components';
import {Fragment} from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import Analytics from '../voice-apps/analytics';
import './style.scss';
import CommandPanelBody from './command';
import Footer from '../components/footer';
import SignIn from '../sign-in';
import ListDomainPanel from '../components/list-domain';
import CreateListingButton from '../create-listing-button';
import alexa from '../images/alexa.png';
import google from '../images/google.png';
import soundcheck from '../images/soundcheck.png';

import { soundcheckUrl } from '../environment';

const VoiceApps = withSelect((select, ownProps) => {
    const { getUser, getUserLoaded } = select('soundcheck');
    const user = getUser();
    const loaded = getUserLoaded();
    return {
        user,
        loaded
    }
})(({ user, loaded }) => {
    if (!loaded) {
        return <Spinner></Spinner>;
    } else if (user) {
        return <VoiceAppsPanel className="margin-bottom"></VoiceAppsPanel>;
    } else {
        return (
            <div className="flex-grid">
                <div class="col margin-bottom">
                    <Panel header="Voice Interactions">
                        <PanelBody>
                            <p><strong>Set up your Voice Interactions to define how users can engange with your voice presence.</strong></p>
                            <p>Manage your content using WordPress as your CMS and then publish your interactions to popular voice assistants.</p>
                            <PanelRow>
                                <img src={alexa} width="128" />
                                <img src={google} width="128" />
                                <img src={soundcheck} width="128" />
                            </PanelRow>
                            <hr />
                            <p>Start by signing up for a free Soundcheck account.</p>
                            <p>
                                <CreateListingButton />
                            </p>


                        </PanelBody>
                    </Panel>
                </div>
                <SignIn className="col margin-bottom"></SignIn>
            </div>);
    };
});

const VoiceAppsPanel = withSelect((select, ownProps) => {
    const { getVoiceApps, getVoiceAppsLoaded } = select('soundcheck');
    const hostname = window.location.hostname;
    const apps = getVoiceApps();
    const loaded = getVoiceAppsLoaded();
    const selectedApp = apps.find(va => { return (va.domain == hostname) });
    return {
        selectedApp: selectedApp,
        voiceApps: apps,
        domain: hostname,
        loaded
    }
})(({ className, selectedApp, loaded, icon, domain }) => {

    if (!loaded) {
        return <Spinner></Spinner>;
    } else if (selectedApp) {
        return <Fragment>

            <Panel header="Voice Apps" className={className ? className : ''}>
                <PanelBody
                    title={`${selectedApp.term} Voice Activity`}
                    icon={icon}
                    initialOpen={true}
                >
                    <p>See which platforms are accessing your published voice content.</p>
                    <p><ExternalLink href={`${soundcheckUrl}/app/properties/${selectedApp.id}/availability`}>Edit Availability</ExternalLink></p>

                    <Analytics app={selectedApp}></Analytics>

                </PanelBody>
            </Panel>
            <Panel header="Voice Interactions" className={className ? className : ''}>
                <PanelBody>
                    <p>Your Voice Interactions define how users can engange with your voice presence. Each interaction represents a question or command from a user and the response from the voice assistant.</p>
                    <p><ExternalLink href={`${soundcheckUrl}/app/properties/${selectedApp.id}/interactions`}>Manage Interactions</ExternalLink></p>
                    {selectedApp && <Panel className={className ? className : ''}>
                        {selectedApp && selectedApp.commands.map(c => (<CommandPanelBody app={selectedApp} command={c} />))}
                    </Panel>}
                    <Footer />
                </PanelBody>
            </Panel>
        </Fragment>
    } else {
        return <ListDomainPanel domain={domain}></ListDomainPanel>
    }
}
);

export default VoiceApps;
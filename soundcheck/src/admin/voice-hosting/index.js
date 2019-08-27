import { Panel, PanelBody, PanelRow, Notice, Spinner, ExternalLink } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';

import { soundcheckUrl } from '../environment';
import './style.scss';
import Analytics from '../voice-apps/analytics';
import Footer from '../components/footer';
import SignIn from '../sign-in';
import ListDomainPanel from '../components/list-domain';
import CreateListingButton from '../create-listing-button';
import alexa from '../images/alexa.png';
import google from '../images/google.png';
import soundcheck from '../images/soundcheck.png';

const VoiceHosting = withSelect((select, ownProps) => {
    const { getUser, getUserLoaded } = select('soundcheck');
    const user = getUser();
    const loaded = getUserLoaded();
    return {
        user,
        loaded
    }
})(({ user, loaded }) => {
    if (!loaded) {
        return <div></div>;
    } else if (user) {
        return <VoiceHostingPanel className="margin-bottom"></VoiceHostingPanel>;
    } else {
        return (
            <div className="flex-grid">
                <div class="col margin-bottom">
                    <Panel header="Bring Your Business to Voice">
                        <PanelBody>
                            <p><strong>Voice is the future. Are you ready for it?</strong></p>
                            <p>Soundcheck is a free publishing tool to get your business onto voice devices. Discover the easiest way to publish content optimized for voice on your website or directly to smart speakers like Amazon Echo or Google Home.</p>
                            <ol>
                                <li>Monitor and understand how your web content is used by voice assistants.</li>
                                <li>Easily define answers to common voice-initiated questions.</li>
                                <li>Create and validate "Speakable" web content using custom editor blocks.</li>
                                <li>Use WordPress as a voice CMS.</li>
                                <li>Publish to voice assistants like Amazon Alexa and Google Home.</li>
                            </ol>
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

const VoiceHostingPanel = withSelect((select, ownProps) => {
    const { getVoiceApps, getSelectedVoiceAppId, getVoiceAppsLoaded } = select('soundcheck');
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
})(({ className, selectedApp, icon, domain, loaded }) => {

    if (!loaded) {
        return <div></div>;
    } else if (selectedApp) {
        return <Panel header="Voice Hosting" className={className ? className : ''}>
            <PanelBody
                title={`${selectedApp.term} Voice Activity`}
                icon={icon}
                initialOpen={true}
            >
                <p>See which platforms are accessing your published voice content.</p>
                <p><ExternalLink href={`${soundcheckUrl}/app/properties/${selectedApp.id}/availability`}>Edit Availability</ExternalLink></p>

                <Analytics app={selectedApp}></Analytics>

            </PanelBody>
            <PanelBody
                title={`${domain} Voice Property`}
                icon={icon}
                initialOpen={true}
            >
                {(selectedApp.authStatus != 'VALID') && <Notice status="info" isDismissible={false}>You will need to verify ownership of {selectedApp.domain} before your voice property is published.</Notice>}
                <p><ExternalLink href={`${soundcheckUrl}/app/properties/${selectedApp.id}/settings`}>Edit Voice Property</ExternalLink></p>
                <PanelRow>
                    <img src={selectedApp.banner1920x1080} style={{ maxWidth: "100%" }} />
                </PanelRow>
            </PanelBody>
            <PanelBody>
                <Footer />
            </PanelBody>
        </Panel>
    } else {
        return <ListDomainPanel domain={domain}></ListDomainPanel>
    }
}
);

export default VoiceHosting;
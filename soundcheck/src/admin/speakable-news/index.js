import { Panel, PanelBody, PanelRow, Spinner, ExternalLink, Icon } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { withState } from '@wordpress/compose';
import Table from '../components/table';
import icons from '../../icons';
import './style.scss';
import SpeakableIcon from '../components/speakable-icon';
import Footer from '../components/footer';
import SignIn from '../sign-in';
import ListDomainPanel from '../components/list-domain';
import CreateListingButton from '../create-listing-button';
import google_home from '../images/google_home.png';
import google_news from '../images/google_news.png';
import ArticleDetailModal from './detail-modal';
import { soundcheckUrl } from '../environment';

const SpeakableNews = withSelect((select, ownProps) => {
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
        return <SpeakableNewsPanel className="margin-bottom"></SpeakableNewsPanel>;
    } else {
        return (
            <div className="flex-grid">
                <div class="col margin-bottom">
                    <Panel header="News Optimized for Voice Devices">
                        <PanelBody>
                            <p><strong>Let your web news articles reach a wider voice audience.</strong></p>
                            <p>If your articles appear in Google News you should always add <code>speakable</code> content. The <code>speakable</code>
                                parts are eligible to be dictated by Google Home devices as a response to user questions.</p>
                            <ol>
                                <li>Monitor and understand how your web content is used by voice assistants.</li>
                                <li>Track how your articles are picked up by Google News.</li>
                                <li>Create and validate "speakable" web content using custom editor blocks.</li>
                            </ol>
                            <PanelRow>
                                <div className="works-item"><img src={google_news} width="128" /><p>Works with Google News</p></div>
                                <div className="works-item"><img src={google_home} width="128" /><p>Works with Google Home</p></div>

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

const SpeakableNewsPanel = withSelect((select, ownProps) => {
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
        return <Panel header="Speakable News" className={className ? className : ''}>
            <PanelBody>
                <p>If your website is a Google News Producer you can make your articles eligible to be read on Google Home devices.</p>
                <p><ExternalLink href={`${soundcheckUrl}/app/properties/${selectedApp.id}/news`}>Manage Speakable News</ExternalLink></p>
            </PanelBody>
            {selectedApp.rssUrl ?
                <Fragment>
                    <ArticlesPanelBody voiceApp={selectedApp}
                    >
                    </ArticlesPanelBody>
                    <PanelBody>
                        <p>The table above shows articles published through your RSS feed.</p>
                        <ul>
                            <li><strong>TITLE</strong> - The article's <code>&#x3C;title&#x3E;</code> tag.</li>
                            <li><strong>PUB DATE</strong> - Publication date from the RSS feed.</li>
                            <li><strong>NEWS</strong> - Has it been seen in Google News?</li>
                            <li><strong>SPEAK</strong> - Does it contain <code>speakable</code> content?</li>
                            <li><strong>META</strong> - Does it contain proper metadata in the <code>&#x3C;head&#x3E;</code> section.</li>
                            <li><strong>STRUCT</strong> - Does it contain <code>JSON+LD</code> structured data.</li>
                        </ul>
                    </PanelBody>
                </Fragment>
                : null}
            <PanelBody>
                <Footer />
            </PanelBody>
        </Panel>
    } else {
        return <ListDomainPanel domain={domain}></ListDomainPanel>
    }
}
);

const ArticlesPanelBody = withSelect((select, ownProps) => {
    const { getSpeakableNews } = select('soundcheck');
    let news = getSpeakableNews(ownProps.voiceApp.id);

    console.log(news);
    return {
        data: news
    };
})(({ data, voiceApp }) => {
    const formattedData = data ? data.map(row => [
        { component: <a href={row.url} dangerouslySetInnerHTML={{ __html: (row.speakableValidation.metadata && row.speakableValidation.metadata.title) ? row.speakableValidation.metadata.title : '...' }}></a> },
        { value: (new Date(row.publishDate)).toLocaleDateString(), align: 'center' },
        { component: <NewsIcon newsPresence={row.newsPresence}></NewsIcon>, align: 'center' },
        { component: <SpeakableIcon isValid={row.speakable} color={icons.colors.speakable_purple} tooltip="Valid Specification" />, align: 'center' },
        { component: <CheckIcon isValid={(row.speakableValidation.metadata && row.speakableValidation.metadata.description)}></CheckIcon>, align: 'center' },
        { component: <CheckIcon isValid={(row.speakableValidation && row.speakableValidation.linkeddata && row.speakableValidation.linkeddata.length)}></CheckIcon>, align: 'center' },
        { component: <DetailIcon article={row}></DetailIcon>, align: 'center' }
    ]) : [];
    return (
        <PanelBody
            title='News Articles'
            icon='rss'
            initialOpen={true}
        >
            <PanelRow>
                {formattedData.length > 0 ?
                    <Table data={formattedData} headers={['Title', 'Pub Date', 'News', 'Speak', 'Meta', 'Struct', '']} />
                    : <p>No articles with Speakable data yet. Add a Speakable block to a articles to get started.</p>
                }
            </PanelRow>

        </PanelBody>
    )
}
);

const CheckIcon = ({ isValid }) => {
    return (
        isValid ? <Icon icon="yes-alt" /> : <Icon icon="minus" />
    )
}

const NewsIcon = ({ newsPresence }) => {
    if (!newsPresence) {
        return <span>pending</span>;
    }

    if (!newsPresence.lastCheckedOn) {
        return <span>pending</span>
    } else if (newsPresence.firstSeenOn) {
        return <Icon icon="yes-alt" />
    } else {
        return <Icon icon="minus" />;
    }

}

const DetailIcon = withState({ isOpen: false })(({ isOpen, article, setState }) => {
    return (
        <Fragment>
            <span className="pointer dashicons dashicons-search" onClick={() => setState({ isOpen: true })}></span>
            {isOpen ? <ArticleDetailModal article={article} onRequestClose={() => { setState({ isOpen: false }) }} /> : null}
        </Fragment>
    )
})

export default SpeakableNews;
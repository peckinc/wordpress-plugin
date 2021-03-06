import { Component, Fragment } from '@wordpress/element';
import { Panel, PanelBody, PanelRow, Spinner, Modal, ExternalLink, withSpokenMessages, Button } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose, withState } from '@wordpress/compose';
import Table from '../components/table';
import icons from '../../icons';
import { extractSpeakables } from '../service/speakable-parser';
import { soundcheckUrl } from '../environment';
import SpeakableIcon from '../components/speakable-icon';
import './style.scss';

const Speakables = ({ className }) => (
    <Panel header="Voice-Optimized Web Content" className={className ? className : ''}>
        <PanelBody>
            <p><ExternalLink href={soundcheckUrl + "/speakable-content"}>Speakable content</ExternalLink> is text on your website
        that you designate as optimized for voice assistants. That means it is particularly suited to be read out loud using text to speech.</p>
        </PanelBody>
        <PostsPanelBody />
        <PagesPanelBody />
        <PanelBody>
            <p>The tables above show posts that contain speakable content.</p>
            <ul>
                <li>FORMATTED - the post has a valid <code>SpeakableSpecification</code>.</li>
                <li>SPEAKABLE - the post contains "speakable" content.</li>
            </ul>
            <p>To add speakable content to any post use the "Speakable Section" block in the editor. Click on a SPEAKABLE column check mark
            to preview the content.</p>
        </PanelBody>
    </Panel>
);


const HtmlLoadingSpeakablePanelBody = withState({
    data: [],
    initialized: false,
    loading: false
})(({ json, data, setState, type, icon, loading, initialized }) => {

    if (!initialized) {
        if (json.length) {
            let initialData = json.map(j => {
                return {
                    ...j,
                    loaded: false,
                    hasSpeakableSpecification: false,
                    isSpeakable: false,
                    content: null,
                    validations: [],
                    speakables: null
                }
            })
            setState({ data: initialData, initialized: true })
        }
    } else if (!loading) {
        setState({ loading: true });
        for (let post of data) {

            loadSpeakbleFromPost(post).then(({ specification, content, speakables, validations }) => {

                let nextData = [...data];

                let p = nextData.find(p => p.id === post.id);
                p.loaded = true;
                p.hasSpeakableSpecification = (specification ? true : false);
                p.isSpeakable = (speakables && speakables.length);
                p.content = content;
                p.validations = validations;
                setState({ data: nextData });
            });
        }

    }
    const formattedData = data.map(row => [
        { component: <a href={row.link} dangerouslySetInnerHTML={{ __html: row.title.rendered }}></a> },
        { value: (new Date(row.date)).toLocaleDateString(), align:'center' },
        { component: <SpeakableIcon isLoading={!row.loaded} isValid={row.hasSpeakableSpecification} color={icons.colors.speakable_purple} tooltip="Valid Specification" />, align:'center' },
        { component: <ValidatingSpeakableIcon isLoading={!row.loaded} validations={row.validations} content={row.content} />, align:'center' }]);
    return (
        <PanelBody
            title={`${type}s`}
            icon={icon}
            initialOpen={true}
        >
            <PanelRow>
                {formattedData.length > 0 ?
                    <Table data={formattedData} headers={['Title', 'Date', 'Formatted', 'Speakable']} />
                    : <p>No {type}s with Speakable data yet. Add a Speakable block to a {type} to get started.</p>
                }
            </PanelRow>
        </PanelBody>
    )
})

async function loadSpeakbleFromPost(post) {
    let response = await fetch(post.link);
    let html = await response.text();

    let s = extractSpeakables(html);

    return s;
}

const PostsPanelBody = withSelect((select, ownProps) => {
    const { getSpeakablePosts } = select('soundcheck');
    let posts = getSpeakablePosts(1);

    return {
        json: posts,
        type: 'Post',
        icon: 'admin-post'
    };
})(HtmlLoadingSpeakablePanelBody);

const PagesPanelBody = withSelect((select, ownProps) => {
    const { getSpeakablePages } = select('soundcheck');

    let pages = getSpeakablePages(1);
    return {
        json: pages,
        type: 'Page',
        icon: 'admin-page'
    };
})(HtmlLoadingSpeakablePanelBody);

const ValidatingSpeakableIcon = withState({ isOpen: false })(({ isLoading, isOpen, validations, content, setState }) => {

    if (isLoading) {
        return <Spinner />;
    } else if (!content) {
        return <span className="dashicons dashicons-minus"></span>
    } else if (validations.length) {
        return <Fragment>
            <span className="pointer dashicons dashicons-warning" onClick={() => setState({ isOpen: true })}></span>
            {isOpen ? <SpeakableModal validations={validations} content={content} onRequestClose={() => { setState({ isOpen: false }) }} /> : null}
        </Fragment>
    } else {
        return <Fragment>
            <span className="pointer" onClick={() => setState({ isOpen: true })}>{icons.speakable("Speakable Content Found", icons.colors.speakable_purple)}</span>
            {isOpen ? <SpeakableModal validations={validations} content={content} onRequestClose={() => { setState({ isOpen: false }) }} /> : null}
        </Fragment>
    }
})


const SpeakableModal = ({ validations, content, onRequestClose }) => {
    return (
        <Modal
            title="Speakable Content"
            onRequestClose={onRequestClose}>
            {validations.length ?
                <ul>
                    {validations.map((v, i) => {
                        return <li key={i}>{v.type == 'error' ? <span className="dashicons dashicons-warning"></span> : <span className="dashicons dashicons-info"></span>} {v.message}</li>
                    })}
                </ul>
                : <p><span className="dashicons dashicons-yes"></span> Valid Speakable content.</p>}
            <hr />
            <p>Preview</p>
            <blockquote>{content}</blockquote>
        </Modal>
    )
}

export default Speakables;
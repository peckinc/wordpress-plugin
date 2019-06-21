import { Component, Fragment } from '@wordpress/element';
import { TextControl, PanelBody, PanelRow, SelectControl, ExternalLink, Button, IconButton, Modal, RadioControl } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose, withState } from '@wordpress/compose';
import {decodeEntities} from '@wordpress/html-entities';
import soundcheckApiFetch from '../api/soundcheck-api-fetch';
import { soundcheckUrl, soundcheckApiUrl } from '../environment';

import './command.scss';

const CommandPanelBody = withSelect(

    (select, ownProps) => {
        const { app, command } = ownProps;
        const { getCommandSources } = select('soundcheck');
        const sources = command ? getCommandSources(app.id, command.id) : undefined;
        return {
            sources
        }
    })(({ command, app, sources }) => {

        let phrase = command.id;

        if (command.intent) {
            phrase = command.intent.name;
        }

        return (
            <PanelBody
                title={phrase}
                initialOpen={true}
            >
                <p>{command.intent.description}</p>
                {sources && sources.map(s => (<SourceRow source={s} app={app} command={command} />))}
                {sources && <AudioPreview app={app} command={command} />}
            </PanelBody>
        )
    })


const AudioPreview = withState({
    isPreviewing: false,
    relaoding: false,
    url: null
})(
    ({ app, command, isPreviewing, reloading, setState, url }) => {
        let previewUrl = `${soundcheckApiUrl}/v4/domains/${app.id}/commands/${command.id}/audio`;

        return (
            <PanelRow>
                <div className="soundcheck-source__preview">
                    {isPreviewing ?
                        !reloading ?
                            <Fragment>
                                <audio controls>
                                    <source src={url} type="audio/mpeg"></source>
                                </audio>
                                <IconButton icon="update" onClick={() => {
                                    setState({ reloading: true });
                                    setTimeout(() => { setState({ reloading: false }); }, 1000);
                                }}></IconButton>
                            </Fragment>
                            :
                            <IconButton icon="update" isBusy></IconButton>
                        :
                        <IconButton icon="controls-volumeon" label="Preview" isDefault onClick={() => { setState({ isPreviewing: true, url: previewUrl }) }}></IconButton>
                    }
                </div>
            </PanelRow>

        )

    })


const SourceRow = ({ source, app, command }) => {
    return (
        <PanelRow>
            <div className="soundcheck-source__row">
                {source.contentSource.uuid == 'SPEAKABLE' ?
                    <SpeakableSourceCell source={source} app={app} command={command} /> :
                    <ExternalSourceCell source={source} app={app} command={command} />}
                <div className="soundcheck-source__row__item">{source.contentSource.name}</div>
            </div>
        </PanelRow>
    )
}

const ExternalSourceCell = ({ source, app, command }) => {
    return (<div className="soundcheck-source__row__item"><ExternalLink href={`${soundcheckUrl}/app/properties/${app.id}/interactions`}>{source.label}</ExternalLink></div>)
}


const SpeakableSourceCell = compose(
    [withState({
        isOpen: false,
        option: undefined,
        url: undefined,
        selectedPage: undefined,
        selectedPost: undefined,
        initialized: false
    })],
    [withSelect((select, ownProps) => {
        const { getSpeakablePosts, getSpeakablePages } = select('soundcheck');
        return {
            pages: getSpeakablePages(1),
            posts: getSpeakablePosts(1),
        }
    })],
    [withDispatch((dispatch, ownProps) => {
        const { setCommandSource } = dispatch('soundcheck');
        return {
            onClick: (value) => {
                const url = `/v4/user/voice_apps/${ownProps.app.id}/commands/${ownProps.command.id}/sources/${ownProps.source.id}`;
                ownProps.source.global.url = value;
                return soundcheckApiFetch({ path: url, method: 'PUT', body: ownProps.source }).then(s => {
                    setCommandSource(ownProps.command.id, s);
                });
            }
        }
    })],

)(({ isOpen, setState, source, onClick, pages, posts, option, url, initialized, selectedPage, selectedPost }) => {
    let pageOptions = pages.map(page => { return { label: decodeEntities(page.title.rendered), value: page.link } });
    pageOptions.unshift({ label: "<Select a Page>", value: '' });
    let postOptions = posts.map(page => { return { label: decodeEntities(page.title.rendered), value: page.link } });
    postOptions.unshift({ label: "<Select a Post>", value: '' });


    if (!initialized) {
        let state = {
            option: undefined,
            url: undefined,
            selectedPage: '',
            selectedPost: '',
            initialized: true
        }

        state.url = source.global.url;
        state.option = 'custom';
        if (state.url) {
            for (let p of pageOptions) {
                if (p.link == state.url) {
                    state.option = 'page';
                    state.selectedPage = state.url;
                }
            }
            for (let p of postOptions) {
                if (p.link == state.url) {
                    state.option = 'post';
                    state.selectedPost = state.url;
                }
            }
        }

        setState(state);
    }

    return (
        <Fragment>
            <div className="soundcheck-source__row__item"><Button isLink onClick={() => setState({ isOpen: true })}>{source.label}</Button></div>
            {isOpen ?
                <Modal
                    title="Speakable Content"
                    onRequestClose={() => setState({ isOpen: false })}>
                    <form>
                        <RadioControl
                            label="Select a source with Speakable content."
                            selected={option}
                            options={[
                                { label: 'A Recent Blog Page', value: 'page' },
                                { label: 'A Recent Blog Post', value: 'post' },
                                { label: 'Other URL', value: 'custom' },
                            ]}
                            onChange={(option) => { setState({ option }) }}
                        />

                        {(() => {
                            switch (option) {
                                case 'post':
                                    return (<SelectControl
                                        label="Select a Post"
                                        value={selectedPost}
                                        options={postOptions}
                                        onChange={(value) => { setState({ url: value, selectedPost: value }) }}
                                    />)
                                case 'page':
                                    return (<SelectControl
                                        label="Select a Page"
                                        value={selectedPage}
                                        options={pageOptions}
                                        onChange={(value) => setState({ url: value, selectedPage: value })}
                                    />)
                                case 'custom':
                                    return (<TextControl
                                        label="Other URL"
                                        value={url}
                                        onChange={(value) => setState({ url: value })}
                                    />)
                            }
                        })()}
                        <Button isDefault onClick={() => {
                            setState({ isOpen: false });
                            onClick(url);
                        }}>
                            Save
                </Button>
                    </form>
                </Modal>
                : null}
        </Fragment>
    )
});

export default CommandPanelBody;

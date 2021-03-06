/**
 * BLOCK: soundcheck
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, RichText } = wp.editor;
const { Fragment } = wp.element;
const { PanelBody, SelectControl } = wp.components;


import VoiceAppName from './components/voice-app-name';
import VoiceApp from './components/voice-app';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('soundcheck/voice-app', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Voice App Widget'), // Block title.
    icon: 'category', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'soundcheck', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    keywords: [
        __('Speakable'),
        __('voice'),
        __('alexa'),
    ],
    attributes: {
        intro: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        invocations: {
            type: 'array',
            source: 'children',
            selector: '.invocations',
        },
        phrase: {
            type: 'string'
        }
    },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
    edit: (props) => {
        const { className, isSelected, attributes, setAttributes } = props;
        const { phrase } = attributes;
        return (
            phrase
                ? (<VoiceApp {...props} />)
                : (<VoiceAppName {...props}/>)
        )
    },

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
    save: (props) => {

        return (
            <div className={props.className}>
                <RichText.Content tagName='p' value={props.attributes.intro}/>
                <RichText.Content tagName='ul' value={props.attributes.invocations}/>
            </div>
        )
    }

});
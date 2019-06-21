/**
 * BLOCK: soundcheck
 *
 * Registering a basic block with Gutenberg.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
    RichText,
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    withColors
} = wp.editor;

const { Fragment } = wp.element;
const { PanelBody, SelectControl, ToggleControl } = wp.components;

import icons from '../../icons';

const applyWithColors = withColors(
	'backgroundColor',
	{ textColor: 'color' },
);

const attributes = {
    content: {
        type: 'array',
        source: 'children',
        selector: 'p',
    },
    jsonType: {
        type: 'string',
        default: 'WebPage'
    },
    includeJson: {
        type: 'boolean',
        default: true
    }
}

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
registerBlockType('soundcheck/speakable', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Speakable Section'), // Block title.
    icon: icons.speakable("Speakable", icons.colors.speakable_purple), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'soundcheck', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    keywords: [
        __('Speakable'),
        __('voice'),
        __('alexa'),
    ],
    attributes: attributes,

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
    edit: (props) => {
        const { attributes: { content, alignment, includeJson, jsonType }, setAttributes, className, isSelected } = props;
        const onChangeContent = (newContent) => {
            setAttributes({ content: newContent });
        }
        const onChangeAlignment = (newAlignment) => {
            setAttributes({ alignment: newAlignment === undefined ? 'none' : newAlignment });
        }

        return (
            <Fragment>
                {isSelected &&
                    <InspectorControls>
                        <PanelBody title={"Structured Data"}>
                            <p>In order for search engines to locate the speakable content on your site, make sure 
                                you have the correct <code>SpeakableSpecification</code> in your post's structured data.</p>
                        </PanelBody>
                    </InspectorControls>
                }

                <BlockControls>
                    <AlignmentToolbar
                        value={alignment}
                        onChange={onChangeAlignment}
                    />
                </BlockControls>
                <RichText
                    className={className}
                    style={{ textAlign: alignment }}
                    tagName="p"
                    onChange={onChangeContent}
                    value={content}
                />
            </Fragment>
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
        return <RichText.Content tagName="p" value={props.attributes.content} className="wp-block-soundcheck-speakable" />;
    },

    deprecated: [
        {
            attributes: attributes,

            save: function (props) {
                let content = <RichText.Content tagName="p" value={props.attributes.content} className="wp-block-soundcheck-speakable" />;
                    let json = {
                        "@context": "http://schema.org/",
                        "@type": (props.attributes.jsonType ? props.attributes.jsonType : "WebPage"),
                        speakable: {
                            "@type": "SpeakableSpecification",
                            cssSelector: [".is-style-speakable", ".wp-block-soundcheck-speakable"]
                        }
                    }

                    let micro = wp.element.createElement('script', { type: "application/ld+json" }, JSON.stringify(json));
                    return <Fragment>
                        {micro}
                        {content}
                    </Fragment>;
            }
        },
        {
            attributes: attributes,

            save: function (props) {
                return <RichText.Content tagName="p" value={props.attributes.content} className="wp-block-soundcheck-speakable" />;
            },
        }
    ]
});

wp.blocks.registerBlockStyle('core/paragraph', {
    name: 'speakable',
    label: 'Speakable'
});
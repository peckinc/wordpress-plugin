
/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { Toolbar, TextControl, Button } = wp.components;
const { AlignmentToolbar, BlockControls, RichText } = wp.editor;

class VoiceApp extends Component {

    constructor(props) {
        super(...arguments);
    }

    render() {

        const {
            attributes,
            isSelected,
            setAttributes
        } = this.props;
        const { intro, phrase, invocations } = attributes;

        return (
            <div className="className">
                <RichText tagName='p' inline={true} value={intro} onChange={(value)=>setAttributes({intro:value})}/>
                <RichText tagName='ul' multiline='li' value={invocations} onChange={(value)=>setAttributes({invocations:value})} className='invocations'/>

            </div>
        )

    }
};

export default VoiceApp;
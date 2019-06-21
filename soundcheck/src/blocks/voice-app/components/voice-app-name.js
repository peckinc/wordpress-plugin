
/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { Toolbar, TextControl, Button } = wp.components;
const { AlignmentToolbar, BlockControls } = wp.editor;

class VoiceAppName extends Component {

    constructor(props) {
        super(...arguments);
    }

    generate (phrase, setAttributes) {
        let intro = `Get the latest news and information about ${phrase} on your smart speaker.`
        let items = [];

        items.push({ "type": "li", "props": { "children": [`Alexa, enable ${phrase}.`] } })
        items.push({ "type": "li", "props": { "children": [`Hey Google, open ${phrase}.`] } })

        setAttributes({ phrase: phrase, intro: intro, invocations: items })
    }

    render() {

        const {
            attributes,
            isSelected,
            setAttributes,
            //onGenerate
        } = this.props;
        //const { phrase } = attributes;
        let phrase;

        return (
            <div className="className">
                <h3>Voice App Widget Generator</h3>
                <p>To start, enter your Voice App invocation phrase. For example, in the command "Alexa open Peck Voice Hosting", the invocation phrase is Peck Voice Hosting</p>

                <Fragment>
                    <TextControl
                        label="Invocation Phrase:"
                        value={phrase}
                        onChange={(p) => phrase = p}
                    />
                    <Button isPrimary onClick={() => { this.generate(phrase, setAttributes) }}>Generate Widget</Button>
                </Fragment>

            </div>
        )
    }
};

export default VoiceAppName;

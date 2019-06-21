import { Component, Fragment } from '@wordpress/element';
import { PanelBody, ExternalLink, ToggleControl, Panel } from '@wordpress/components';

class StructuredData extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			includeJson: false
		}


	}

	componentDidMount() {
		wp.apiFetch({ path: `/wp/v2/posts/${this.props.postId}`, method: 'GET' }).then(
			(data) => {

				this.setState({
					includeJson: data.meta._soundcheck_include_speakable_sd
				});
				return data;
			},
			(err) => {
				return err;
			}
		);
	}

	static getDerivedStateFromProps(nextProps, state) {
		if ((nextProps.isPublishing || nextProps.isSaving) && !nextProps.isAutoSaving) {
			let data = {
				_soundcheck_include_speakable_sd: state.includeJson
			}
			return wp.apiRequest({ path: `/soundcheck-admin/v1/update-structured-data?id=${nextProps.postId}`, method: 'POST', data: data }).then(
				(data) => {
					return data;
				},
				(err) => {
					return err;
				}
			);
		}
		return null;
	}

	render() {
		return (
			<PanelBody title={"Structured Data"}>
				<h3>SpeakableSpecification</h3>
				<ToggleControl
					checked={this.state.includeJson}
					label="Include structured data?"
					help="Places hidden ld+json markup on the page."
					onChange={() => {
						let nextValue = !this.state.includeJson;
						this.setState({ includeJson: nextValue });
					}}
				/>
				<h4>Help</h4>
				<p className="description">The <ExternalLink href="https://pending.schema.org/SpeakableSpecification">SpeakableSpecification</ExternalLink> tells search engines how to
				find the speakable content on a page. You should include this structured data on every
				post that contains speakable content.</p>
				<p className="description">If you use a different tool to manage your structured data, don't add it again here. Instead
				configure that tool to include the following markup:</p>
				<p><pre>{`"speakable":{
  "@type":"SpeakableSpecification",
  "cssSelector":[
	".is-style-speakable",
	".wp-block-soundcheck-speakable"
  ]
}`}</pre></p>

			</PanelBody>
		)
	}


};

export default StructuredData;
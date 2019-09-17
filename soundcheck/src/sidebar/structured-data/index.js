import { Component, Fragment } from '@wordpress/element';
import { PanelBody, ExternalLink, ToggleControl, Panel, CheckboxControl } from '@wordpress/components';

class StructuredData extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			includeJson: false,
			selectors: [],
			initialized: false
		}


	}

	async componentDidMount() {
		//first load settings
		let settings = await wp.apiRequest({ path: `/soundcheck-admin/v1/get-settings?id=${this.props.postId}`, method: 'GET' });
		let defaults = {
			soundcheck_field_sd: settings.soundcheck_field_sd ? settings.soundcheck_field_sd : 'enabled',
			soundcheck_field_selector: settings.soundcheck_field_selector ? settings.soundcheck_field_selector : 'block'
		}
		let data = await wp.apiFetch({ path: `/wp/v2/posts/${this.props.postId}`, method: 'GET' });
		//data.meta._soundcheck_speakable_selectors is initialized to "" whereas data.meta._soundcheck_include_speakable_sd is set to false
		let state = {
			includeJson: data.meta._soundcheck_speakable_selectors ? data.meta._soundcheck_include_speakable_sd : (defaults.soundcheck_field_sd == 'enabled'),
			selectors: data.meta._soundcheck_speakable_selectors ? JSON.parse(data.meta._soundcheck_speakable_selectors) : [defaults.soundcheck_field_selector],
			initialized: true
		}
		return this.setState(state);

	}

	componentDidUpdate(prevProps, prevState) {
		let current = JSON.stringify(this.state);
		let prev = JSON.stringify(prevState);
		if (prevState.initialized && (current != prev)) {
			let data = {
				_soundcheck_include_speakable_sd: this.state.includeJson ? 1 : 0,
				_soundcheck_speakable_selectors: JSON.stringify(this.state.selectors)
			}
			return wp.apiRequest({ path: `/soundcheck-admin/v1/update-structured-data?id=${prevProps.postId}`, method: 'POST', data: data }).then(
				(data) => {
					return data;
				},
				(err) => {
					return err;
				}
			);
		}
	}

	updateSelector(selected, key) {
		let selectors = this.state.selectors.filter(s => s !== key);
		if (selected) {
			selectors.push(key);
		}
		this.setState({ selectors });
	}

	render() {
		let blockChecked = this.state.selectors.find((s) => s == 'block') ? true : false;
		let metaChecked = this.state.selectors.find((s) => s == 'meta_desc') ? true : false;
		let cssChecked = this.state.selectors.find((s) => s == 'speak_css') ? true : false;
		return (
			<PanelBody title={"Structured Data"}>
				<h3>Speakable Specification</h3>
				<ToggleControl
					checked={this.state.includeJson}
					label="Include structured data?"
					help="Places hidden ld+json markup on the page."
					onChange={() => {
						let nextValue = !this.state.includeJson;
						this.setState({ includeJson: nextValue });
					}}
				/>
				<p></p>
				{this.state.includeJson ? <Fragment>
					<h3>Selectors</h3>
					<CheckboxControl
						label="Speakable Block"
						checked={blockChecked}
						onChange={(isChecked) => { this.updateSelector(isChecked, 'block') }}
					/>
					<CheckboxControl
						label="Meta Description"
						checked={metaChecked}
						onChange={(isChecked) => { this.updateSelector(isChecked, 'meta_desc') }}
					/>
					<CheckboxControl
						label=".speakable CSS"
						checked={cssChecked}
						onChange={(isChecked) => { this.updateSelector(isChecked, 'speak_css') }}
					/>
					<p className="description">All of the speakable content found using the selectors you chose gets combined into one response in the order they appear on the page.</p>
				</Fragment>
					: null}

			</PanelBody>
		)
	}


};


export default StructuredData;
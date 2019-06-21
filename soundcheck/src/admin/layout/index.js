
import { Component, Fragment } from '@wordpress/element';

import './style.scss';
import { Controller } from './controller';

export default class PageLayout extends Component {

	render() {
		return (
			<div className="soundcheck-layout">
				<Controller />
			</div>
		)
	}
}


const { __ } = wp.i18n;

// import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import {withSelect} from '@wordpress/data';
import icons from '../icons';
import StructuredData from './structured-data';

const {
	PluginSidebar,
	PluginSidebarMoreMenuItem
} = wp.editPost;

var registerPlugin = wp.plugins.registerPlugin;

const StructuredDataPanel = withSelect( ( select, { forceIsSaving } ) => {
	const {
		getCurrentPostId,
		isSavingPost,
		isPublishingPost,
		isAutosavingPost,
	} = select( 'core/editor' );
	return {
		postId: getCurrentPostId(),
		isSaving: forceIsSaving || isSavingPost(),
		isAutoSaving: isAutosavingPost(),
		isPublishing: isPublishingPost(),
	};
} )( StructuredData );

registerPlugin('soundcheck-admin-sidebar', {
	icon:icons.logo(20),
	render: function () {
		return (
			<Fragment>
				<PluginSidebarMoreMenuItem
					target="soundcheck-admin-sidebar"
				>
					{__('Soundcheck', 'soundcheck-admin')}
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="soundcheck-admin-sidebar"
					title={__('Soundcheck', 'soundcheck-admin')}
				>
					<StructuredDataPanel></StructuredDataPanel>
				</PluginSidebar>
			</Fragment>
		)
	},
});
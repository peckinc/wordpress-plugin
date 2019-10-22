<?php

/**
 * Admin UI Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package soundcheck
 */

function soundcheck_register_page() {

	$base64_icon = 'PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgNTMgNTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBpZD0iU291bmRjaGVjayIgZmlsbD0iYmxhY2siPjxwYXRoIGQ9Ik0zNy4xNTk4MDYzLDEgTDE2LjY2Njg5OSwxIEwxNi42NjY4OTksMS4wMjExOTExNCBDMTYuMzk0MzI1OSwxLjAxMDA5MTAyIDE2LjEyMjc1MTIsMSAxNS44NTExNzY1LDEgQzcuMDk5ODgxMzIsMSAwLDguMTY5NjcwNDMgMCwxNy4wMTU0NTk0IEwwLDUxIEwzNy4xNTk4MDYzLDUxIEM0NS45MTExMDE1LDUxIDUzLDQzLjgzNTM3NTEgNTMsMzQuOTkwNTk1MiBMNTMsMTcuMDE1NDU5NCBDNTMsOC4xNjk2NzA0MyA0NS45MTExMDE1LDEgMzcuMTU5ODA2MywxIEwzNy4xNTk4MDYzLDEgWiBNMTEuNjI2NzkyLDMyLjE0Nzk1NDYgQzExLjYyNjc5MiwzMy4xNjcxNDc3IDEwLjgwNjA3NzMsMzMuOTk2NjI5NiA5Ljc5NjY1ODA2LDMzLjk5NjYyOTYgQzguNzgzMjQ1MTEsMzMuOTk2NjI5NiA3Ljk2NzUyMjU2LDMzLjE2NzE0NzcgNy45Njc1MjI1NiwzMi4xNDc5NTQ2IEw3Ljk2NzUyMjU2LDIzLjc2NzM2MTYgQzcuOTY3NTIyNTYsMjIuNzQzMTIzIDguNzgzMjQ1MTEsMjEuOTE4Njg2NiA5Ljc5NjY1ODA2LDIxLjkxODY4NjYgQzEwLjgwNjA3NzMsMjEuOTE4Njg2NiAxMS42MjY3OTIsMjIuNzQzMTIzIDExLjYyNjc5MiwyMy43NjczNjE2IEwxMS42MjY3OTIsMzIuMTQ3OTU0NiBaIE0xOS4wMzUxOTAyLDM5LjgzNTI5NDQgQzE5LjAzNTE5MDIsNDAuODU1NDk2NiAxOC4yMTM0NzcsNDEuNjg0OTc4NSAxNy4yMDUwNTYyLDQxLjY4NDk3ODUgQzE2LjE5NTYzNyw0MS42ODQ5Nzg1IDE1LjM3NDkyMjMsNDAuODU1NDk2NiAxNS4zNzQ5MjIzLDM5LjgzNTI5NDQgTDE1LjM3NDkyMjMsMTYuMDgwMDIxOCBDMTUuMzc0OTIyMywxNS4wNTQ3NzQxIDE2LjE5NTYzNywxNC4yMzAzMzc2IDE3LjIwNTA1NjIsMTQuMjMwMzM3NiBDMTguMjEzNDc3LDE0LjIzMDMzNzYgMTkuMDM1MTkwMiwxNS4wNTQ3NzQxIDE5LjAzNTE5MDIsMTYuMDgwMDIxOCBMMTkuMDM1MTkwMiwzOS44MzUyOTQ0IFogTTI3LjY2MDY4MjMsMzMuOTE3OTE5NiBDMjcuNjYwNjgyMywzNC45NDMxNjc0IDI2LjgzOTk2NzYsMzUuNzY2NTk0NyAyNS44MzE1NDY4LDM1Ljc2NjU5NDcgQzI0LjgyMjEyNzYsMzUuNzY2NTk0NyAyNC4wMDE0MTI5LDM0Ljk0MzE2NzQgMjQuMDAxNDEyOSwzMy45MTc5MTk2IEwyNC4wMDE0MTI5LDIxLjk5MjM1MSBDMjQuMDAxNDEyOSwyMC45NzIxNDg4IDI0LjgyMjEyNzYsMjAuMTQyNjY2OSAyNS44MzE1NDY4LDIwLjE0MjY2NjkgQzI2LjgzOTk2NzYsMjAuMTQyNjY2OSAyNy42NjA2ODIzLDIwLjk3MjE0ODggMjcuNjYwNjgyMywyMS45OTIzNTEgTDI3LjY2MDY4MjMsMzMuOTE3OTE5NiBaIE0zNi4yODcxNzI5LDM2LjA4OTUwNzQgQzM2LjI4NzE3MjksMzcuMTA4NzAwNSAzNS40NjY0NTgyLDM3LjkzODE4MjQgMzQuNDU3MDM5LDM3LjkzODE4MjQgQzMzLjQ0NzYxOTgsMzcuOTM4MTgyNCAzMi42MjY5MDUsMzcuMTA4NzAwNSAzMi42MjY5MDUsMzYuMDg5NTA3NCBMMzIuNjI2OTA1LDE5LjgyMDc2MzMgQzMyLjYyNjkwNSwxOC44MDA1NjExIDMzLjQ0NzYxOTgsMTcuOTcxMDc5MSAzNC40NTcwMzksMTcuOTcxMDc5MSBDMzUuNDY2NDU4MiwxNy45NzEwNzkxIDM2LjI4NzE3MjksMTguODAwNTYxMSAzNi4yODcxNzI5LDE5LjgyMDc2MzMgTDM2LjI4NzE3MjksMzYuMDg5NTA3NCBaIE00NC44NzA3MzA3LDMyLjE0Nzk1NDYgQzQ0Ljg3MDczMDcsMzMuMTY3MTQ3NyA0NC4wNTAwMTYsMzMuOTk2NjI5NiA0My4wNDE1OTUyLDMzLjk5NjYyOTYgQzQyLjAyNzE4MzgsMzMuOTk2NjI5NiA0MS4yMTE0NjEzLDMzLjE2NzE0NzcgNDEuMjExNDYxMywzMi4xNDc5NTQ2IEw0MS4yMTE0NjEzLDIzLjc2NzM2MTYgQzQxLjIxMTQ2MTMsMjIuNzQzMTIzIDQyLjAyNzE4MzgsMjEuOTE4Njg2NiA0My4wNDE1OTUyLDIxLjkxODY4NjYgQzQ0LjA1MDAxNiwyMS45MTg2ODY2IDQ0Ljg3MDczMDcsMjIuNzQzMTIzIDQ0Ljg3MDczMDcsMjMuNzY3MzYxNiBMNDQuODcwNzMwNywzMi4xNDc5NTQ2IFoiIGlkPSJsb2dvIj48L3BhdGg+PC9nPjwvc3ZnPg==';

	add_menu_page(
		__( 'Soundcheck', 'soundcheck-admin' ),
		__( 'Soundcheck', 'soundcheck-admin' ),
		'manage_options',
		'soundcheck-admin',
		'soundcheck_admin_page',
		'data:image/svg+xml;base64,'.$base64_icon
	);

	add_submenu_page(
		'soundcheck-admin',
		__( 'Soundcheck Dashboard', 'soundcheck-admin' ),
		__( 'Dashboard', 'soundcheck-admin' ),
		'manage_options',
		'soundcheck-admin',
		'soundcheck_admin_page'
	);

	add_submenu_page(
		'soundcheck-admin',
		__( 'Speakable News', 'soundcheck-admin' ),
		__( 'Speakable News', 'soundcheck-admin' ),
		'manage_options',
		'soundcheck-speakable-news',
		'soundcheck_admin_page'
	);

	add_submenu_page(
		'soundcheck-admin',
		__( 'Soundcheck Settings', 'soundcheck-admin' ),
		__( 'Settings', 'soundcheck-admin' ),
		'manage_options',
		'soundcheck-settings',
		'soundcheck_settings_page'
	);
}

add_action( 'admin_menu', 'soundcheck_register_page' );

function soundcheck_admin_enqueue_script() {

	global $hook_suffix;
	$page_match = preg_match('/^toplevel_page_soundcheck-[\w-]*$|^soundcheck_page_soundcheck-[voice\-interactions|speakable\-news|admin]*$/',$hook_suffix);
	if ($page_match) {
		// Scripts.
		wp_enqueue_script(
			'soundcheck-admin-js', // Handle.
			plugins_url( '/admin.build.js', dirname( __FILE__ ) ), 
			array( 'wp-components', 'wp-data', 'wp-element',  'wp-i18n', 'wp-compose', 'wp-html-entities'), // Dependencies, defined above.
			filemtime( plugin_dir_path( __DIR__ ) . 'admin.build.js' ), // Version: File modification time.
			true // Enqueue the script in the footer.
		);
	
		// Styles.
		wp_enqueue_style(
			'soundcheck-admin-css', // Handle.
			plugins_url( 'admin.build.css', dirname( __FILE__ ) ),
			array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		);

	}
}
add_action( 'admin_enqueue_scripts', 'soundcheck_admin_enqueue_script' );

/**
 * Register Meta Field to Rest API
 */
function soundcheck_admin_register_meta() {
	register_meta(
		'post', '_soundcheck_include_speakable_sd', array(
			'type'			=> 'boolean',
			'single'		=> true,
			'show_in_rest'	=> true,
		)
	);
	register_meta(
		'post', '_soundcheck_speakable_selectors', array(
			'type'			=> 'string',
			'single'		=> true,
			'show_in_rest'	=> true,
		)
	);
}
add_action( 'init', 'soundcheck_admin_register_meta' );

/**
 * Register Metabox to Rest API
 */
function soundcheck_admin_api_posts_meta_field() {
	register_rest_route(
		'soundcheck-admin/v1', '/update-structured-data', array(
			'methods'  => 'POST',
			'callback' => 'soundcheck_admin_update_callback',
			'args'     => array(
				'id' => array(
					'sanitize_callback' => 'absint',
				),
			),
		)
	);
	register_rest_route(
		'soundcheck-admin/v1', '/get-settings', array(
			'methods'  => 'GET',
			'callback' => 'soundcheck_admin_settings_callback',
			'args'     => array(
				'id' => array(
					'sanitize_callback' => 'absint',
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'soundcheck_admin_api_posts_meta_field' );

/**
 * Soundcheck REST API Callback for Gutenberg
 */
function soundcheck_admin_update_callback( $data ) {
	$keys = array('_soundcheck_include_speakable_sd','_soundcheck_speakable_selectors');
	foreach ($keys as $key) {
		update_post_meta( $data['id'], $key, $data[$key] );
	}
}

function soundcheck_admin_settings_callback( $data ) {
	$options = get_option( 'soundcheck_options' );
	return $options;
}

function sidebar_plugin_register() {
    wp_register_script(
        'soundcheck-sidebar-js',
        plugins_url( '/sidebar.build.js', dirname( __FILE__ ) ), 
        array( 'wp-plugins', 'wp-edit-post', 'wp-element',  'wp-i18n' )
    );
}
add_action( 'init', 'sidebar_plugin_register' );

function sidebar_plugin_script_enqueue() {
    wp_enqueue_script( 'soundcheck-sidebar-js' );
}
add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );


/**
 * custom option and settings
 */
function soundcheck_settings_init() {
	// register a new setting for "soundcheck_options" page
	register_setting( 
		'soundcheck', //option group
		'soundcheck_options' //options array name
	);
	
	// register a new section in the "soundcheck_options" page
	add_settings_section(
		'soundcheck_section_structured_data', // id
		__( 'Speakable Structured Data', 'soundcheck' ), // title
		'soundcheck_section_structured_data_cb', //callback
		'soundcheck-settings' //page
	);
	
	add_settings_field(
		'soundcheck_field_sd', // as of WP 4.6 this value is used only internally
		// use $args' label_for to populate the id inside the callback
		__( 'Enabled', 'soundcheck-admin' ), // title
		'soundcheck_field_sd_cb', // callback
		'soundcheck-settings', // page
		'soundcheck_section_structured_data', //section
		[
			'label_for' => 'soundcheck_field_sd'
		]
	);

	add_settings_field(
		'soundcheck_field_selector', // as of WP 4.6 this value is used only internally
		// use $args' label_for to populate the id inside the callback
		__( 'Selector', 'soundcheck-admin' ), // title
		'soundcheck_field_selector_cb', // callback
		'soundcheck-settings', // page
		'soundcheck_section_structured_data', //section
		[
			'label_for' => 'soundcheck_field_selector'
		]
	);
   }
	
/**
* register our wporg_settings_init to the admin_init action hook
*/
add_action( 'admin_init', 'soundcheck_settings_init' );
	
function soundcheck_section_structured_data_cb( $args ) {
	?>
	<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'Default settings that can be changed per-post.', 'soundcheck-admin' ); ?></p>
	<?php
}

function soundcheck_field_selector_cb( $args ) {
	// get the value of the setting we've registered with register_setting()
	$options = get_option( 'soundcheck_options' );
	// output the field
	?>
	<select id="<?php echo esc_attr( $args['label_for'] ); ?>" 
		name="soundcheck_options[<?php echo esc_attr( $args['label_for'] ); ?>]"
	>
		<option value="block" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'block', false ) ) : ( '' ); ?>>
		<?php esc_html_e( 'Speakable Block', 'soundcheck-admin' ); ?>
		</option>
		<option value="meta_desc" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'meta_desc', false ) ) : ( '' ); ?>>
		<?php esc_html_e( 'Meta Description', 'soundcheck-admin' ); ?>
		</option>
		<option value="speak_css" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'speak_css', false ) ) : ( '' ); ?>>
		<?php esc_html_e( '.speakable CSS Class', 'soundcheck-admin' ); ?>
		</option>
	</select>
	<p class="description">
		<?php esc_html_e( '[Advanced] Override the content selected as speakable.', 'wporg' ); ?>
	</p>
	<?php
}

function soundcheck_field_sd_cb( $args ) {
	// get the value of the setting we've registered with register_setting()
	$options = get_option( 'soundcheck_options' );
	// output the field
	?>
	<input type="checkbox" 
		id="<?php echo esc_attr( $args['label_for'] ); ?>" 
		name="soundcheck_options[<?php echo esc_attr( $args['label_for'] ); ?>]" 
		value="enabled"
		<?php echo isset( $options[ $args['label_for'] ] ) ? ( checked( $options[ $args['label_for'] ], 'enabled' ) ) : ( '' );?>> Add Speakable Structured Data<br>
	
	<p class="description">
		<?php esc_html_e( 'Unless you have another plugin that is adding speakable structured data, this should be enabled.', 'soundcheck-admin' ); ?>
	</p>


	<?php
}


/*************
 * HTML Page renderers
 *************/


function soundcheck_settings_page() {
	// check user capabilities
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( isset( $_GET['settings-updated'] ) ) {
		// add settings saved message with the class of "updated"
		add_settings_error( 'soundcheck_messages', 'soundcheck_message', __( 'Settings Saved', 'soundcheck-admin' ), 'updated' );
	}
	
	settings_errors( 'soundcheck_messages' );
	?>

		<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		<form action="options.php" method="post">

	<?php
	// output security fields for the registered setting "soundcheck"
	settings_fields( 'soundcheck' );
	// output setting sections and their fields
	// (sections are registered for "soundcheck", each field is registered to a specific section)
	do_settings_sections( 'soundcheck-settings' );
	// output save settings button
	submit_button( 'Save Settings' );

	?>
		</form>
		</div>
	<?php
}

function soundcheck_admin_page() {
	?>
	<div class="wrap">
		<div id="soundcheck-root"></div>
	</div>
	<?php
}
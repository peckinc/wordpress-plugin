<?php
/**
 * Plugin Name: Soundcheck
 * Plugin URI: https://soundcheck.ai/wordpress
 * Description: The Soundcheck plugin is the easiest way to publish web content that is optimized for voice devices like Amazon Echo and Google Home. You get a new "Speakable" block type and a voice admin screen to validate and preview your voice content.
 * Version: 1.2.0
 * Author: Soundcheck
 *
 * @package soundcheck
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns true if all dependencies for the wc-admin plugin are loaded.
 *
 * @return bool
 */
function soundcheck_dependencies_satisfied() {

	$wordpress_version            = get_bloginfo( 'version' );
	$wordpress_includes_gutenberg = version_compare( $wordpress_version, '4.9.9', '>' );
	$gutenberg_plugin_active      = defined( 'GUTENBERG_DEVELOPMENT_MODE' ) || defined( 'GUTENBERG_VERSION' );

	return $wordpress_includes_gutenberg || $gutenberg_plugin_active;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init-blocks.php';


if ( ! defined( 'SOUNDCHECK_ADMIN_APP' ) ) {
	define( 'SOUNDCHECK_ADMIN_APP', 'soundcheck-admin-app' );
}

if ( ! defined( 'SOUNDCHECK_ADMIN_ABSPATH' ) ) {
	define( 'SOUNDCHECK_ADMIN_ABSPATH', dirname( __FILE__ ) );
}

if ( ! defined( 'SOUNDCHECK_ADMIN_PLUGIN_FILE' ) ) {
	define( 'SOUNDCHECK_ADMIN_PLUGIN_FILE', __FILE__ );
}

function soundcheck_admin_plugins_loaded() {
	if ( ! soundcheck_dependencies_satisfied() ) {
		add_action( 'admin_notices', 'soundcheck_admin_plugins_notice' );
		return;
	}

	require_once plugin_dir_path( __FILE__ ) . 'src/init-admin.php';
}
add_action( 'plugins_loaded', 'soundcheck_admin_plugins_loaded' );

function output_structured_data() {
	$post_id = get_the_ID();
	$meta = get_post_meta($post_id);

	$options = get_option('soundcheck_options');

	//defaults if no other setting found
	$_sd = true;
	$_selector = 'block';

	//use per-post setting if found, then global if found
	if ( isset($meta["_soundcheck_include_speakable_sd"])) {
		$_sd = $meta["_soundcheck_include_speakable_sd"][0];
	} else if (isset($options)) {
		$_sd = isset($options["soundcheck_field_sd"]);
	}

	if ( isset($meta["_soundcheck_speakable_selectors"])) {
		$_selector = $meta["_soundcheck_speakable_selectors"][0];
	}  else if (isset($options)) {
		$_selector = $options["soundcheck_field_selector"];
	}

	if ( $_sd ) {

		$selectors = $_selector;
		$cssSelector = array();
		if (strpos($selectors, 'block') !== false) {
			array_push($cssSelector,".is-style-speakable");
			array_push($cssSelector,".wp-block-soundcheck-speakable");
		}
		if (strpos($selectors, 'meta_desc') !== false) {
			array_push($cssSelector,"meta[name='description']");
		}
		if (strpos($selectors, 'speak_css') !== false) {
			array_push($cssSelector,".speakable");
		}
		

		$speakable = array("@type" => "SpeakableSpecification", "cssSelector" => $cssSelector);
		$sd = array("@context" => "http://schema.org/", "@type" => "WebPage", "speakable" => $speakable);
		echo '<script type="application/ld+json">' . wp_json_encode($sd) . '</script>';
	}
}
add_action( 'wp_footer', 'output_structured_data' , 10 );
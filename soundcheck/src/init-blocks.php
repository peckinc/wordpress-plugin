<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package soundcheck
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function soundcheck_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'soundcheck-style-css', // Handle.
		plugins_url( 'blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
	);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'soundcheck_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function soundcheck_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'soundcheck-block-js', // Handle.
		plugins_url( '/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ) // Dependencies, defined above.
	);

	// Styles.
	wp_enqueue_style(
		'soundcheck-block-editor-css', // Handle.
		plugins_url( 'blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'soundcheck_editor_assets' );

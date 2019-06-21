/**
 * WordPress dependencies
 */
const { getCategories, setCategories } = wp.blocks;

/**
 * Internal dependencies
 */
import icons from './icons';

setCategories( [
	// Add a Soundcheck block category
	{
		slug: 'soundcheck',
		title: 'Soundcheck',
		icon: icons.logo(20),
	},
	...getCategories().filter( ( { slug } ) => slug !== 'soundcheck' ),
] );

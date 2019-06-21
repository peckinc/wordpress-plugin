/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

 // Register block category.
import icons from './block-category';

// Category slug and title.
const category = {
	slug: 'soundcheck',
	title: 'Soundcheck',
};

import './blocks/speakable/index.js';
//import './blocks/voice-app/index.js';
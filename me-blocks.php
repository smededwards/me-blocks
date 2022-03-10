<?php
/**
 * Plugin Name:       ME Blocks
 * Plugin URI: 				https://github.com/smededwards/me-blocks
 * Author:            Michael Edwards
 * Author URI:        https://smededwards.com
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Version:           0.1.0
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Text Domain:       me-blocks
 *
 * @package           create-block
 */

// Exit if accessed directly
 if( !defined( 'WPINC' ) ) { die; }

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function me_blocks_enqueue_editor_assets() {
  $dir = plugin_dir_url( __FILE__ ) . 'build';

  wp_enqueue_script ( "me_blocks", "$dir/index.js", [ 'wp-blocks', 'wp-dom' ] , null, true );
  wp_enqueue_style  ( "me_blocks", "$dir/index.css", [ 'wp-edit-blocks' ] );
}
add_action ( 'enqueue_block_editor_assets', 'me_blocks_enqueue_editor_assets', 100 );

function my_custom_block_assets(){
	$dir = plugin_dir_url( __FILE__ ) . 'build';
	wp_enqueue_style  ( "me_blocks", "$dir/style-index.css", [ 'wp-edit-blocks' ] );
}
add_action ( 'enqueue_block_assets', 'my_custom_block_assets', 100 );

// WordPress Dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

registerBlockType('me-blocks/inner-blocks', {
	title: __('Inner Blocks'),
	icon: 'block-default',
	category: 'common',
	description: __(
		'Inner Blocks example - A block that can have multiple blocks inside it.'
	),
	keywords: [__('inner blocks'), __('me-blocks')],
	attributes: {}, // InnerBlocks doesn't need attributes
	example: {},

	edit: (props) => {
		return (
			<div className={props.className}>
				<InnerBlocks
					// Only allow these blocks to be its children, remove this param to allow all blocks
					allowedBlocks={[
						'core/image',
						'core/heading',
						'core/paragraph',
					]}
					// The initial layout
					template={[
						['core/image', {}],
						['core/heading', { placeholder: 'Title' }],
						['core/paragraph', { placeholder: 'Summary' }],
					]}
					// prevent any changes besides content
					templateLock="all"
				/>
			</div>
		);
	},

	save: (props) => {
		return (
			<div className={props.className}>
				<InnerBlocks.Content />
			</div>
		);
	},
});

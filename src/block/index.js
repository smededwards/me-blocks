// Import Styles
import './editor.scss';
import './style.scss';

// WordPress Dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType('me-blocks/block', {
	title: __('Single Field'),
	icon: 'block-default',
	category: 'common',
	description: __(
		'A single field block. This is a starting boilerplate for other blocks to be built on.'
	),
	keywords: [__('me-blocks'), __('single field'), __('single field')],

	// Attribute is a value that you can pass on to HTML markup. It automatically gets updated when the value changes.
	attributes: {
		content: {
			type: 'array',
			source: 'children', // if an attribute has 'source', it will extract the value from saved HTML markup
			selector: 'p', // take the children of 'p'
		},
	},

	// This value will be used for Preview when selecting block
	example: {
		attributes: {
			content: 'Hello World',
		},
	},

	// Define how to render the content in Editor
	edit: (props) => {
		let atts = props.attributes;

		return (
			<RichText
				tagName="p"
				className={props.className}
				value={atts.content}
				// Listener when the RichText is changed.
				onChange={(value) => {
					// Changing value using setAttributes() will update all reference of atts.content
					props.setAttributes({ content: value });
				}}
			/>
		);
	},

	// Define what to save in Database
	save: (props) => {
		let atts = props.attributes;

		return <RichText.Content tagName="p" value={atts.content} />;
	},
});

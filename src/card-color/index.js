// Import Styles
import './editor.scss';
import './style.scss';

// Import WordPress Dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, InnerBlocks } =
	wp.blockEditor;

registerBlockType('me-blocks/card-color', {
	title: __('Card - Color'),
	icon: 'block-default',
	category: 'common',
	description: __('Color Card Block. Allowing for custom colors to be used'),
	keywords: [__('Card'), __('Color')],
	attributes: {
		heading: {
			source: 'html',
			selector: '.card__title',
		},
		content: {
			source: 'html',
			selector: '.card--body__inner',
		},
		headBackground: {
			source: 'string',
			default: '#E6E6E6',
		},
		headColor: {
			source: 'string',
			default: '#222',
		},
		bodyBackground: {
			source: 'string',
			default: '#e8f3f5',
		},
		bodyColor: {
			source: 'string',
			default: '#222',
		},
	},

	example: {
		attributes: {
			heading: 'Card Header',
			content: 'Card Block Content',
		},
	},

	edit({ attributes, setAttributes }) {
		const ALLOWED_BLOCKS = ['core/image', 'core/paragraph', 'core/list'];

		return (
			<>
				<InspectorControls>
					<PanelColorSettings
						title={__('Header Style')}
						colorSettings={[
							{
								value: attributes.headBackground.color,
								onChange: (content) =>
									setAttributes({ headBackground: content }),
								label: __('Heading background color'),
							},
							{
								value: attributes.headColor.color,
								onChange: (content) =>
									setAttributes({ headColor: content }),
								label: __('Heading Text color'),
							},
						]}
					/>
					<PanelColorSettings
						title={__('Body Style')}
						colorSettings={[
							{
								value: attributes.bodyBackground.color,
								onChange: (content) =>
									setAttributes({ bodyBackground: content }),
								label: __('Body background color'),
							},
							{
								value: attributes.bodyColor.color,
								onChange: (content) =>
									setAttributes({ bodyColor: content }),
								label: __('Body Text color'),
							},
						]}
					/>
				</InspectorControls>
				<div className="card__block">
					<div
						className="card__head"
						style={{
							backgroundColor: attributes.headBackground,
							color: attributes.headColor,
						}}
					>
						<RichText
							onChange={(content) =>
								setAttributes({ title: content })
							}
							value={attributes.heading}
							tagName="h3"
							placeholder={__('Enter heading')}
							className={__('card__heading')}
						/>
					</div>
					<div
						className="card--body"
						style={{
							backgroundColor: attributes.bodyBackground,
							color: attributes.bodyColor,
						}}
					>
						<div className="card--body__inner">
							<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
						</div>
					</div>
				</div>
			</>
		);
	},

	save({ attributes }) {
		let cardHeadStyle = {
			backgroundColor: attributes.headBackground,
			color: attributes.headColor,
		};

		let cardBodyStyle = {
			backgroundColor: attributes.bodyBackground,
			color: attributes.bodyColor,
		};

		return (
			<div className="card__block">
				<div className="card__head" style={cardHeadStyle}>
					<RichText.Content
						className="card__title"
						tagName="h3"
						value={attributes.title}
					/>
				</div>
				<div className="card--body" style={cardBodyStyle}>
					<div className="card--body__inner">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
});

import './editor.scss';

// Import WordPress Dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType('me-blocks/repeater', {
	title: __('Repeater Block'),
	icon: 'block-default',
	category: 'common',
	description: __('Repeater Block'),
	keywords: [__('Custom Block')],
	attributes: {
		info: {
			type: 'array',
			selector: '.info-wrap',
		},
	},
	example: {
		attributes: {
			info: [
				{
					title: 'Title 1',
					content: 'Content 1',
				},
			],
		},
	},

	edit: (props) => {
		const {
			attributes: { info = [] },
			setAttributes,
			className,
		} = props;

		const infoList = (value) => {
			return value
				.sort((a, b) => a.index - b.index)
				.map((infoItem) => {
					return (
						<div className="info-item">
							<Button
								className="remove-item"
								onClick={() => {
									const newInfo = info
										.filter(
											(item) =>
												item.index != infoItem.index
										)
										.map((i) => {
											if (i.index > infoItem.index) {
												i.index -= 1;
											}
											return i;
										});
									setAttributes({ info: newInfo });
								}}
							>
								&times;
							</Button>
							<span>Number {infoItem.index}</span>
							<div className={infoItem.index}>
							<RichText
								tagName="h4"
								className="info-item-title"
								placeholder="Enter the title here"
								value={infoItem.title}
								style={{ height: 58 }}
								onChange={(title) => {
									const newObject = Object.assign(
										{},
										infoItem,
										{
											title: title,
										}
									);
									setAttributes({
										info: [
											...info.filter(
												(item) =>
													item.index != infoItem.index
											),
											newObject,
										],
									});
								}}
							/>
							<RichText
								tagName="p"
								className="info-item-description"
								placeholder="Enter description"
								value={infoItem.description}
								style={{ height: 58 }}
								onChange={(description) => {
									const newObject = Object.assign(
										{},
										infoItem,
										{
											description: description,
										}
									);
									setAttributes({
										info: [
											...info.filter(
												(item) =>
													item.index != infoItem.index
											),
											newObject,
										],
									});
								}}
							/>
							</div>
						</div>
					);
				});
		};

		return (
			<div className={className}>
				<div className="info-wrap">{infoList(info)}</div>
				<Button
					className="add-item components-button is-primary"
					onClick={(title) => {
						setAttributes({
							info: [
								...info,
								{
									index: info.length,
									title: '',
									description: '',
								},
							],
						});
					}}>
					Add Item
				</Button>
			</div>
		);
	},

	save: (props) => {
		const info = props.attributes.info;
		const displayInfoList = (value) => {
			return value.map((infoItem) => {
				return (
					<div className="info-item">
						<RichText.Content
							tagName="h4"
							className="info-item-title"
							value={infoItem.title}
							style={{ height: 58 }}
						/>
					</div>
				);
			});
		};

		return (
			<div className={props.className}>
				<div className="info-wrap">{displayInfoList(info)}</div>
			</div>
		);
	},
});

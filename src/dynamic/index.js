//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import { withSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('cgb/block-custom-dynamic', {
	title: __('custom-dynamic - CGB Block'),
	icon: 'shield',
	category: 'common',
	keywords: [
		__('custom-dynamic — CGB Block'),
		__('CGB Example'),
		__('create-guten-block'),
	],

	edit: withSelect((select) => {
		return {
			posts: select('core').getEntityRecords('postType', 'post', {
				per_page: 10,
				order: 'asc',
				orderby: 'title',
			}),
		};
	})(({ posts }) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				{!posts && 'Loading'}
				{posts && posts.length === 0 && 'No Posts'}
				{posts && posts.length > 0 && (
					<a href={posts[0].link}>{posts[0].title.rendered}</a>
				)}
			</div>
		);
	}),

	save: (props) => {
		return (
			<div className={props.className}>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>custom-dynamic</code> is a new Gutenberg
					block.
				</p>
				<p>
					It was created via{' '}
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>
					.
				</p>
			</div>
		);
	},
});

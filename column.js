(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    const {__} = i18n;
    const {Fragment} = element;
    const {useBlockProps, InnerBlocks} = blockEditor;

    blocks.registerBlockType('row/column', {
        apiVersion: 2,
        title: __('Columns'),
        icon: 'schedule',
        category: 'design',
        keywords: ['column'],
        parent: 'main/row',
        supports: {
            anchor: true,
            html: false
        },
        edit: function (props) {
            let blockProps = useBlockProps();
            return el('div', blockProps, el(InnerBlocks, {renderAppender: InnerBlocks.ButtonBlockAppender}));
        },
        save: function (props) {
            let blockProps = useBlockProps.save();
            blockProps.className += ' ws-column';
            return el('div', blockProps, el(InnerBlocks.Content));
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n);

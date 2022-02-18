(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    const {__} = i18n;
    const {createBlock} = blocks;
    const {Fragment} = element;
    const {useBlockProps, InnerBlocks, InspectorControls} = blockEditor;
    const {RangeControl, PanelBody} = components;
    const {dispatch, select} = window.wp.data;

    const ALLOWED_BLOCKS = ['row/column'];
    const BLOCKS_TEMPLATE = [
        ['row/column', {}]
    ];
    let totalColumns = 1;

    blocks.registerBlockType('main/row', {
        apiVersion: 2,
        title: __('Rows'),
        icon: 'editor-table',
        category: 'design',
        keywords: ['row'],
        attributes: {
            col: {
                type: 'number',
                default: totalColumns
            },
            xl: {
                type: 'number',
                default: 0
            },
            lg: {
                type: 'number',
                default: 0
            },
            md: {
                type: 'number',
                default: 0
            },
            sm: {
                type: 'number',
                default: 0
            }
        },
        supports: {
            align: ['wide'],
            anchor: true,
            html: false,
            color: {
                background: true,
                gradients: true,
                link: true
            }
        },
        edit: function (props) {
            const {col, xl, lg, md, sm} = props.attributes;
            let blockProps = useBlockProps();
            blockProps.className += ' has-' + col + '-columns';

            const addColumn = (val) => {
                const block = createBlock('row/column');
                if (totalColumns > val) {
                    let col = select('core/block-editor').getBlocksByClientId(props.clientId)[0].innerBlocks[val];
                    // Remove the nested block
                    dispatch('core/block-editor').removeBlock(col.clientId);
                } else {
                    // Create a new block
                    dispatch('core/block-editor').insertBlock(block, val, props.clientId);
                }
                totalColumns = val;
                // Update the columns attribute
                props.setAttributes({
                    col: val
                });
            };

            return el(Fragment, {}, el(InspectorControls, {}, el(PanelBody, {title: __('Select Columns', 'viweb')},
                    el(RangeControl, {label: __('Column Default', 'viweb'), min: 1, max: 12, value: col, onChange: addColumn}),
                    el('hr'),
                    el(RangeControl, {label: __('Extra Large (Desktop)', 'viweb'), min: 0, max: 12, value: xl, onChange: (val) => {
                            props.setAttributes({xl: val});
                        }}),
                    el('hr'),
                    el(RangeControl, {label: __('Large (Tablet)', 'viweb'), min: 0, max: 12, value: lg, onChange: (val) => {
                            props.setAttributes({lg: val});
                        }}),
                    el('hr'),
                    el(RangeControl, {label: __('Medium (Responsive)', 'viweb'), min: 0, max: 12, value: md, onChange: (val) => {
                            props.setAttributes({md: val});
                        }}),
                    el('hr'),
                    el(RangeControl, {label: __('Small (Mobile)', 'viweb'), min: 0, max: 12, value: sm, onChange: (val) => {
                            props.setAttributes({sm: val});
                        }})
                    )),
                    el('div', blockProps, el(InnerBlocks, {template: BLOCKS_TEMPLATE, allowedBlocks: ALLOWED_BLOCKS}))
                    );
        },
        save: function (props) {
            let blockProps = useBlockProps.save();
            blockProps.className += ' has-' + props.attributes.col + '-columns';
            return el('div', blockProps, el(InnerBlocks.Content));
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n);

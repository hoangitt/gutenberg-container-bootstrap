(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    const {__} = i18n;
    const {Fragment} = element;
    const {useBlockProps, InnerBlocks, InspectorControls} = blockEditor;
    const {RangeControl, PanelBody} = components;
    blocks.registerBlockType('main/columns', {
        apiVersion: 2,
        title: __('Columns'),
        icon: 'schedule',
        category: 'design',
        keywords: ['columns'],
        attributes: {
            col: {
                type: 'number',
                default: 1
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

            return el(Fragment, {}, el(InspectorControls, {}, el(PanelBody, {title: __('Select Columns', 'viweb')},
                    el(RangeControl, {label: __('Column Default', 'viweb'), min: 1, max: 12, value: col, onChange: function (val) {
                            props.setAttributes({col: val});
                        }}),
                    el('hr'),
                    el(RangeControl, {label: __('Extra Large (Desktop)', 'viweb'), min: 0, max: 12, value: xl, onChange: function (val) {
                            props.setAttributes({xl: val});
                        }}),
                    el('hr'),
                    el(RangeControl, {label: __('Large (Tablet)', 'viweb'), min: 0, max: 12, value: lg, onChange: function (val) {
                            props.setAttributes({lg: val});
                        }}),
                    el('hr'),
                    el(RangeControl, {label: __('Medium (Responsive)', 'viweb'), min: 0, max: 12, value: md, onChange: function (val) {
                            props.setAttributes({md: val});
                        }}),
                    el('hr'),
                    el(RangeControl, {label: __('Small (Mobile)', 'viweb'), min: 0, max: 12, value: sm, onChange: function (val) {
                            props.setAttributes({sm: val});
                        }})
                    )),
                    el('div', blockProps, el('div', el(InnerBlocks, {
                        focus: props.focus,
                        onFocus: props.setFocus,
                        renderAppender: InnerBlocks.ButtonBlockAppender //props.isSelected ? InnerBlocks.ButtonBlockAppender : undefined //if you want remove button
                    })))
                    );
        },
        save: function (props) {
            let blockProps = useBlockProps.save();
            return el(InnerBlocks.Content, blockProps);
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n);


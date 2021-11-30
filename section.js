(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;

    const {__} = i18n;
    const {Fragment} = element;
    const {useBlockProps, InnerBlocks, InspectorControls, MediaUpload} = blockEditor;
    const {PanelBody, Button, SelectControl} = components;

    blocks.registerBlockType('main/section', {
        apiVersion: 2,
        title: __('Section', 'viweb'),
        icon: 'align-wide',
        category: 'design',
        keywords: ['section', 'container'],
        attributes: {
            bgImageId: {
                type: 'number'
            },
            bgImageUrl: {
                type: 'string'
            },
            bgImageRepeat: {
                type: 'string',
                default: 'no-repeat'
            },
            bgImageSize: {
                type: 'string',
                default: 'auto'
            },
            alignment: {
                type: 'string',
                default: 'full'
            },
            content: {
                type: 'string',
                source: 'children'
            },
        },
        supports: {
            align: ["wide", "full"],
            anchor: true,
            html: false,
            color: {
                background: true,
                gradients: true,
                link: true
            },
            spacing: {
                padding: true,
                margin: true
            }
        },
        edit: function (props) {
            let blockProps = useBlockProps(), attrs = props.attributes, alignment = attrs.align,
                    bgImageUrl = attrs.bgImageUrl,
                    bgImageId = attrs.bgImageId,
                    bgImageRepeat = attrs.bgImageRepeat,
                    bgImageSize = attrs.bgImageSize;
            let className = blockProps.className.replace('alignwide', ''); //replace class alignwide
            blockProps.className = className;

            function onChangeImage(image) {
                props.setAttributes({
                    bgImageId: image.id
                });
                props.setAttributes({
                    bgImageUrl: image.url
                });
            }
            function onRemoveImage() {
                props.setAttributes({
                    bgImageId: ''
                });
                props.setAttributes({
                    bgImageUrl: ''
                });
            }
            let repeatOpts = [
                {label: __('Auto'), value: 'auto'},
                {label: __('No Repeat', 'viweb'), value: 'no-repeat'},
                {label: __('Repeat X', 'viweb'), value: 'repeat-x'},
                {label: __('Repeat Y', 'viweb'), value: 'repeat-y'}
            ];
            let sizeOpts = [
                {label: __('Auto'), value: 'auto'},
                {label: __('Cover', 'viweb'), value: 'cover'},
                {label: __('Contain', 'viweb'), value: 'contain'},
                {label: '100%', value: '100%'}
            ];
            if (bgImageUrl) {
                blockProps.style.backgroundImage = 'url("' + bgImageUrl + '")';
            }
            if (bgImageRepeat) {
                blockProps.style.backgroundRepeat = bgImageRepeat;
            }
            if (bgImageSize) {
                blockProps.style.backgroundSize = bgImageSize;
            }
            let focus = props.focus;

            return el(Fragment, {}, el(InspectorControls, {}, el(PanelBody, {title: __('Select Background Image', 'viweb')},
                    el('div', {className: 'components-base-control'}, el('label', {className: 'components-form-token-field__label'}, __('Background Image', 'viweb')), el(MediaUpload, {
                        onSelect: onChangeImage,
                        allowedTypes: 'image/*',
                        value: bgImageId,
                        render: function (obj) {
                            if (bgImageId) {
                                return el('div', {}, el('img', {src: bgImageUrl}), el('div', {}, el(Button, {className: 'is-secondary', onClick: obj.open}, __('Change Image', 'viweb')), el(Button, {className: 'is-link is-destructive', style: {'margin-left': '10px'}, onClick: onRemoveImage}, __('Remove Image', 'viweb'))));
                            } else {
                                return el(Button, {
                                    className: 'editor-post-featured-image__toggle',
                                    onClick: obj.open
                                }, __('Select Image', 'viweb'));
                            }
                        }
                    })),
                    el(SelectControl, {label: __('Background repeat', 'viweb'), options: repeatOpts, value: bgImageRepeat, onChange: function (val) {
                            props.setAttributes({
                                bgImageRepeat: val
                            });
                        }}),
                    el(SelectControl, {label: __('Background size', 'viweb'), options: sizeOpts, value: bgImageSize, onChange: function (val) {
                            props.setAttributes({
                                bgImageSize: val
                            });
                        }})
                    )),
                    el('div', blockProps, el('div', {className: 'align' + alignment}, el(InnerBlocks, {
                        focus: focus,
                        onFocus: props.setFocus
                    })))
                    );
        },
        save: function (props) {
            let attrs = props.attributes;
            let blockProps = useBlockProps.save(), styles = '',
                    className = blockProps.className.replace('alignwide', ''); //replace class alignwide

            blockProps.className = className;
            let alignClassName = (attrs.align == 'wide' ? 'container align' + attrs.align : '');
            if (attrs.bgImageUrl) {
                blockProps.style.backgroundImage = 'url("' + attrs.bgImageUrl + '")';
            }
            if (attrs.bgImageRepeat) {
                blockProps.style.backgroundRepeat = attrs.bgImageRepeat;
            }
            if (attrs.bgImageSize) {
                blockProps.style.backgroundSize = attrs.bgImageSize;
            }
            if (alignClassName) {
                return el('div', blockProps, el('div', {className: alignClassName}, el(InnerBlocks.Content)));
            } else {
                return el('div', blockProps, el(InnerBlocks.Content));
            }
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n);

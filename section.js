(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;

    const {__} = i18n;
    const {Fragment} = element;
    const {useBlockProps, InnerBlocks, InspectorControls, MediaUpload} = blockEditor;
    const {PanelBody, Button, SelectControl} = components;

    let repeatOpts = [
        {label: __('Auto'), value: ''},
        {label: __('No Repeat', 'viweb'), value: 'no-repeat'},
        {label: __('Repeat X', 'viweb'), value: 'repeat-x'},
        {label: __('Repeat Y', 'viweb'), value: 'repeat-y'}
    ];
    let sizeOpts = [
        {label: __('Auto'), value: ''},
        {label: __('Cover', 'viweb'), value: 'cover'},
        {label: __('Contain', 'viweb'), value: 'contain'},
        {label: '100%', value: '100%'}
    ];
    let positionXOpts = [
        {label: __('Auto'), value: ''},
        {label: __('Left', 'viweb'), value: 'left'},
        {label: __('Center', 'viweb'), value: 'center'},
        {label: 'Right', value: 'right'}
    ];
    let positionYOpts = [
        {label: __('Auto'), value: ''},
        {label: __('Top', 'viweb'), value: 'top'},
        {label: __('Center', 'viweb'), value: 'center'},
        {label: __('Bottom', 'viweb'), value: 'bottom'}
    ];

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
            bgImagePositionX: {
                type: 'string',
                default: 'center'
            },
            bgImagePositionY: {
                type: 'string',
                default: 'center'
            },
            alignment: {
                type: 'string',
                default: 'full'
            }
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
            const {bgImageUrl, bgImageId, bgImageRepeat, bgImagePositionX, bgImagePositionY, bgImageSize} = props.attributes;
            let blockProps = useBlockProps(), alignment = props.attributes.align;
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

            if (bgImageId) {
                blockProps.style.backgroundImage = 'url("' + bgImageUrl + '")';
                if (bgImageRepeat) {
                    blockProps.style.backgroundRepeat = bgImageRepeat;
                }
                if (bgImageSize) {
                    blockProps.style.backgroundSize = bgImageSize;
                }
                if (bgImagePositionX) {
                    blockProps.style.backgroundPositionX = bgImagePositionX;
                }
                if (bgImagePositionY) {
                    blockProps.style.backgroundPositionY = bgImagePositionY;
                }
            }

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
                            props.setAttributes({bgImageRepeat: val});
                        }}),
                    el(SelectControl, {label: __('Background size', 'viweb'), options: sizeOpts, value: bgImageSize, onChange: function (val) {
                            props.setAttributes({bgImageSize: val});
                        }}),
                    el(SelectControl, {label: __('Background position horizontal', 'viweb'), options: positionXOpts, value: bgImagePositionX, onChange: function (val) {
                            props.setAttributes({bgImagePositionX: val});
                        }}),
                    el(SelectControl, {label: __('Background position vertical', 'viweb'), options: positionYOpts, value: bgImagePositionY, onChange: function (val) {
                            props.setAttributes({bgImagePositionY: val});
                        }})
                    )),
                    el('div', blockProps, el('div', {className: 'align' + alignment}, el(InnerBlocks, {
                        focus: props.focus,
                        onFocus: props.setFocus,
                        renderAppender: InnerBlocks.ButtonBlockAppender //props.isSelected ? InnerBlocks.ButtonBlockAppender : undefined //if you want remove button
                    })))
                    );
        },
        save: function (props) {
            const regex = /align(wide|full)/gi;
            let attrs = props.attributes;
            let blockProps = useBlockProps.save(), className = blockProps.className.replace(regex, ''); //replace class alignwide
            blockProps.className = className;

            let alignment = (attrs.align === undefined ? '' : (attrs.align == 'wide' ? 'container ' : '') + 'align' + attrs.align);
            if (attrs.bgImageId) {
                blockProps.style.backgroundImage = 'url("' + attrs.bgImageUrl + '")';
                if (attrs.bgImageRepeat) {
                    blockProps.style.backgroundRepeat = attrs.bgImageRepeat;
                }
                if (attrs.bgImageSize) {
                    blockProps.style.backgroundSize = attrs.bgImageSize;
                }
                if (attrs.bgImagePositionX) {
                    blockProps.style.backgroundPositionX = attrs.bgImagePositionX;
                }
                if (attrs.bgImagePositionY) {
                    blockProps.style.backgroundPositionY = attrs.bgImagePositionY;
                }
            }
            
            if (alignment) {
                return el('div', blockProps, el('div', {className: alignment}, el(InnerBlocks.Content)));
            } else {
                return el('div', blockProps, el(InnerBlocks.Content));
            }
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n);

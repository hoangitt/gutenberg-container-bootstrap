(function (blocks, element, blockEditor, components) {
    var el = element.createElement,
            Fragment = element.Fragment,
            useBlockProps = blockEditor.useBlockProps,
            InnerBlocks = blockEditor.InnerBlocks,
            InspectorControls = blockEditor.InspectorControls,
            MediaUpload = blockEditor.MediaUpload,
            RichText = blockEditor.RichText;

    var PanelBody = components.PanelBody,
            Button = components.Button,
            SelectControl = components.SelectControl;

    blocks.registerBlockType('main/section', {
        apiVersion: 2,
        title: 'Section',
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
                padding: true
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
                {label: 'Auto', value: 'auto'},
                {label: 'No Repeat', value: 'no-repeat'},
                {label: 'Repeat X', value: 'repeat-x'},
                {label: 'Repeat Y', value: 'repeat-y'}
            ];
            let sizeOpts = [
                {label: 'Auto', value: 'auto'},
                {label: 'Cover', value: 'cover'},
                {label: 'Contain', value: 'contain'},
                {label: 'Full', value: '100%'}
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

            return el(Fragment, {}, el(InspectorControls, {}, el(PanelBody, {title: 'Select Background Image'},
                    el('div', {className: 'components-base-control'}, el('label', {className: 'components-form-token-field__label'}, 'Background Image'), el(MediaUpload, {
                        onSelect: onChangeImage,
                        allowedTypes: 'image/*',
                        value: bgImageId,
                        render: function (obj) {
                            if (bgImageId) {
                                return el('div', {}, el('img', {src: bgImageUrl}), el('div', {}, el(Button, {className: 'is-secondary', onClick: obj.open}, 'Change Image'), el(Button, {className: 'is-link is-destructive', onClick: onRemoveImage}, 'Remove Image')));
                            } else {
                                return el(Button, {
                                    className: 'editor-post-featured-image__toggle',
                                    onClick: obj.open
                                }, 'Browser Image');
                            }
                        }
                    })),
                    el(SelectControl, {label: 'Background repeat', options: repeatOpts, value: bgImageRepeat, onChange: function (val) {
                            props.setAttributes({
                                bgImageRepeat: val
                            });
                        }}),
                    el(SelectControl, {label: 'Background size', options: sizeOpts, value: bgImageSize, onChange: function (val) {
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
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components);


//Fullscreen.enable();

var editor = grapesjs.init({
    container: '#gjs',
    components: '<div class="txt-red">Hello world!</div>',
    style: '.txt-red{color: red}',
    deviceManager: {
        devices: [{
            name: 'Desktop',
            width: '', // default size
        }, {
            name: 'Mobile',
            width: '320px', // this value will be used on canvas width
            widthMedia: '480px', // this value will be used in CSS @media
        }]
    },
    storageManager: {
        type: 'remote',
        urlStore: window.location.href,
        urlLoad: window.location.href,
        params: {
            _do: 'StoreDesign'
        },
        headers: {}, // Custom headers for the remote storage request
        autosave: true,         // Store data automatically
        autoload: true,         // Autoload stored data on init
        stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
        storeComponents: true,  // Enable/Disable storing of components in JSON format
        storeStyles: true,      // Enable/Disable storing of rules in JSON format
        storeHtml: true,        // Enable/Disable storing of components as HTML string
        storeCss: true,         // Enable/Disable storing of rules as CSS string
    },
    traitManager: {
        appendTo: '.traits-container',
    },
    layerManager: {
        appendTo: '.layers-container'
    },
    // The Selector Manager allows to assign classes and
    // different states (eg. :hover) on components.
    // Generally, it's used in conjunction with Style Manager
    // but it's not mandatory
    selectorManager: {
        appendTo: '.styles-container'
    },
    styleManager: {
        appendTo: '.styles-container',
        sectors: [
            {
                name: 'Dimension',
                id: 'panel-switcher',
                el: '.panel__switcher',
                buttons: [{
                    id: 'show-layers',
                    active: true,
                    label: 'Layers',
                    command: 'show-layers',
                    // Once activated disable the possibility to turn it off
                    togglable: false,
                }, {
                    id: 'show-style',
                    active: true,
                    label: 'Styles',
                    command: 'show-styles',
                    togglable: false,
                }, {
                    id: 'show-traits',
                    active: true,
                    label: 'Traits',
                    command: 'show-traits',
                    togglable: false,
                }],
                open: false,
                // Use built-in properties
                buildProps: [
                    'width',
                    'min-height',
                    'padding'
                ],
                // Use `properties` to define/override single property
                properties: [
                    {
                        // Type of the input,
                        // options: integer | radio | select | color | slider | file | composite | stack
                        type: 'integer',
                        name: 'The width',
                        // Label for the property
                        property: 'width',
                        // CSS property (if buildProps contains it will be extended)
                        units: [
                            'px',
                            '%'
                        ],
                        // Units, available only for 'integer' types
                        defaults: 'auto',
                        // Default value
                        min: 0
                        // Min value, available only for 'integer' types
                    }
                ]
            },
            {
                name: 'Extra',
                open: false,
                buildProps: [
                    'background-color',
                    'box-shadow',
                    'custom-prop'
                ],
                properties: [
                    {
                        id: 'custom-prop',
                        name: 'Custom Label',
                        property: 'font-size',
                        type: 'select',
                        defaults: '32px',
                        // List of options, available only for 'select' and 'radio'  types
                        options: [
                            {
                                value: '12px',
                                name: 'Tiny'
                            },
                            {
                                value: '18px',
                                name: 'Medium'
                            },
                            {
                                value: '32px',
                                name: 'Big'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    panels: {
        defaults: [{
            id: 'layers',
            el: '.panel__right',
            // Make the panel resizable
            resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0, // Top handler
                cl: 1, // Left handler
                cr: 0, // Right handler
                bc: 0, // Bottom handler
                // Being a flex child we need to change `flex-basis` property
                // instead of the `width` (default)
                keyWidth: 'flex-basis',
            },
        },



            {
                id: 'panel-devices',
                el: '.panel__devices',
                buttons: [{
                    id: 'device-desktop',
                    label: 'D',
                    command: 'set-device-desktop',
                    active: true,
                    togglable: false,
                }, {
                    id: 'device-mobile',
                    label: 'M',
                    command: 'set-device-mobile',
                    togglable: false,
                }]
            },



        {
            id: 'panel-switcher',
            el: '.panel__switcher',
            buttons: [{
                id: 'show-layers',
                active: true,
                label: 'Layers',
                command: 'show-layers',
                // Once activated disable the possibility to turn it off
                togglable: false,
            }, {
                id: 'show-style',
                active: true,
                label: 'Styles',
                command: 'show-styles',
                togglable: false,
            }, {
                id: 'show-traits',
                active: true,
                label: 'Traits',
                command: 'show-traits',
                togglable: false,
            }]
        }]
    },
    blockManager: {
        appendTo: '#blocks',
        blocks: [
            {
                id: 'section', // id is mandatory
                label: '<b>Section</b>', // You can use HTML/SVG inside labels
                attributes: {class: 'gjs-block-section'},
                content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
            }, {
                id: 'text',
                label: 'Text',
                content: '<div data-gjs-type="text">Insert your text here</div>',
            }, {
                id: 'image',
                label: 'Image',
                // Select the component once it's dropped
                select: true,
                // You can pass components as a JSON instead of a simple HTML string,
                // in this case we also use a defined component type `image`
                content: {type: 'image'},
                // This triggers `active` event on dropped components and the `image`
                // reacts by opening the AssetManager
                activate: true,
            }
        ]
    }
});


editor.Panels.addPanel({
    id: 'panel-top',
    el: '.panel__top',
});
editor.Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
        {
            id: 'visibility',
            active: true, // active by default
            className: 'fa fa-undo btn-toggle-borders',
            label: '<u>Toggle borders</u>',
            command: 'sw-visibility', // Built-in command
        }, {
            id: 'save',
            className: 'fa fa-save btn-save',
            command: {
                run: () => {
                    console.log('save!');
                },
                stop: () => {
                    console.log('stop save!');
                }
            },
            context: 'export-template', // For grouping context of buttons from the same panel
        }, {
            id: 'export',
            className: 'fa fa-export btn-open-export',
            label: 'Export',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
        }, {
            id: 'show-json',
            className: 'fa fa-code btn-show-json',
            label: '',
            context: 'show-json',
            command(editor) {
                editor.Modal.setTitle('Components JSON')
                    .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
                    .open();
            },
        }
    ],
});


// Define commands
editor.Commands.add('show-layers', {
    getRowEl(editor) {
        return editor.getContainer().closest('.editor-row');
    },
    getLayersEl(row) {
        return row.querySelector('.layers-container')
    },
    run(editor/*, sender*/) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
    },
    stop(editor/*, sender*/) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
    },
});
editor.Commands.add('show-styles', {
    getRowEl(editor) {
        return editor.getContainer().closest('.editor-row');
    },
    getStyleEl(row) {
        return row.querySelector('.styles-container')
    },
    run(editor/*, sender*/) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
    },
    stop(editor/*, sender*/) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
    },
});

editor.Commands.add('show-traits', {
    getTraitsEl(editor) {
        const row = editor.getContainer().closest('.editor-row');
        return row.querySelector('.traits-container');
    },
    run(editor, sender) {
        this.getTraitsEl(editor).style.display = '';
    },
    stop(editor, sender) {
        this.getTraitsEl(editor).style.display = 'none';
    },
});

// Commands
editor.Commands.add('set-device-desktop', {
    run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-mobile', {
    run: editor => editor.setDevice('Mobile')
});

(function(blocks, element, editor, components) {
	var registerBlockType = blocks.registerBlockType;

	var el = element.createElement;
	var Fragment = element.Fragment;

	var InspectorControls = editor.InspectorControls;
	var ColorPalette = editor.ColorPalette;

	var BaseControl = components.BaseControl;
	var PanelBody = components.PanelBody;
	var SelectControl = components.SelectControl;
	var TextControl = components.TextControl;
	var CheckboxControl = components.CheckboxControl;

	//var __ = wp.i18n.__;

	const { __ } = wp.i18n;

	var iconEl = el('svg', { width: 24, height: 24 },
		el('path', {
			d: "M4.6 18.2c.4-.5.2-1.2-.3-1.6-.6-.5-1.6-.4-2.1.1-1.1-.9-1.8-1.7-2.2-2 0 0 .1.6 2.2 2.7 0 0 .8-1.1 1.8-.4.5.2.6.7.6 1.2"
		}),
		el('path', {
			d: "M15.9 19.1c-1.4 0-2.8-.4-4-1 .3-.3.8-.7 1.3-1.1.8.3 1.7.5 2.7.5 4.1 0 7.4-3.3 7.4-7.4 0-4.1-3.3-7.4-7.4-7.4-4.1 0-7.4 3.3-7.4 7.4v.4c-.5.2-1.1.4-1.6.5 0-.4-.1-.7-.1-1.1C6.8 7.1 8 4.7 10 3c-2.4 1.7-4 4.5-4 7.6v.7c-2 .8-3.5 1.5-4.5 2 1.2-.5 7.2-3.1 13.9-4.3 3 1.1 5.1 2.4 5.1 2.4C13.7 14 7.2 20 7.2 20c-1-.6-2-1.2-2.8-1.8l-.1.7c.9.7 1.7 1.4 2.8 2.1 0 0 1-1.2 2.9-2.8 1.5 1 3.3 1.6 5.2 1.6 3.9 0 7.3-2.4 8.6-5.9-1.3 3.2-4.4 5.2-7.9 5.2"
		}),
		el('path', {
			d: "M15.4 9.8c-5 .9-11.3 3.6-11.3 3.6s3.1 2 5.3 3.4c0 0 5.3-3.5 9.9-5.3-.1.1-1.9-1-3.9-1.7"
		})
	);

	registerBlockType('tposguten-block/cart-button', {
		title: __('Thepointofsale.com shopping cart', 'thepointofsalecom-widget-shortcode'),
		description: __('Embed passes sales with Thepointofsale.com', 'thepointofsalecom-widget-shortcode'),
		icon: iconEl,
		category: 'widgets',
		attributes: {
			select_content: {
				type: 'string',
				default: 'event'
			},
			event_id: {
				type: 'string',
				default: ''
			},
			select_lang: {
				type: 'string',
				default: defaultOptions.lang
			},
			button_label: {
				type: 'string',
				default: __('Online purchase', 'thepointofsalecom-widget-shortcode')
			},
			theme: {
				type: 'string',
				default: defaultOptions.theme
			},
			color: {
				type: 'string',
				default: defaultOptions.mainColor
			},
			btn_bg_color: {
				type: 'string',
				default: '#E7302A'
			},
			btn_text_color: {
				type: 'string',
				default: '#FFFFFF'
			},
			ticket_agency: {
				type: 'string',
				default: defaultOptions.ticketAgency
			},
		},
		supports: {
			align: true
		},
		//example: {},
		styles: [
			{ name: 'default', label: __( 'Fill', 'thepointofsalecom-widget-shortcode'), isDefault: true },
			{ name: 'outline', label: __( 'Outline', 'thepointofsalecom-widget-shortcode') }
		],
		edit: function({attributes, setAttributes}) {
			var color = attributes.color;
			var substrColor = color.substr(1);

			function onChangeContentSelect( event ) {
				setAttributes( { select_content: event } );
			}

			function onChangeEventID( event ) {
				setAttributes( { event_id: event } );
			}

			function onChangeLangSelect( event ) {
				setAttributes( { select_lang: event } );
			}

			function onChangeButtonLabel( event ) {
				setAttributes( { button_label: event } );
			}

			function onChangeThemeSelect( event ) {
				setAttributes( { theme: event } );
			}

			function onChangeColor( event ) {
				var color = "#E7302A";

				if (typeof event !== 'undefined') {
					color = event;
				}

				setAttributes( { color: color } );

				document.getElementsByClassName('component-color-indicator-tpos')[0].style.backgroundColor = color;

				substrColor = color.substr(1);
			}

			function onChangeBtnBgColor( event ) {
				var color = "#E7302A";

				if (typeof event !== 'undefined') {
					color = event;
				}

				setAttributes( { btn_bg_color: color } );

				document.getElementsByClassName('component-color-indicator-tpos-btn-bg')[0].style.backgroundColor = color;
			}

			function onChangeBtnTextColor( event ) {
				var color = "#FFFFFF";

				if (typeof event !== 'undefined') {
					color = event;
				}

				setAttributes( { btn_text_color: color } );

				document.getElementsByClassName('component-color-indicator-tpos-btn-text')[0].style.backgroundColor = color;
			}

			return [
				el( Fragment, {},
					el( InspectorControls, {},
						el( PanelBody, { title: __('General Settings', 'thepointofsalecom-widget-shortcode'), initialOpen: true },
							el( SelectControl,
								{
									label: __('Content', 'thepointofsalecom-widget-shortcode'),
									options : [
										{ label: __('Single event', 'thepointofsalecom-widget-shortcode'), value: 'event' },
										{ label: __('Event group', 'thepointofsalecom-widget-shortcode'), value: 'group' },
									],
									onChange: onChangeContentSelect,
									value: attributes.select_content,
								}
							),
							el( TextControl,
								{
									label: __('Identifier', 'thepointofsalecom-widget-shortcode'),
									onChange: onChangeEventID,
									value: attributes.event_id
								}
							),
							el( SelectControl,
								{
									label: __('Language', 'thepointofsalecom-widget-shortcode'),
									options : [
										{ label: __('Language of the page', 'thepointofsalecom-widget-shortcode'), value: '' },
										{ label: __('French', 'thepointofsalecom-widget-shortcode'), value: 'fr' },
										{ label: __('English', 'thepointofsalecom-widget-shortcode'), value: 'en' },
										{ label: __('Traditional Chinese', 'thepointofsalecom-widget-shortcode'), value: 'zh-Hant' },
										{ label: __('Indonesian', 'thepointofsalecom-widget-shortcode'), value: 'id' },
									],
									onChange: onChangeLangSelect,
									value: attributes.select_lang,
								}
							),
							el( TextControl,
								{
									label: __('Label', 'thepointofsalecom-widget-shortcode'),
									onChange: onChangeButtonLabel,
									value: attributes.button_label
								}
							),
							el( SelectControl,
								{
									label: __('Theme', 'thepointofsalecom-widget-shortcode'),
									options : [
										{ label: __('Light', 'thepointofsalecom-widget-shortcode'), value: 'light' },
										{ label: __('Dark', 'thepointofsalecom-widget-shortcode'), value: 'dark' },
									],
									onChange: onChangeThemeSelect,
									value: attributes.theme,
								}
							),
							el( BaseControl,
								{
									className: 'editor-color-palette-control block-editor-color-palette-control editor-panel-color-settings block-editor-panel-color-settings'
								},
								[
									el( 'span',
										{
											className: 'components-base-control__label'
										},
										[
											__('Main color', 'thepointofsalecom-widget-shortcode'),
											el ('span',
												{
													className: 'component-color-indicator component-color-indicator-tpos',
													style: {
														backgroundColor: attributes.color
													}
												},
											),
										]
									),
									el( ColorPalette,
										{
											className: 'editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette',
											onChange: onChangeColor,
											value: attributes.color,
										}
									),
								],
							),
						),
						el( PanelBody, { title: __('Button color settings', 'thepointofsalecom-widget-shortcode'), initialOpen: false },
							el( BaseControl,
								{
									className: 'editor-color-palette-control block-editor-color-palette-control editor-panel-color-settings block-editor-panel-color-settings'
								},
								[
									el( 'span',
										{
											className: 'components-base-control__label'
										},
										[
											__('Background color', 'thepointofsalecom-widget-shortcode'),
											el ('span',
												{
													className: 'component-color-indicator component-color-indicator-tpos-btn-bg',
													style: {
														backgroundColor: attributes.btn_bg_color
													}
												},
											),
										]
									),
									el( ColorPalette,
										{
											className: 'editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette',
											onChange: onChangeBtnBgColor,
											value: attributes.btn_bg_color,
										}
									),
								],
							),
							el( BaseControl,
								{
									className: 'editor-color-palette-control block-editor-color-palette-control editor-panel-color-settings block-editor-panel-color-settings'
								},
								[
									el( 'span',
										{
											className: 'components-base-control__label'
										},
										[
											__('Text color', 'thepointofsalecom-widget-shortcode'),
											el ('span',
												{
													className: 'component-color-indicator component-color-indicator-tpos-btn-text',
													style: {
														backgroundColor: attributes.btn_text_color
													}
												},
											),
										]
									),
									el( ColorPalette,
										{
											className: 'editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette',
											onChange: onChangeBtnTextColor,
											value: attributes.btn_text_color,
										}
									),
								],
							),
						),
					),
				),
				el( 'div',
					{ className: 'wp-block-button tposguten-cart-button-wrapper ' + attributes.className },
					[
						el( wp.element.RawHTML, null, '<button type="button" class="tpos-add-to-cart wp-block-button__link" data-tpos-scheme="' + attributes.theme + '" data-tpos-lang="' + attributes.select_lang + '" data-tpos-' + attributes.select_content + '="' + attributes.event_id + '" data-tpos-color="' + attributes.color.substr(1) + '" style="background-color:' + attributes.btn_bg_color + ';border-color:' + attributes.btn_text_color + ';color:' + attributes.btn_text_color + ';">' + attributes.button_label + '</button>' )
					]
				),
			]
		},
		save: function({attributes}) {
			return el( 'div',
				{ className: 'wp-block-button tposguten-cart-button-wrapper' },
				[
					el( wp.element.RawHTML, null, '<button type="button" class="tpos-add-to-cart wp-block-button__link" data-tpos-scheme="' + attributes.theme + '" data-tpos-lang="' + attributes.select_lang + '" data-tpos-' + attributes.select_content + '="' + attributes.event_id + '" data-tpos-color="' + attributes.color.substr(1) + '" style="background-color:' + attributes.btn_bg_color + ';border-color:' + attributes.btn_text_color + ';color:' + attributes.btn_text_color + ';">' + attributes.button_label + '</button>' )
				]
			);
		},
	});

	registerBlockType('tposguten-block/iframe', {
		title: __('Thepointofsale.com purchase window', 'thepointofsalecom-widget-shortcode'),
		description: __('Embed passes sales with Thepointofsale.com', 'thepointofsalecom-widget-shortcode'),
		icon: iconEl,
		category: 'widgets',
		attributes: {
			org_id: {
				type: 'string',
				default: defaultOptions.org
			},
			select_content: {
				type: 'string',
				default: 'event'
			},
			event_id: {
				type: 'string',
				default: ''
			},
			select_lang: {
				type: 'string',
				default: defaultOptions.lang
			},
			height: {
				type: 'string',
				default: '500'
			},
			fluid: {
				type: 'boolean',
				default: true
			},
			theme: {
				type: 'string',
				default: defaultOptions.theme
			},
			color: {
				type: 'string',
				default: defaultOptions.mainColor
			},
			ticket_agency: {
				type: 'string',
				default: defaultOptions.ticketAgency
			},
		},
		//example: {},
		edit: function({attributes, setAttributes}) {
			var color = attributes.color;
			var substrColor = color.substr(1);

			function onChangeIframeOrgID( event ) {
				setAttributes( { org_id: event } );
			}

			function onChangeIframeEventID( event ) {
				setAttributes( { event_id: event } );
			}

			function onChangeContentIframeSelect( event ) {
				setAttributes( { select_content: event } );
			}

			function onChangeIframeLangSelect( event ) {
				setAttributes( { select_lang: event } );
			}

			function onChangeIframeThemeSelect( event ) {
				setAttributes( { theme: event } );
			}

			function onChangeIframeHeight( event ) {
				setAttributes( { height: event } );
			}

			function onChangeIframeFluid( event ) {
				setAttributes( { fluid: event } );
			}

			function onChangeIframeColor( event ) {
				var color = "#E7302A";

				if (typeof event !== 'undefined') {
					color = event;
				}

				setAttributes( { color: color } );

				document.getElementsByClassName('component-color-indicator-tpos')[0].style.backgroundColor = color;

				substrColor = color.substr(1);
			}

			return [
				el( Fragment, {},
					el( InspectorControls, {},
						el( PanelBody, { title: __('General Settings', 'thepointofsalecom-widget-shortcode'), initialOpen: true },
							el( TextControl,
								{
									label: __('Organizer ID', 'thepointofsalecom-widget-shortcode'),
									onChange: onChangeIframeOrgID,
									value: attributes.org_id
								}
							),
							el( SelectControl,
								{
									label: __('Content', 'thepointofsalecom-widget-shortcode'),
									options : [
										{ label: __('Single event', 'thepointofsalecom-widget-shortcode'), value: 'event' },
										{ label: __('Event group', 'thepointofsalecom-widget-shortcode'), value: 'group' },
									],
									onChange: onChangeContentIframeSelect,
									value: attributes.select_content,
								}
							),
							el( TextControl,
								{
									label: __('Identifier', 'thepointofsalecom-widget-shortcode'),
									onChange: onChangeIframeEventID,
									value: attributes.event_id
								}
							),
							el( SelectControl,
								{
									label: __('Language', 'thepointofsalecom-widget-shortcode'),
									options : [
										{ label: __('Language of the page', 'thepointofsalecom-widget-shortcode'), value: '' },
										{ label: __('French', 'thepointofsalecom-widget-shortcode'), value: 'fr' },
										{ label: __('English', 'thepointofsalecom-widget-shortcode'), value: 'en' },
										{ label: __('Traditional Chinese', 'thepointofsalecom-widget-shortcode'), value: 'zh-Hant' },
										{ label: __('Indonesian', 'thepointofsalecom-widget-shortcode'), value: 'id' },
									],
									onChange: onChangeIframeLangSelect,
									value: attributes.select_lang,
								}
							),
							el( SelectControl,
								{
									label: __('Theme', 'thepointofsalecom-widget-shortcode'),
									options : [
										{ label: __('Light', 'thepointofsalecom-widget-shortcode'), value: 'light' },
										{ label: __('Dark', 'thepointofsalecom-widget-shortcode'), value: 'dark' },
									],
									onChange: onChangeIframeThemeSelect,
									value: attributes.theme,
								}
							),
							el( TextControl,
								{
									label: __('Height (minimum 500)', 'thepointofsalecom-widget-shortcode'),
									onChange: onChangeIframeHeight,
									value: attributes.height
								}
							),
							el( CheckboxControl,
								{
									label: __('Adjust to content', 'thepointofsalecom-widget-shortcode'),
									onChange: onChangeIframeFluid,
									checked: attributes.fluid
								}
							),
							el( BaseControl,
								{
									className: 'editor-color-palette-control block-editor-color-palette-control editor-panel-color-settings block-editor-panel-color-settings'
								},
								[
									el( 'span',
										{
											className: 'components-base-control__label'
										},
										[
											__('Main color', 'thepointofsalecom-widget-shortcode'),
											el ('span',
												{
													className: 'component-color-indicator component-color-indicator-tpos',
													style: {
														backgroundColor: attributes.color
													}
												},
											),
										]
									),
									el( ColorPalette,
										{
											className: 'editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette',
											onChange: onChangeIframeColor,
											value: attributes.color,
										}
									),
								],
							),
						),
					),
				),
				el( 'div',
					{ className: 'tposguten-iframe-wrapper ' + attributes.className },
					[
						el( wp.element.RawHTML, null, '<div class="components-placeholder wp-block-embed"><div class="components-placeholder__label"><span class="editor-block-icon block-editor-block-icon has-colors"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path d="M4.6 18.2c.4-.5.2-1.2-.3-1.6-.6-.5-1.6-.4-2.1.1-1.1-.9-1.8-1.7-2.2-2 0 0 .1.6 2.2 2.7 0 0 .8-1.1 1.8-.4.5.2.6.7.6 1.2"></path><path d="M15.9 19.1c-1.4 0-2.8-.4-4-1 .3-.3.8-.7 1.3-1.1.8.3 1.7.5 2.7.5 4.1 0 7.4-3.3 7.4-7.4 0-4.1-3.3-7.4-7.4-7.4-4.1 0-7.4 3.3-7.4 7.4v.4c-.5.2-1.1.4-1.6.5 0-.4-.1-.7-.1-1.1C6.8 7.1 8 4.7 10 3c-2.4 1.7-4 4.5-4 7.6v.7c-2 .8-3.5 1.5-4.5 2 1.2-.5 7.2-3.1 13.9-4.3 3 1.1 5.1 2.4 5.1 2.4C13.7 14 7.2 20 7.2 20c-1-.6-2-1.2-2.8-1.8l-.1.7c.9.7 1.7 1.4 2.8 2.1 0 0 1-1.2 2.9-2.8 1.5 1 3.3 1.6 5.2 1.6 3.9 0 7.3-2.4 8.6-5.9-1.3 3.2-4.4 5.2-7.9 5.2"></path><path d="M15.4 9.8c-5 .9-11.3 3.6-11.3 3.6s3.1 2 5.3 3.4c0 0 5.3-3.5 9.9-5.3-.1.1-1.9-1-3.9-1.7"></path></svg></span>' + __('Thepointofsale.com purchase window', 'thepointofsalecom-widget-shortcode') + '</div></div>' )
					]
				),
			]
		},
		save: function({attributes}) {
			var color = attributes.color;
			var substrColor = color.substr(1);
			var height = 500;

			if (parseInt(attributes.height) >= 500) {
				height = parseInt(attributes.height);
			}

			return el( 'div',
				{ className: 'tposguten-iframe-wrapper ' + attributes.className },
				[
					el( wp.element.RawHTML, null, '<script type="text/javascript" src="https://' + attributes.ticket_agency + '/plugins/widget.js?' + attributes.select_content + '=' + attributes.event_id + '&amp;lang=' + attributes.select_lang + '&amp;height=' + height + '&amp;fluid=' + attributes.fluid + '&amp;color=' + substrColor + '&amp;scheme=' + attributes.theme + '&amp;org=' + attributes.org_id + '"></script>' )
				]
			);
		},
	});
}(
	window.wp.blocks,
	window.wp.element,
	window.wp.editor,
	window.wp.components
));

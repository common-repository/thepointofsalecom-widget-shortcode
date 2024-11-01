<?php
/*
Plugin Name: Lepointdevente.com
Plugin URI: https://thepointofsale.com/
Description: Thepointofsale.com allows you to add shopping carts and purchase windows in your articles and WordPress pages via Gutenberg blocks by activating the extension (https://thepointofsale.com)
Version: 2.0.4
Author: cognitif
Author URI: https://cognitif.ca/
License: GPLv2 or later
Text Domain: thepointofsalecom-widget-shortcode
Domain Path: /languages
*/

if (!defined('ABSPATH')) {
	die('No direct access allowed.');
}

load_plugin_textdomain('thepointofsalecom-widget-shortcode', false, 'thepointofsalecom-widget-shortcode/languages');

if (!function_exists('tposguten_register_block')) {
	$plugin_name = plugin_basename(__FILE__);

	function tposguten_register_block() {
		$tposguten_org_option = get_option('tposguten_org');
		$tposguten_theme_option = get_option('tposguten_theme');
		$tposguten_lang_option = get_option('tposguten_lang');
		$tposguten_main_color_option = get_option('tposguten_main_color');

		if (get_option('tposguten_ticket_agency')) {
			$tposguten_ticket_agency_option = get_option('tposguten_ticket_agency');
		} else {
			$tposguten_ticket_agency_option = 'lepointdevente.com';
		}


		wp_register_script(
			'tposguten-block',
			plugins_url('block.js', __FILE__),
			array('wp-blocks', 'wp-components', 'wp-editor', 'wp-element', 'wp-i18n'),
			filemtime(plugin_dir_path(__FILE__) . 'block.js')
		);

		wp_set_script_translations( 'tposguten-block', 'thepointofsalecom-widget-shortcode', plugin_dir_path(__FILE__) . 'languages');

		register_block_type('tposguten-block/cart-button', array(
			'editor_script' => 'tposguten-block',
		));

		register_block_type('tposguten-block/iframe', array(
			'editor_script' => 'tposguten-block',
		));

		wp_localize_script('tposguten-block', 'defaultOptions', array('org' => $tposguten_org_option, 'theme' => $tposguten_theme_option, 'lang' => $tposguten_lang_option, 'mainColor' => $tposguten_main_color_option, 'ticketAgency' => $tposguten_ticket_agency_option));
	}
	add_action('init', 'tposguten_register_block');


	function tposguten_enqueue_scripts() {
		$tposguten_org_option = get_option('tposguten_org');
		$tposguten_theme_option = get_option('tposguten_theme');
		$tposguten_lang_option = get_option('tposguten_lang');
		$tposguten_main_color_option = get_option('tposguten_main_color');

		if (get_option('tposguten_ticket_agency')) {
			$tposguten_ticket_agency_option = get_option('tposguten_ticket_agency');
		} else {
			$tposguten_ticket_agency_option = 'lepointdevente.com';
		}

		wp_enqueue_script( 'tposguten_cart_js', 'https://' . $tposguten_ticket_agency_option . '/plugins/cart/js?scheme=' . $tposguten_theme_option . '&amp;lang=' . $tposguten_lang_option . '&amp;color=' . str_replace("#", '', $tposguten_main_color_option) . '&amp;org=' . $tposguten_org_option, null, null, true );
	}
	add_action('wp_enqueue_scripts', 'tposguten_enqueue_scripts');
}

if (!function_exists('tposguten_admin_index') && !function_exists('tposguten_add_admin_pages') && !function_exists('tposguten_settings_link')) {
	// Load color picker
	function tposguten_enqueue_color_picker() {
		wp_enqueue_style('wp-color-picker');
		wp_enqueue_script('tposguten-color-picker-handle', plugins_url('color-picker.js', __FILE__), array('wp-color-picker'), false, true);
	}
	add_action('admin_enqueue_scripts', 'tposguten_enqueue_color_picker');

	// Add admin page
	function tposguten_admin_index() {
		require_once plugin_dir_path(__FILE__) . 'templates/admin.php';
	}

	function tposguten_add_admin_pages() {
		add_submenu_page('options-general.php', __('Thepointofsale.com', 'thepointofsalecom-widget-shortcode'), __('Thepointofsale.com', 'thepointofsalecom-widget-shortcode'), 'manage_options', 'tposguten_plugin', 'tposguten_admin_index');
	}
	add_action('admin_menu', 'tposguten_add_admin_pages');

	// Add admin link in plugins page
	function tposguten_settings_link($links) {
		$settings_link = '<a href="options-general.php?page=tposguten_plugin">' . __('Settings', 'thepointofsalecom-widget-shortcode') . '</a>';

		array_push($links, $settings_link);

		return $links;
	}
	add_filter("plugin_action_links_$plugin_name", 'tposguten_settings_link');

	// Create settings section in admin page
	function tposguten_setup_sections() {
		add_settings_section('general_settings', __('General Settings', 'thepointofsalecom-widget-shortcode'), false, 'tposguten_plugin');
	}
	add_action('admin_init', 'tposguten_setup_sections');

	function tposguten_setup_fields() {
		$fields = array(
			array(
				'uid' => 'tposguten_org',
				'label' => __('Organizer ID', 'thepointofsalecom-widget-shortcode'),
				'section' => 'general_settings',
				'type' => 'text',
				'options' => false,
				'placeholder' => '',
				'helper' => '',
				'supplemental' => '',
				'default' => ''
			),
			array(
				'uid' => 'tposguten_theme',
				'label' => __('Theme', 'thepointofsalecom-widget-shortcode'),
				'section' => 'general_settings',
				'type' => 'select',
				'options' => array(
					'light' => __('Light', 'thepointofsalecom-widget-shortcode'),
					'dark' => __('Dark', 'thepointofsalecom-widget-shortcode')
				),
				'helper' => '',
				'supplemental' => '',
				'default' => 'light'
			),
			array(
				'uid' => 'tposguten_lang',
				'label' => __('Language', 'thepointofsalecom-widget-shortcode'),
				'section' => 'general_settings',
				'type' => 'select',
				'options' => array(
					'' => __('Language of the page', 'thepointofsalecom-widget-shortcode'),
					'fr' => __('French', 'thepointofsalecom-widget-shortcode'),
					'en' => __('English', 'thepointofsalecom-widget-shortcode'),
					'zh-Hant' => __('Traditional Chinese', 'thepointofsalecom-widget-shortcode'),
					'id' => __('Indonesian', 'thepointofsalecom-widget-shortcode')
				),
				'helper' => '',
				'supplemental' => '',
				'default' => ''
			),
			array(
				'uid' => 'tposguten_main_color',
				'label' => __('Main color', 'thepointofsalecom-widget-shortcode'),
				'section' => 'general_settings',
				'type' => 'text',
				'options' => false,
				'placeholder' => '#E7302A',
				'helper' => '',
				'supplemental' => '',
				'default' => '#E7302A'
			),
			array(
				'uid' => 'tposguten_ticket_agency',
				'label' => __('Ticket Agency', 'thepointofsalecom-widget-shortcode'),
				'section' => 'general_settings',
				'type' => 'select',
				'options' => array(
					'lepointdevente.com' => 'Lepointdevente.com',
					'thepointofsale.com' => 'Thepointofsale.com',
					'thepointofsale.co.id' => 'Thepointofsale.co.id',
					'thepointofsale.hk' => 'Thepointofsale.hk',
					'manage.tixza.com' => 'Tixza'
				),
				'helper' => '',
				'supplemental' => '',
				'default' => 'lepointdevente.com'
			),
		);

		foreach($fields as $field) {
			add_settings_field($field['uid'], $field['label'], 'tposguten_field_callback', 'tposguten_plugin', $field['section'], $field);

			register_setting('tposguten_plugin', $field['uid']);
		}
	}
	add_action('admin_init', 'tposguten_setup_fields');

	function tposguten_field_callback($arguments) {
		$value = get_option( $arguments['uid'] ); // Get the current value, if there is one
		if( ! $value ) { // If no value exists
			$value = $arguments['default']; // Set to our default
		}

		// Check which type of field we want
		switch( $arguments['type'] ){
			case 'text': // If it is a text field
				printf( '<input name="%1$s" id="%1$s" type="%2$s" placeholder="%3$s" value="%4$s" />', $arguments['uid'], $arguments['type'], $arguments['placeholder'], $value );
				break;
			case 'textarea': // If it is a textarea
				printf( '<textarea name="%1$s" id="%1$s" placeholder="%2$s" rows="5" cols="50">%3$s</textarea>', $arguments['uid'], $arguments['placeholder'], $value );
				break;
			case 'select': // If it is a select dropdown
				if( ! empty ( $arguments['options'] ) && is_array( $arguments['options'] ) ){
					$options_markup = '';
					foreach( $arguments['options'] as $key => $label ){
						$options_markup .= sprintf( '<option value="%s" %s>%s</option>', $key, selected( $value, $key, false ), $label );
					}
					printf( '<select name="%1$s" id="%1$s">%2$s</select>', $arguments['uid'], $options_markup );
				}
				break;
		}

		// If there is help text
		if( $helper = $arguments['helper'] ){
			printf( '<span class="helper"> %s</span>', $helper ); // Show it
		}

		// If there is supplemental text
		if( $supplimental = $arguments['supplemental'] ){
			printf( '<p class="description">%s</p>', $supplimental ); // Show it
		}
	}
}

if (!function_exists('tpos_shortcode_support')) {
	function tpos_shortcode_support( $atts ) {

		// Attributes
		extract(
			shortcode_atts(
				array(
					'brand' => NULL,
					'color' => NULL,
					'e' => NULL,
					'event' => NULL,
					'group' => NULL,
					'h' => NULL,
					'height' => NULL,
					'lang' => NULL,
					'locale' => NULL,
					'scheme' => NULL,
					'token' => NULL,
					'venues' => NULL,
					'w' => NULL,
					'width' => NULL,
				), $atts
			)
		);

		// Backward compatibility
		if (!$event && $e) {
			$event = $e;
		}
		if (!$width && $w) {
			$width = $w;
		}
		if (!$width && $w) {
			$width = $w;
		}

		// Lang
		if (!$lang && $locale) {
			switch ($locale) {
				case 'zh_CN':
					$lang = 'zh-Hans';
					break;
				case 'zh_HK':
					$lang = 'zh-Hant';
					break;
				default:
					$lang = strtolower(substr($locale,0,2));
					break;
			}
		}

		// Brand
		switch ($brand) {
			case 'cn':
			case 'hk':
			case 'sg':
			case 'tw':
				$domain = 'thepointofsale.'.$brand;
				break;
			case 'fr':
				$domain = 'lepointdevente.fr';
				break;
			case 'id':
				$domain = 'thepointofsale.co.id';
				break;
			case 'tixza':
				$domain = 'manage.tixza.com';
				break;
			default:
				switch ($lang) {
					case 'fr':
						$domain = 'lepointdevente.com';
						break;
					default:
						$domain = 'thepointofsale.com';
						break;
				}
				break;
		}

		// build query string
		$options = array();
		if ($event) {
			$options['event'] = $event;
		} elseif ($group) {
			$options['group'] = $group;
		} elseif ($venues) {
			$options['venues'] = $venues;
		}
		if ($token) $options['token'] = $token;
		if ($height) $options['height'] = $height;
		if ($width) $options['width'] = $width;
		if ($scheme) $options['scheme'] = $scheme;
		if ($color) $options['color'] = $color;
		$query = http_build_query($options, '', '&amp;');

		// Checks for invalid UTF-8, Convert single < characters to entity, strip all tags, remove line breaks, tabs and extra white space, strip octets.
		$query = sanitize_text_field($query);

		// Code
		return '<script type="text/javascript" src="https://'.$domain.'/plugins/widget.js?'.$query.'"></script>';

	}

	// Add Shortcode
	add_shortcode( 'tpos_support', 'tpos_shortcode_support' );
}

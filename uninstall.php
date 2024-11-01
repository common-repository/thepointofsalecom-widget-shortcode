<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
	die('Invalid request.');
}

delete_option('org');
delete_option('theme');
delete_option('lang');
delete_option('mainColor');

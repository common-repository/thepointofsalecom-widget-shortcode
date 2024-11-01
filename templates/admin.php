<div class="wrap">
	<h1>
		<?php echo __('Thepointofsale.com', 'thepointofsalecom-widget-shortcode') . ' - ' . __('Gutenberg shopping cart', 'thepointofsalecom-widget-shortcode'); ?>
	</h1>
	<form method="post" action="options.php">
		<?php
		settings_fields( 'tposguten_plugin' );
		do_settings_sections( 'tposguten_plugin' );
		submit_button();
		?>
	</form>
</div>

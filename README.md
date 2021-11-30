# Features
* Setting Background Color
* Setting Background Image
* Setting Background Repeat
* Setting Background Size
* Setting Text Color
* Setting Padding, Margin

# How to use
- add theme support wide align: ```add_theme_support('align-wide')```
- add theme support padding, margin: ```add_theme_support('custom-spacing')```
- add file script, use action enqueue_block_editor_assets

```
function create_gutenberg_assets() {
    $wp_ready = array('wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-components', 'wp-i18n');
    wp_enqueue_script('section-gutenberg-blocks', get_template_directory_uri() . 'js/section.js', $wp_ready); // add plugin use plugin_dir_url
}
add_action('enqueue_block_editor_assets', 'create_gutenberg_assets');
```
# Example
```
<div class="section">
  <div class="container">Everything</div>
</div>
```

Document & Readmore: [here](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/)

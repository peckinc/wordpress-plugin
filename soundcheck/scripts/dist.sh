build_files=$(ls dist/*.{js,css,png})

# Generate the plugin zip file.
echo "\nCreating archive...\n"
zip -r soundcheck.zip \
	plugin.php \
	src/*.php \
	$build_files

echo "\nBuild Done.\n"
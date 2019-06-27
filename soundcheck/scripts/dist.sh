build_files=$(ls dist/*.{js,css,png})

cp plugin.php src/*.php readme.txt dist

# Generate the plugin zip file.
echo "\nCreating archive...\n"
zip -r soundcheck.zip dist/*

echo "\nBuild Done.\n"
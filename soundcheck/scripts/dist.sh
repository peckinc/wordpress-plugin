build_files=$(ls dist/*.{js,css,png})

cp plugin.php readme.txt dist
mkdir dist/src
cp src/*.php dist/src

# Generate the plugin zip file.
echo "\nCreating archive...\n"
zip -r soundcheck.zip dist/*

rsync -av dist/ ../../soundcheck-plugin-svn/trunk

echo "\nBuild Done.\n"
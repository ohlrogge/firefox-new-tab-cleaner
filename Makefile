ZIP_NAME = new-tab-cleaner.zip

.PHONY: package clean

package:
	rm -f $(ZIP_NAME)
	zip -X -r $(ZIP_NAME) \
	    manifest.json \
	    background.js \
	    options.html \
	    options.js \
	    icons/icon.svg \
	    LICENSE

clean:
	rm -f $(ZIP_NAME)

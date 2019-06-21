# Soundcheck WordPress Plugins

*Publish, validate, and manage voice-optimized web content.*

[Learn More or Download](https://soundcheck.ai/wordpress)

## Overview
The Soundcheck plugin for WordPress is the easiest way to publish web content that is optimized for voice devices like Amazon Echo and Google Home. The plugin integrates directly with the new Gutenberg editor to make adding speakable content as easy as point, click, and type. The plugin validate posts to check for for the correct speakable markup and lets your preview what voice assistants may dictate from your page. Finally, use copy from your voice-optimized website as spoken content for voice assistants, making WordPress a true CMS for voice.

## Speakable Blocks
This plugin adds a custom Gutenberg block for adding Speakable content to your posts.
* Include copy that is optimized for text-to-speech.
* Automatically generate the required structured data with no coding.
* Let voice assistants discover and dictate your web content.

## Development
This project supports [docker-compose](https://docs.docker.com/compose/) as the easiest way to get a dev environment up and running.

```sh
docker-compose up -d
cd soundcheck
npm install
npm start
```

The WordPress should be available at http://localhost:8000 with the `plugins/soundcheck` directory mounted as `/var/www/html/wp-content/plugins/soundcheck` on the image.

To stop this local WordPress run:

```sh
docker-compose stop
```
#!/bin/bash

REVEAL_JS_DEV=~/RedHat/src/reveal.js/
cp rh-white.scss ${REVEAL_JS_DEV}/css/theme/source/ &&
	pushd ${REVEAL_JS_DEV} &&
	npm run build -- css-themes &&
	popd &&
	cp -f ${REVEAL_JS_DEV}/dist/theme/rh-white.css .

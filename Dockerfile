FROM node:8-stretch

#
# to build the image, use this:
#   docker build --rm -t abc2svg .
#
# to build an external git folder, use this (Linux+Mac / Windows):
#   docker run --rm -it --volume $(pwd):/work abc2svg
#   docker run --rm -it --volume %CD%:/work abc2svg
#
# to build the files in the image, use this:
#   docker run --rm -it abc2svg
#
# to work with whatever is in the image, use this (Linux+Mac / Windows):
#   docker run --rm --volume $(pwd):/project -it abc2svg bash
#   docker run --rm --volume %CD%:/project -it abc2svg bash

RUN \
  curl -L https://yarnpkg.com/latest.tar.gz | tar xvz && mv dist /yarn && \
  apt-get update && \
  apt-get install --no-install-recommends -y \
    \
    less \
    \
    fontforge \
    ninja-build \
  && \
  apt-get remove software-properties-common -y && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH "/yarn/bin:$PATH"

RUN \
  npm i -g \
    eslint \
    uglify-js

ADD . /work

WORKDIR /work

CMD ninja -v

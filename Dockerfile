FROM node:8

# docker build --rm -t abc2svg .

# to build an external git folder, use this:
# docker run --rm -it --volume $(pwd):/project abc2svg
#
# to build the files in the image, use this:
# docker run --rm -it abc2svg
#
# to work with whatever is in the image, use this:
# docker run --rm --volume $(pwd):/project -it abc2svg bash

RUN \
  curl -L https://yarnpkg.com/latest.tar.gz | tar xvz && mv dist /yarn && \
  apt-get update -y && \
  apt-get install --no-install-recommends -y \
    software-properties-common \
    \
    less \
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

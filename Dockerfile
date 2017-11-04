FROM node:8-stretch

#
# to build the image, use this:
#   docker build --rm -t abc2svg--build .
#
# to build an external git folder, use this (Linux+Mac / Windows) (Not minifd - for testing):
#   docker run --rm -it --volume $(pwd):/work abc2svg--build bash -c "ninja -t clean && NOMIN=1 ninja -v"
#   docker run --rm -it --volume   %CD%:/work abc2svg--build bash -c "ninja -t clean && NOMIN=1 ninja -v"
#
# to build an external git folder, use this (Linux+Mac / Windows) (minified):
#   docker run --rm -it --volume $(pwd):/work abc2svg--build
#   docker run --rm -it --volume   %CD%:/work abc2svg--build
#
# to play with the image
#   docker run --rm -it --volume $(pwd):/work abc2svg--build bash
#   docker run --rm -it --volume   %CD%:/work abc2svg--build bash
#

RUN \
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

RUN \
  npm i -g \
    eslint \
    uglify-js

#ADD . /work
ENV NOMIN=""

WORKDIR /work


# CMD \
#   (ninja -t clean || true) &&\
CMD \
  ninja -v &&\
  echo Done!

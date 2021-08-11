# build
FROM node:15.7.0-alpine3.10 as build-vue
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./client/package*.json ./
RUN npm install
COPY ./client .
RUN npm run build

# production
FROM nginx:stable-alpine as production
WORKDIR /app
RUN apk update && apk add --no-cache python3 && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache
RUN apk update && apk add gcc g++ libevent-dev libxslt-dev python3-dev \
    build-base \
    cairo \
    cairo-dev \
    cargo \
    freetype-dev \
    gcc \
    gdk-pixbuf-dev \
    gettext \
    jpeg-dev \
    lcms2-dev \
    libffi-dev \
    musl-dev \
    openjpeg-dev \
    openssl-dev \
    pango-dev \
    poppler-utils \
    postgresql-client \
    postgresql-dev \
    py-cffi \
    python3-dev \
    rust \
    tcl-dev \
    tiff-dev \
    tk-dev \
    zlib-dev
COPY --from=build-vue /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./server .
RUN pip install --upgrade pip && \
    pip install pipenv && \
    pipenv install --dev --deploy
RUN pip install gunicorn
CMD pipenv run gunicorn -b 0.0.0.0:5000 app:app --daemon && \
    sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'
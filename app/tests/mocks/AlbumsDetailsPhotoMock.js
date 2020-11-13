'use strict';

angular.module('AlbumsDetailsPhotoMock', [])
    .value('Photo', {
        album: {},
        date: {},
        description: "25299b94764140d4d45d967bb450c137.jpg",
        filename: "25299b94764140d4d45d967bb450c137.jpg",
        formatted_date: "12/02/2015",
        id: 404,
        location: "",
        owner: "Ricardo Viana",
        size: "1024x765",
        tags: [],
        thumbnail_url: "http://159.164.180.61:8888/unsafe/x1000/smart/http://159.164.180.61:8087/uploadfiles/2/5/2/9/25299b94764140d4d45d967bb450c137.jpg",
        upload_url: "http://159.164.180.61:8087/uploadfiles/2/5/2/9/25299b94764140d4d45d967bb450c137.jpg"
    })
    .value('API_URL', 'http://159.164.180.61:6969/image/3');

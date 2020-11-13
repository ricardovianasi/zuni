'use strict';

angular.module('AlbumsMock', [])
    .value('Albums', {
        cover: 'http://159.164.180.61:8888/unsafe/size/smart/http://159.164.180.61:8087/uploadfiles/0/5/4/f/054f_23998.jpg',
        created_at: '26-09-2014',
        description: 'Mock Test',
        id: '1',
        image_count: '5',
        locations: [],
        name: 'Mock Test Name',
        tags: [],
        updated_at: '26-09-2014',
        user: {},
        visiblity: true,
        length: 1
    })
    .value('API_URL', 'http://159.164.180.61:6969/album');

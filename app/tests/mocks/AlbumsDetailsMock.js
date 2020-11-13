'use strict';

angular.module('AlbumsDetailsMock', [])
    .value('Album', {
        album: {
            created_at: '22-07-2014',
            description: null,
            id: 1,
            locations: [],
            name: 'Album 2',
            visibility: true,
            tags: [],
            updated_at: '25-09-2014',
            user: {
                access_key: null,
                created_at: [],
                expires_at: null,
                id: 3,
                email: 'ricardovianasi@gmail.com',
                name: 'Ricardo Viana',
                origin: 'Cedecom/Web',
                avatar: '4076_1151838347.jpg',
                avatar_url: 'http://159.164.180.61:8888/unsafe/size/smart/http://159.164.180.61:8087/uploadfiles/4/0/7/6/4076_1151838347.jpg',
                profiles: [],
                status: true,
                updated_at: [],
                groups: [],
                phone: '3133435678',
                is_external: null
            },
            cover: 'http://159.164.180.61:8888/unsafe/size/smart/http://159.164.180.61:8087/uploadfiles/0/5/4/f/054f_23998.jpg',
            image_count: 0
        },
        photos: {
            date: '',
            description: "25299b94764140d4d45d967bb450c137.jpg",
            filename: "25299b94764140d4d45d967bb450c137.jpg",
            formatted_date: "12/02/2015",
            id: 404,
            location: "",
            owner: "Ricardo Viana",
            size: "1024x765",
            tags: [],
            thumbnail_url: "http://159.164.180.61:8888/unsafe/450x450/smart/http://159.164.180.61:8087/uploadfiles/2/5/2/9/25299b94764140d4d45d967bb450c137.jpg",
            upload_url: "http://159.164.180.61:8087/uploadfiles/2/5/2/9/25299b94764140d4d45d967bb450c137.jpg",
            length: 1
        }
    })
    .value('API_URL', 'http://159.164.180.61:6969/image?idAlbum=1');

import React from 'react';
import clone from 'clone';
import { DateCell, ImageCell, LinkCell, TextCell } from '/components/Tables/HelperCells';

const tableData = JSON.parse(
    `[{
    "id": 0,
    "key": 0,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bluefx_/128.jpg",
    "city": "Lake Zelda",
    "email": "Lonny79@hotmail.com",
    "firstName": "Emelia",
    "lastName": "Gislason",
    "street": "Kulas Shoals",
    "zipCode": "52677",
    "date": "2016-09-27T08:18:56.302Z",
    "bs": "back-end optimize e-markets",
    "catchPhrase": "Devolved heuristic focus group",
    "companyName": "Kessler LLC",
    "words": "dignissimos et natus",
    "sentence": "Illum molestiae saepe eaque odit magnam veritatis eligendi est qui."
  }, {
    "id": 1,
    "key": 1,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg",
    "city": "East Pierce",
    "email": "Lucinda_Gottlieb@hotmail.com",
    "firstName": "Cloyd",
    "lastName": "Armstrong",
    "street": "Lyla Heights",
    "zipCode": "64903",
    "date": "2016-10-08T06:30:16.347Z",
    "bs": "seamless mesh vortals",
    "catchPhrase": "Managed background migration",
    "companyName": "Doyle and Sons",
    "words": "voluptatum dignissimos possimus",
    "sentence": "Aut similique a qui."
  }, {
    "id": 2,
    "key": 2,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg",
    "city": "Sibylside",
    "email": "Ransom.Bergstrom@gmail.com",
    "firstName": "Rahul",
    "lastName": "Funk",
    "street": "Jolie Shoals",
    "zipCode": "46659",
    "date": "2017-05-16T02:02:32.105Z",
    "bs": "bleeding-edge enhance e-commerce",
    "catchPhrase": "Public-key intermediate hardware",
    "companyName": "Champlin and Sons",
    "words": "est est corrupti",
    "sentence": "Qui consequatur aut dignissimos error qui praesentium sit et unde."
  }, {
    "id": 3,
    "key": 3,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/keryilmaz/128.jpg",
    "city": "Anaisshire",
    "email": "Loyce.Upton@hotmail.com",
    "firstName": "Hilbert",
    "lastName": "Langosh",
    "street": "Sim Station",
    "zipCode": "22101",
    "date": "2017-01-28T01:56:10.609Z",
    "bs": "24/7 orchestrate communities",
    "catchPhrase": "Team-oriented fault-tolerant help-desk",
    "companyName": "Shields Inc",
    "words": "aut perspiciatis totam",
    "sentence": "Ut omnis et."
  }, {
    "id": 4,
    "key": 4,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/romanbulah/128.jpg",
    "city": "North Brad",
    "email": "Cassidy48@hotmail.com",
    "firstName": "Cloyd",
    "lastName": "Wilderman",
    "street": "Ruecker Turnpike",
    "zipCode": "93686",
    "date": "2016-12-30T12:07:39.922Z",
    "bs": "sticky e-enable metrics",
    "catchPhrase": "Re-engineered intangible methodology",
    "companyName": "Hoeger Inc",
    "words": "iusto ut voluptatem",
    "sentence": "Praesentium sit exercitationem aut."
  }, {
    "id": 5,
    "key": 5,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/claudioguglieri/128.jpg",
    "city": "Goyetteside",
    "email": "Tamia.Abbott98@hotmail.com",
    "firstName": "Jonatan",
    "lastName": "Gutmann",
    "street": "Donnelly Mountains",
    "zipCode": "92491-2242",
    "date": "2016-10-14T20:54:07.802Z",
    "bs": "B2C reintermediate initiatives",
    "catchPhrase": "Upgradable leading edge access",
    "companyName": "Greenholt and Sons",
    "words": "deserunt vel expedita",
    "sentence": "Sed dolorem amet voluptatem sed quasi."
  }, {
    "id": 6,
    "key": 6,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/128.jpg",
    "city": "West Terrence",
    "email": "Tina.Stehr66@hotmail.com",
    "firstName": "Verdie",
    "lastName": "O'Conner",
    "street": "Windler Mountains",
    "zipCode": "93882",
    "date": "2017-02-20T15:34:54.827Z",
    "bs": "one-to-one deploy technologies",
    "catchPhrase": "Multi-lateral 24 hour workforce",
    "companyName": "Herzog - Pagac",
    "words": "maiores sit distinctio",
    "sentence": "Rem illum voluptatibus asperiores."
  }, {
    "id": 7,
    "key": 7,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/okseanjay/128.jpg",
    "city": "Dietrichfort",
    "email": "Hobart_Bashirian67@hotmail.com",
    "firstName": "Elza",
    "lastName": "Hoeger",
    "street": "Howe Stravenue",
    "zipCode": "11044",
    "date": "2016-09-15T07:33:19.033Z",
    "bs": "wireless generate methodologies",
    "catchPhrase": "Optional background secured line",
    "companyName": "Corwin LLC",
    "words": "sit dolores aut",
    "sentence": "Non non sit quas."
  }, {
    "id": 8,
    "key": 8,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/haligaliharun/128.jpg",
    "city": "Kaitlynmouth",
    "email": "Jefferey33@hotmail.com",
    "firstName": "Gennaro",
    "lastName": "Waters",
    "street": "O'Hara Radial",
    "zipCode": "91831",
    "date": "2017-01-14T19:25:48.665Z",
    "bs": "open-source morph convergence",
    "catchPhrase": "Polarised interactive protocol",
    "companyName": "Osinski, Gleason and Schimmel",
    "words": "sapiente et praesentium",
    "sentence": "Omnis in voluptatibus enim unde nobis."
  }, {
    "id": 9,
    "key": 9,
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mhaligowski/128.jpg",
    "city": "Hammeschester",
    "email": "Hildegard.Durgan@yahoo.com",
    "firstName": "Erling",
    "lastName": "Armstrong",
    "street": "Fanny Lights",
    "zipCode": "96737-2299",
    "date": "2016-11-13T03:00:06.957Z",
    "bs": "magnetic utilize infrastructures",
    "catchPhrase": "Phased reciprocal firmware",
    "companyName": "Walker - Cartwright",
    "words": "ut qui excepturi",
    "sentence": "Culpa dolore nisi vero non."
  }]`
);

const renderCell = (object, type, key) => {
    const value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'LinkCell':
            return LinkCell(value);
        default:
            return TextCell(value);
    }
};

const columns = [
    {
        title: 'image',
        key: 'avatar',
        width: '1%',
        className: 'isoImageCell',
        render: object => renderCell(object, 'ImageCell', 'avatar'),
    },
    {
        title: 'firstName',
        key: 'firstName',
        width: 100,
        render: object => renderCell(object, 'TextCell', 'firstName'),
    },
    {
        title: 'lastName',
        key: 'lastName',
        width: 100,
        render: object => renderCell(object, 'TextCell', 'lastName'),
    },
    {
        title: 'city',
        key: 'city',
        width: 200,
        render: object => renderCell(object, 'TextCell', 'city'),
    },
    {
        title: 'street',
        key: 'street',
        width: 200,
        render: object => renderCell(object, 'TextCell', 'street'),
    },
    {
        title: 'email',
        key: 'email',
        width: 200,
        render: object => renderCell(object, 'LinkCell', 'email'),
    },
    {
        title: 'dob',
        key: 'date',
        width: 200,
        render: object => renderCell(object, 'DateCell', 'date'),
    },
];

const notificationFakeData = [
    {
        id: 1,
        title: 'Title 1',
        content: 'Content 1',
        category: 'new_release',
        permissions: 'intelligence',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 2,
        title: 'Title 2',
        content: 'Content 1',
        category: 'updates',
        permissions: 'free',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 3,
        title: 'Title 3',
        content: 'Content 1',
        category: 'updates',
        permissions: 'intelligence',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 4,
        title: 'Title 4',
        content: 'Content 1',
        category: 'data_change',
        permissions: 'free',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 5,
        title: 'Title 5',
        content: 'Content 1',
        category: 'new_release',
        permissions: 'intelligence',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 6,
        title: 'Title 6',
        content: 'Content 1',
        category: 'new_release',
        permissions: 'intelligence',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 7,
        title: 'Title 7',
        content: 'Content 1',
        category: 'new_release',
        permissions: 'free',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 8,
        title: 'Title 81',
        content: 'Content 1',
        category: 'new_release',
        permissions: 'intelligence',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 9,
        title: 'Title 7',
        content: 'Content 1',
        category: 'data_change',
        permissions: 'intelligence',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 10,
        title: 'Title 4',
        content: 'Content 1',
        category: 'updates',
        permissions: 'free',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 11,
        title: 'Title 13',
        content: 'Content',
        category: 'new_release',
        permissions: 'free',
        published: 'True',
        Published_at: '2019-02-23',
    },
    {
        id: 12,
        title: 'Title 12',
        content: 'Content 1',
        category: 'updates',
        permissions: 'intelligence',
        published: 'True',
        Published_at: '2019-02-23',
    },
];

export { columns, tableData, notificationFakeData };

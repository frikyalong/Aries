#!/usr/bin/env node
// @flow strict
const execFileSync = require('child_process').execFileSync;
const _ = require('lodash');
const nodemon = require('nodemon');
const inquirer = require('inquirer');

const productionServers = ['www'];
const featureServers = [
    'none',
    'react01.stg-feature',
    'react02.stg-feature',
    'react03.stg-feature',
    'react04.stg-feature',
    'react05.stg-feature',
    'react06.stg-feature',
    'react07.stg-feature',
    'react08.stg-feature',
    'react09.stg-feature',
    'react10.stg-feature',
    'react11.stg-feature',
    'react12.stg-feature',
    'react13.stg-feature',
    'react14.stg-feature',
    'react15.stg-feature',
    'react16.stg-feature',
    'react17.stg-feature',
    'react18.stg-feature',
    'react19.stg-feature',
    'react20.stg-feature',
];

const taiServers = ['tai', 'tai3', 'tai4', 'tai5', 'tai6'];

const djangoServers = [...productionServers, ...featureServers, ...taiServers];

const apiV2Servers = [
    'f-api2-master',
    ..._.range(1, 10).map(n => `f-api2-${n}`),
    'api2-stage',
];

async function getProxy() {
    if (process.env.AA_DJANGO_SERVER) {
        return {};
    }

    const { mainProxy } = await inquirer.prompt([
        {
            type: 'list',
            name: 'mainProxy',
            message: 'Proxy unknown requests to:',
            paginated: true,
            choices: djangoServers,
        },
    ]);

    if (!productionServers.includes(mainProxy)) {
        process.env.IS_FEATURE = true;
    }

    if (mainProxy === 'none') {
        return {
            AA_DJANGO_SERVER: undefined,
            API_V2_SERVER: undefined,
        };
    }

    let apiProxy;
    if (featureServers.includes(mainProxy)) {
        const answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'sameApiServer',
                message: 'Proxy api v2 to the same server?',
            },
            {
                type: 'list',
                name: 'apiProxy',
                message: 'Proxy API v2 requests to:',
                paginated: true,
                when: ({ sameApiServer }) => !sameApiServer,
                choices: apiV2Servers,
            },
        ]);

        apiProxy = answers.apiProxy;
    }

    const isFeature = featureServers.includes(mainProxy);
    const suffix = isFeature ? 'org' : 'com';

    return {
        AA_DJANGO_SERVER: `https://${mainProxy}.appannie.${suffix}`,
        API_V2_SERVER: apiProxy ? `https://${apiProxy}.appannie.${suffix}` : undefined,
    };
}

getProxy().then(data => {
    const env = _.pickBy({ ...process.env, ...data }, _.identity);

    if (process.env.NODE_ENV === 'production') {
        console.log('> Generating a full production build');
        execFileSync('yarn', ['build'], { stdio: 'inherit', env });
    }

    console.log('> Booting server');
    nodemon({
        script: 'server.js',
        watch: ['server.js', 'server/'],
        execMap: {
            js: 'node --inspect=0.0.0.0:9229 --icu-data-dir=node_modules/full-icu',
        },
        env,
    });
});

process.on('SIGINT', () => {
    process.exit(1);
});

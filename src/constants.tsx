import React from 'react'
import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'

export const features = [{
    icon: '🌎',
    title: translate({
        id: 'features.realEnvironments',
        message: 'Test in Real Environments'
    }),
    description: (
        <Translate id="features.realEnvironments.description">
            WebdriverIO allows you to test in actual browser or mobile devices used by your users.
        </Translate>
    ),
},
{
    icon: '🔩',
    title: translate({
        id: 'features.versatile',
        message: 'Versatile and Feature Rich'
    }),
    description: (
        <Translate id="features.versatile.description">
            Use WebdriverIO for full e2e or unit and component testing in the browser.
        </Translate>
    ),
}, {
    icon: '💤',
    title: translate({
        id: 'features.autoWait',
        message: 'Auto Wait'
    }),
    description: (
        <Translate id="features.autoWait.description">
            WebdriverIO automatically waits for elements to appear before interacting with them.
        </Translate>
    ),
}, {
    icon: '📒',
    title: translate({
        id: 'features.standards',
        message: 'Based on Web Standards'
    }),
    description: (
        <Translate
            id="homepage.features.crossBrowser"
            values={{
                webdriverLink: (
                    <Link to="https://w3c.github.io/webdriver/">WebDriver</Link>
                ),
                bidiLink: (
                    <Link to="https://w3c.github.io/webdriver-bidi/">WebDriver Bidi</Link>
                )
            }}>
            {'Cross browser support via automation through {webdriverLink} and {bidiLink}.'}
        </Translate>
    ),
}, {
    icon: '📱',
    title: translate({
        id: 'features.mobileSupport',
        message: 'Native Mobile Support'
    }),
    description: (
        <Translate
            id="homepage.features.mobile"
            values={{
                appiumLink: (
                    <Link to="https://appium.io/">Appium</Link>
                )
            }}>
            {'Run WebdriverIO on real mobile devices, smart TVs or other IoT devices through {appiumLink}.'}
        </Translate>
    ),
}, {
    icon: '🫂',
    title: translate({
        id: 'features.community',
        message: 'Committed Community'
    }),
    description: (
        <Translate
            id="homepage.features.support"
            values={{
                supportChannelLink: (
                    <Link to="https://discord.webdriver.io">
                        <Translate id="sponsors.supportChannel">
                            support channel
                        </Translate>
                    </Link>
                )
            }}>
            {'Running a {supportChannelLink} with over 8k members and a rich ecosystem of community maintained plugins.'}
        </Translate>
    ),
}]

export const logos = [{
    /**
     * Page 1
     */
    img: 'jepsen.jpeg',
    alt: 'Jepsen LLC',
    url: 'https://jepsen.io/'
}, {
    img: 'mongodb.png',
    alt: 'Mongodb',
    url: 'https://www.mongodb.com/'
},
/**
 * Page 2
 */
{
    img: 'postgresql.png',
    alt: 'PostgreSQL',
    url: 'https://www.postgresql.org/'
}, {
    img: 'etcd.png',
    alt: 'etcd',
    url: 'https://etcd.io/'
},
/**
 * Page 3
 */
{
    img: 'duckdb.svg',
    alt: 'DuckDB',
    url: 'https://duckdb.org/'
},
/**
 * Page 3
 */
// {
//     img: 'financialtimes.png',
//     alt: 'Financial Times',
//     url: 'https://www.ft.com/'
// }, {
//     img: 'zendesk.png',
//     alt: 'Zendesk',
//     url: 'https://www.zendesk.com/'
// }, {
//     img: '1und1.png',
//     alt: '1&1',
//     url: 'https://www.1und1.de/'
// }, {
//     img: 'avira.png',
//     alt: 'Avira',
//     url: 'https://www.avira.com/'
// }, {
//     img: 'deloitte.jpg',
//     alt: 'Deloitte',
//     url: 'https://deloitte.com'
// }, {
//     img: 'rabobank.png',
//     alt: 'Rabobank',
//     url: 'https://www.rabobank.com/'
// },
/**
 * Page 4
 */
// {
//     img: 'bedrock.jpg',
//     alt: 'Bedrock Streaming',
//     url: 'https://www.bedrockstreaming.com/'
// }
]

export const logosBugs = [{
    /**
     * Page 1
     */
    img: 'jepsen.jpeg',
    alt: 'Jepsen LLC',
    url: 'https://jepsen.io/'
}, {
    img: 'mongodb.png',
    alt: 'Mongodb',
    url: 'https://www.mongodb.com/'
},
/**
 * Page 2
 */
{
    img: 'postgresql.png',
    alt: 'PostgreSQL',
    url: 'https://www.postgresql.org/'
}, {
    img: 'etcd.png',
    alt: 'etcd',
    url: 'https://etcd.io/'
},
/**
 * Page 3
 */
{
    img: 'duckdb.svg',
    alt: 'DuckDB',
    url: 'https://duckdb.org/'
},
/**
 * Page 3
 */
// {
//     img: 'financialtimes.png',
//     alt: 'Financial Times',
//     url: 'https://www.ft.com/'
// }, {
//     img: 'zendesk.png',
//     alt: 'Zendesk',
//     url: 'https://www.zendesk.com/'
// }, {
//     img: '1und1.png',
//     alt: '1&1',
//     url: 'https://www.1und1.de/'
// }, {
//     img: 'avira.png',
//     alt: 'Avira',
//     url: 'https://www.avira.com/'
// }, {
//     img: 'deloitte.jpg',
//     alt: 'Deloitte',
//     url: 'https://deloitte.com'
// }, {
//     img: 'rabobank.png',
//     alt: 'Rabobank',
//     url: 'https://www.rabobank.com/'
// },
/**
 * Page 4
 */
// {
//     img: 'bedrock.jpg',
//     alt: 'Bedrock Streaming',
//     url: 'https://www.bedrockstreaming.com/'
// }
]

export const LHIntregrationExample = `
await browser.emulate('device', 'iPhone X')
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cacheEnabled: true,
    formFactor: 'mobile'
})

// open application under test
await browser.url('https://localhost:3000')

expect(await browser.getMetrics().firstMeaningfulPaint)
    .toBeBelow(2500)

const pwaCheckResult = await browser.checkPWA()
expect(pwaCheckResult.passed).toBe(true)
`

export const SetupExample = `
$ npm init wdio@latest ./
`

export const ComponentTestingExample = `
import { $, expect } from '@wdio/globals'
import { render } from '@testing-library/vue'
import HelloWorld from '../../src/components/HelloWorld.vue'

describe('Component Testing', () => {
    it('increments value on click', async () => {
        const { getByText } = render(HelloWorld)
        const btn = getByText('count is 0')

        // transform into WebdriverIO element
        const button = await $(btn)

        // interact with element like a real user
        await button.click()
        await button.click()

        await expect(button).toMatchInlineSnapshot(
            "count is 2"
        )
    })
})`

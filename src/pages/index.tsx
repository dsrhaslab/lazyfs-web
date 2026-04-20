import React, { useEffect, useState } from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { translate } from '@docusaurus/Translate'

import styles from './styles.module.css'

const tagline = translate({
    id: 'homepage.tagline',
    message: 'A file system that forgets data'
})

function ComingSoonPage() {
    const { siteConfig } = useDocusaurusContext()
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    const { logos } = mounted ? require('../constants.tsx') : { logos: [] }

    return (
        <Layout
            title={`LazyFS · ${tagline}`}
            description={tagline}
            noFooter={false}
        >
            <main className={styles.csMain}>
                <div className={`${styles.csWrap} ${mounted ? styles.csVisible : ''}`}>

                    {/* Logo */}
                    <div className={styles.csLogo}>
                        <img
                            src={useBaseUrl(siteConfig.themeConfig.image as string)}
                            alt="LazyFS"
                            className={styles.csLogoImg}
                        />
                        <span className={styles.csLogoName}>LazyFS</span>
                    </div>

                    {/* Tagline */}
                    <h1 className={styles.csTagline}>{tagline}</h1>

                    {/* Description */}
                    <p className={styles.csDesc}>
                        A FUSE-based fault-injection file system for testing crash-consistency
                        in production systems. Full documentation coming soon.
                    </p>

                    {/* Badge — after description */}
                    <div className={styles.csBadge}>
                        <span className={styles.csBadgeDot} />
                        Website under construction
                    </div>

                    {/* CTA */}
                    <Link to="https://github.com/dsrhaslab/lazyfs" className={styles.csButton}>
                        View on GitHub
                    </Link>

                    {/* Publication */}
                    <div className={styles.csPaper}>
                        <span className={styles.csPaperLabel}>publication</span>
                        <p className={styles.csPaperCite}>
                            Maria Ramos, João Azevedo, Kyle Kingsbury, José Pereira, Tânia Esteves,
                            Ricardo Macedo, and João Paulo. 2024.{' '}
                            <em>When Amnesia Strikes: Understanding and Reproducing Data Loss Bugs
                            with Fault Injection.</em>{' '}
                            Proc. VLDB Endow. 17, 11 (July 2024), 3017–3030.{' '}
                            <Link to="https://doi.org/10.14778/3681954.3681980" className={styles.csPaperLink}>
                                doi:10.14778/3681954.3681980
                            </Link>
                        </p>
                    </div>

                    {/* Who is using */}
                    {mounted && logos.length > 0 && (
                        <div className={styles.csUsing}>
                            <span className={styles.csUsingLabel}>who is using LazyFS?</span>
                            <div className={styles.csUsingLogos}>
                                {logos.map((logo, i) => (
                                    <Link
                                        key={i}
                                        to={logo.url}
                                        className={styles.csUsingItem}
                                        title={logo.alt}
                                    >
                                        <img src={'img/logos/' + logo.img} alt={logo.alt} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </Layout>
    )
}

export default ComingSoonPage

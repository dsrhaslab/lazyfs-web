import React from 'react'
import styles from './LogoCarousel.module.css'

type LogoProps = {
    logos: Array<{
        img: string
        alt: string
        url: string
    }>
    mytitle?: string
}

export default function LogoCarousel({ logos, mytitle }: LogoProps) {
    if (!logos || logos.length === 0) return null

    return (
        <div className={styles.companyUsage}>
            <h3 className={styles.title}>{mytitle}</h3>
            <div className={styles.grid}>
                {logos.map((logo, index) => (
                    <a
                        key={index}
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.logoItem}
                        title={logo.alt}
                    >
                        <img src={'img/logos/' + logo.img} alt={logo.alt} />
                    </a>
                ))}
            </div>
        </div>
    )
}

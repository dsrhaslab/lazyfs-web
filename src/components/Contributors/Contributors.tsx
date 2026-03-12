import React, { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'
import './contributors.css'
import Translate from '@docusaurus/Translate'

type Contributor = {
    login: string
    contributions: number
    html_url: string
    avatar_url: string
}

// per page max 99 items
type ContibutorProps = {
    contributorsPerPage: number;
    contributorsIgnore: Array<string>;
}

const defaultIgnoreContributors: string[] = ['wdio-bot', 'dependabot']
const ContributorList: React.FC = ({ contributorsPerPage = 99, contributorsIgnore = defaultIgnoreContributors }:ContibutorProps) => {
    const [contributors, setContributors] = useState<Contributor>([])
    useEffect(() => {
        const fetchContributors = async () => {
            const octokit = new Octokit()
            try {
                const response = await octokit.request(`GET /repos/{owner}/{repo}/contributors?per_page=${contributorsPerPage + contributorsIgnore.length}`, {
                    owner: 'dsrhaslab',
                    repo: 'lazyfs',
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
                const filteredContributors = response.data.filter((contribuidor: Contributor) =>
                    !contributorsIgnore.some(element =>
                        contribuidor.login.toLowerCase().includes(element.toLowerCase())
                    )
                )

                setContributors(filteredContributors)
            } catch (error) {
                console.error('Error fetching contributors:', error)
            }
        }

        fetchContributors()
    }, [])

    return (
        <>
            <div className='father-flex-div'>
                <p className='intro'>
                    <Translate
                        id="contributors.thankYouMessage"
                        description="Thank you message for contributors"
                        values={{
                            toolName: <a href="https://github.com/dsrhaslab/lazyfs"><i>LazyFS</i></a>
                        }}
                    >
                        {'We sincerely thank all contributors for their valuable efforts in developing and improving {toolName}!'}
                    </Translate>
                </p>
                <div className="grid">
                    {[0, 1].map((value) => {
                        const middle = Math.ceil(contributors.length / 2)
                        const start = value === 0 ? 0 : middle
                        const end = value === 0 ? middle : contributors.length

                        return (
                            <div className="grid-item fade-horizontal" key={value}>
                                {contributors.slice(start, end).map((contributor) => (
                                    <div className="circle" key={contributor.login}>
                                        <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
                                            <img
                                                className="circle"
                                                src={contributor.avatar_url}
                                                alt={`${contributor.login}'s avatar`}
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default ContributorList

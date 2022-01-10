import React from 'react';
import Head from 'next/head';

const props: {[name: string]: string} = {
	title: 'Johnny Ray Alt - Software Engineer and Artist',
	description: `This site servers to be an archive of projects or works I've completed over the years`,
	siteName: 'Johnny Ray Alt',
	canonical: 'https://www.johnnyrayalt.net/'
}

const MetaInjector = (props: {[name: string]: string}): JSX.Element => {
	return (
		<Head>
			<title>{props.title}</title>
			<meta name="description" content={props.description} />
			<meta property="og:type" content="website" />
			<meta name="og:title" property="og:title" content={props.title} />
			<meta name="og:description" property="og:description" content={props.description} />
			<meta property="og:site_name" content={props.siteName} />
			<meta property="og:url" content='https://www.johnnyrayalt.net/' />
			<link rel="icon" type="image/png" href="/static/images/favicon.ico" />
			<link rel="apple-touch-icon" href="/static/images/favicon.ico" />
			{props.css && <link rel="stylesheet" href={`${props.css}`} />}
			{props.image ? (<meta property="og:image" content={`${props.image}`} />) : (<meta property="og:image" content="https://www.johnnyrayalt.net/static/images/test.png" />  )}
			{props.canonical && <link rel="canonical" href={`${props.canonical}`} />}
		</Head>
	)
}

export default MetaInjector;
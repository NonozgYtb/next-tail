import React, { Component } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { LayoutContextProvider } from "../Utils/Context/LayoutContext";
import { TooltipGenerator } from "./Tooltip";
import Footer from "./Footer";

interface LayoutProps {
	title: string;
	description: string;
	hideFollow?: boolean;
	className?: string;
	id: string;
}

export default class Layout extends Component<
	LayoutProps,
	{ isPreloaded: boolean }
> {
	timeoutId!: NodeJS.Timeout;
	render() {
		const { children, title, description, className } = this.props;
		return (
			<>
				<Head>
					<title>{(title ? title + " - " : "") + "Site Internet"} </title>
					<link rel="apple-touch-icon" sizes="180x180" href="/logo.jpg" />
					<link
						rel="icon"
						type="image/jpeg"
						sizes="32x32"
						href="/logo.jpg"
					/>
					<link
						rel="icon"
						type="image/jpeg"
						sizes="16x16"
						href="/logo.jpg"
					/>
					<link
						rel="icon"
						type="image/jpeg"
						href="/logo.jpg"
						sizes="192x192"
					/>
					<link
						rel="icon"
						type="image/jpeg"
						href="/logo.jpg"
						sizes="512x512"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<meta name="description" content={description + " - Site Internet"} />
					<meta name="googlebot" content="noindex" />
					<meta name="robots" content="noindex" />
					<meta name="author" content="Site Internet" />
					<link rel="icon" href="/favicon.ico" />
					<link
						rel="sitemap"
						type="application/xml"
						title="Sitemap"
						href="/sitemap.xml"
					/>
				</Head>
				<LayoutContextProvider>
					<div
						className={
							`${className} w-full min-h-full text-skin-text bg-gray-600 flex flex-col z-bg-site`
						}
					>
						<Navbar currentId={this.props.id} />
						<TooltipGenerator />
						{children}
						<Footer />
					</div>
				</LayoutContextProvider>
			</>
		);
	}
}

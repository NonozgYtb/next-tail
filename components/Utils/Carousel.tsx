/* eslint-disable @next/next/no-css-tags */
import React, { Component, createRef } from "react";
import Head from "next/head";
import $ from "jquery";
import owlInit from "../../assets/js/owl.carousel2";

export default class Carousel extends Component<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	owlConfig: { [key: string]: any };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}> {
	private ref = createRef<HTMLDivElement>();

	componentDidMount() {
		this.owl();
	}
	async owl() {
		owlInit($);
		($(this.ref.current as HTMLDivElement) as any).owlCarousel(
			this.props.owlConfig
		);
	}

	render() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { owlConfig, ...props } = this.props;
		return (
			<>
				<Head>
					<link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
				</Head>
				<div ref={this.ref} {...props} />
			</>
		);
	}
}
const svgRight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
      </svg>`;

const svgLeft = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>`;

export const navText = [
	`<div class="nav-div nav-div-left"><button class="nav-btn" type="button" role="presentation">${svgLeft}</button></div>`,
	`<div class="nav-div nav-div-right"><button class="nav-btn" type="button" role="presentation">${svgRight}</button></div>`,
];

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import {
	ExclamationIcon,
	XIcon,
	ExclamationCircleIcon,
	CubeIcon,
	InformationCircleIcon,
	CheckCircleIcon,
} from "@heroicons/react/outline";

import React, { Component, Fragment } from "react";
import Collapse from "../Utils/Collapse";
// eslint-disable-next-line import/no-cycle
import {
	LayoutContext,
	LayoutContextState,
} from "../Utils/Context/LayoutContext";

export enum TooltipType {
	INFO = "info",
	SUCCESS = "success",
	WARNING = "alert",
	ERROR = "danger",
	DATA = "data",
}

const IconsType = {
	[TooltipType.WARNING]: ExclamationIcon,
	[TooltipType.ERROR]: ExclamationCircleIcon,
	[TooltipType.DATA]: CubeIcon,
	[TooltipType.INFO]: InformationCircleIcon,
	[TooltipType.SUCCESS]: CheckCircleIcon,
};

export interface TooltipProps {
	url?: string;
	type: TooltipType;
	label: string;
	id: string;
	priority?: number;
	closable?: boolean;
}

export default class Tooltip extends Component<TooltipProps> {
	static contextType = LayoutContext;
	context!: LayoutContextState;
	componentDidMount() {
		this.context.setTooltip(this.props);
	}
	render() {
		return <></>;
	}
}

class TooltipItem extends Component<TooltipProps> {
	static contextType = LayoutContext;
	context!: LayoutContextState;
	render() {
		const Icon = IconsType[this.props.type];
		return this.props.closable === true ? (
			<Disclosure
				defaultOpen
				as="section"
				id={`tooltip-${this.props.id}`}
				role="banner"
				className={`bg-skin-${this.props.type} tooltip`}
			>
				{({ open }) => (
					<Collapse
						transition
						checkTimeout={10}
						transitionTime={100}
						className="w-full"
						isOpened={open}
					>
						<Disclosure.Panel className="tooltip-inblock">
							<span className="tooltip-icon">
								<Icon className="inline-block icon-size" />
							</span>
							{this.props.url ? (
								<Link href={this.props.url}>
									<a target="_blank" className="tooltip-label">
										{this.props.label}
									</a>
								</Link>
							) : (
								<span className="tooltip-label">{this.props.label}</span>
							)}
							<Disclosure.Button as={Fragment}>
								<button
									type="button"
									onClick={() => {
										setTimeout(() => {
											this.context.rmTooltip(this.props.id);
										}, 700);
									}}
									className="tooltip-cls-btn"
								>
									<span className="just-icon">
										<XIcon className="" />
									</span>
								</button>
							</Disclosure.Button>
						</Disclosure.Panel>
					</Collapse>
				)}
			</Disclosure>
		) : (
			<section
				id={`tooltip-${this.props.id}`}
				role="banner"
				className={`bg-skin-${this.props.type} tooltip`}
			>
				<div className="tooltip-inblock">
					<span className="tooltip-icon">
						<Icon className="inline-block icon-size" />
					</span>
					{this.props.url ? (
						<Link href={this.props.url}>
							<a target="_blank" className="tooltip-label">
								{this.props.label}
							</a>
						</Link>
					) : (
						<span className="tooltip-label">{this.props.label}</span>
					)}
				</div>
			</section>
		);
	}
}

export class TooltipGenerator extends Component {
	static contextType = LayoutContext;
	context!: LayoutContextState;
	render() {
		return Object.values(this.context.tooltip)
			.sort(({ priority: a = -1 }, { priority: b = -1 }) => b - a)
			.map((prop) => <TooltipItem key={prop.id} {...prop} />);
	}
}

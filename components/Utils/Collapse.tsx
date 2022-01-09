import { Transition } from "@headlessui/react";
import React, { Component, CSSProperties, Fragment, ReactNode } from "react";

interface CollapseOnFuncProps {
	isFullyOpened: boolean;
	isFullyClosed: boolean;
	isOpened: boolean;
	containerHeight: number;
	contentHeight: number;
}

interface CollapseProps {
	isOpened: boolean;
	transition?: boolean;
	transitionTime?: number;
	unmountOnClose?: boolean;
	onRest?(params: CollapseOnFuncProps): void;
	onWork?(params: CollapseOnFuncProps): void;
	checkTimeout?: number;
	children: ReactNode;
	className?: string;
	inClassName?: string;
	style?: CSSProperties;
	inStyle?: CSSProperties;
}

export default class Collapse extends Component<CollapseProps> {
	static defaultProps: CollapseProps = {
		isOpened: true,
		onRest: () => undefined,
		onWork: () => undefined,
		checkTimeout: 50,
		transitionTime: 500,
		children: Fragment,
		className: "",
		inClassName: "",
		style: {},
		inStyle: {},
	};

	content!: HTMLDivElement;
	container!: HTMLDivElement;
	initialStyle: CSSProperties;
	timeout!: NodeJS.Timeout;

	constructor(props: CollapseProps) {
		super(props);
		this.initialStyle = this.props.isOpened
			? {
					...this.props.style,
					height: "auto",
					overflow: "initial",
					transition: `all ${this.props.transitionTime}ms`,
			  }
			: {
					...this.props.style,
					height: "0px",
					overflow: "hidden",
					transition: `all ${this.props.transitionTime}ms`,
			  };
	}

	componentDidMount() {
		this.onResize();
	}

	shouldComponentUpdate(nextProps: CollapseProps) {
		const { isOpened, children } = this.props;

		return children !== nextProps.children || isOpened !== nextProps.isOpened;
	}

	getSnapshotBeforeUpdate() {
		if (!this.container || !this.content) {
			return null;
		}
		if (this.container.style.height === "auto") {
			const { clientHeight: contentHeight } = this.content;
			this.container.style.height = `${contentHeight}px`;
		}
		return null;
	}

	componentDidUpdate() {
		setTimeout(() => this.onResize(), 10);
	}

	componentWillUnmount() {
		global.clearTimeout(this.timeout);
	}

	onResize = () => {
		global.clearTimeout(this.timeout);

		if (!this.container || !this.content) {
			return;
		}

		const { isOpened, checkTimeout } = this.props;
		const { clientHeight: containerHeight } = this.container;
		const { clientHeight: contentHeight } = this.content;

		const isFullyOpened = isOpened && contentHeight === containerHeight;
		const isFullyClosed = !isOpened && containerHeight === 0;

		if (isFullyOpened || isFullyClosed) {
			this.onRest({
				isFullyOpened,
				isFullyClosed,
				isOpened,
				containerHeight,
				contentHeight,
			});
		} else {
			this.onWork({
				isFullyOpened,
				isFullyClosed,
				isOpened,
				containerHeight,
				contentHeight,
			});
			this.timeout = setTimeout(() => this.onResize(), checkTimeout);
		}
	};

	onRest = ({
		isFullyOpened,
		isFullyClosed,
		isOpened,
		containerHeight,
		contentHeight,
	}: CollapseOnFuncProps) => {
		if (!this.container || !this.content) {
			return;
		}

		const hasOpened =
			isOpened && this.container.style.height === `${contentHeight}px`;
		const hasClosed = !isOpened && this.container.style.height === "0px";

		if (hasOpened || hasClosed) {
			this.container.style.overflow = isOpened ? "initial" : "hidden";
			this.container.style.height = isOpened ? "auto" : "0px";

			const { onRest } = this.props;
			if (onRest) {
				onRest({
					isFullyOpened,
					isFullyClosed,
					isOpened,
					containerHeight,
					contentHeight,
				});
			}
		}
	};

	onWork = ({
		isFullyOpened,
		isFullyClosed,
		isOpened,
		containerHeight,
		contentHeight,
	}: CollapseOnFuncProps) => {
		if (!this.container || !this.content) {
			return;
		}

		const isOpenining =
			isOpened && this.container.style.height === `${contentHeight}px`;
		const isClosing = !isOpened && this.container.style.height === "0px";

		if (isOpenining || isClosing) {
			// No need to do any work
			return;
		}

		this.container.style.overflow = "hidden";
		this.container.style.height = isOpened ? `${contentHeight}px` : "0px";

		const { onWork } = this.props;
		if (onWork) {
			onWork({
				isFullyOpened,
				isFullyClosed,
				isOpened,
				containerHeight,
				contentHeight,
			});
		}
	};

	onRefContainer = (container: HTMLDivElement) => {
		this.container = container;
	};

	onRefContent = (content: HTMLDivElement) => {
		this.content = content;
	};

	render() {
		const { children, isOpened } = this.props;
		return (
			<div
				ref={this.onRefContainer}
				className={this.props.className}
				style={this.initialStyle}
				aria-hidden={!isOpened}
			>
				<div
					ref={this.onRefContent}
					style={this.props.inStyle}
					className={this.props.inClassName}
				>
					{this.props.transition ? (
						<Transition
							show={isOpened}
							as={Fragment}
							enter="transition duration-700"
							leave="transition duration-700"
						>
							{children}
						</Transition>
					) : (
						children
					)}
				</div>
			</div>
		);
	}
}

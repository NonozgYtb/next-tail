/* eslint-disable react/no-unused-state */
import React, { Component, createContext } from "react";
import type { TooltipProps } from "../../A-Global/Tooltip";

export interface TooltipDatas {
	[key: string]: TooltipProps;
}

export type LayoutContextState = {
	tooltip: TooltipDatas;
	setTooltip(tooltipProps: TooltipProps): void;
	rmTooltip(tooltipId: string): void;
};

export const LayoutContext = createContext<LayoutContextState>({
	tooltip: {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setTooltip() {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	rmTooltip() {},
});

interface Props {
	children: React.ReactNode;
}

export class LayoutContextProvider extends Component<
	Props,
	LayoutContextState
> {
	constructor(props: Props) {
		super(props);

		this.state = {
			tooltip: {},
			setTooltip: (tooltipProps: TooltipProps) => {
				const a = (_prev: TooltipDatas): TooltipDatas => ({
					..._prev,
					[tooltipProps.id]: tooltipProps,
				});
				this.setState((prev) => ({ tooltip: a(prev.tooltip) }));
			},

			rmTooltip: (tooltipId: string) => {
				this.setState((prev) => {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { [tooltipId]: __, ...tooltip } = prev.tooltip;
					return { tooltip };
				});
			},
		};
	}

	render() {
		return (
			<LayoutContext.Provider value={this.state}>
				{this.props.children}
			</LayoutContext.Provider>
		);
	}
}

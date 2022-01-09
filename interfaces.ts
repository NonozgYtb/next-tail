/* eslint-disable @typescript-eslint/no-namespace */

export namespace Navigation {
	export type Item = SimpleItem | DropDownItem;
	export interface SimpleItem {
		name: string;
		href: string;
		id: string;
	}
	export interface DropDownItem {
		name: string;
		img?: string;
		subitems: DropDownSubItem[];
	}
	export interface DropDownSubItem {
		name: string;
		href: string;
		id: string;
	}
}

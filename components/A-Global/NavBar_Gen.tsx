import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon as ChevronLeftIconTiny } from "@heroicons/react/solid";
import Collapse from "../Utils/Collapse";
import { Navigation } from "../../interfaces";

const genClassNameDesktop = (current: boolean) =>
		`${current
			? "bg-skin-nav-active text-white"
			: "text-gray-300 hover:text-white"} hover:bg-skin-nav-hover px-3 py-2 rounded-md text-sm font-medium`
const genClassNameMobile = (current: boolean, add?: string) =>
		
		`${current
			? "bg-skin-nav-active text-white"
			: "text-gray-300 hover:text-white"} hover:bg-skin-nav-hover block px-3 py-2 rounded-md text-base font-medium ${add}` 
	
// eslint-disable-next-line no-lone-blocks
{
	/* <img
			key="img"
			alt="grass"
			src={items.img}
			className="block object-cover w-full max-h-20"
		/> */
}
export const genDDItemsDesktop = (
	items: Navigation.DropDownItem,
	currentId: string
) => [
	// eslint-disable-next-line no-unneeded-ternary
	items.img?.length ? false : false,
	...items.subitems.map((item: Navigation.DropDownSubItem, i) => (
		<Menu.Item key={i}>
			<a
				href={item.href}
				className={
					`block px-4 py-2 text-sm text-gray-700 bg-opacity-0 bg-white transition ${item.id === currentId
						? "font-bold hover:bg-opacity-40"
						: "hover:bg-opacity-40"}`
				}
				aria-current={item.id === currentId ? "page" : undefined}
			>
				{item.name}
			</a>
		</Menu.Item>
	)),
	false,
];

export const genItemDesktop = (
	item: Navigation.Item,
	currentId: string,
	i: number
) =>
	"href" in item ? (
		<a
			key={i}
			href={item.href}
			className={genClassNameDesktop(item.id === currentId)}
		>
			{item.name}
		</a>
	) : (
		<Menu as="div" key={i} className="relative ">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="flex w-full text-sm">
							<a
								className={genClassNameDesktop(
									item.subitems.findIndex((e) => e.id === currentId) !== -1
								)}
							>
								{item.name}
								<span className="">
									<span className="sr-only">Arrow Indication for Dropdown</span>
									<ChevronLeftIconTiny
										className={
											`w-h-nav transform transition-transform duration-200 inline-block" ${open ? "-rotate-90" : "rotate-0"}`
										}
										aria-hidden="true"
									/>
								</span>
							</a>
						</Menu.Button>
					</div>
					<Transition
						show={open}
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items static className="nav-dropdown desktop-dropdown">
							{genDDItemsDesktop(item, currentId)}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);

export const genDDItemsMobile = (
	items: Navigation.DropDownSubItem[],
	currentId: string
) =>
	items.map((item, i) => (
		<Menu.Item key={i}>
			{({ active }) => (
				<a
					href="#"
					className={
						`block px-4 py-2 text-sm text-gray-700 ${item.id === currentId
							? "font-bold hover:bg-gray-300"
							: "hover:bg-gray-200"} ${active
							? item.id === currentId
								? "bg-gray-300"
								: "bg-gray-200"
							: false}`
					}
					aria-current={item.id === currentId ? "page" : undefined}
				>
					{item.name}
				</a>
			)}
		</Menu.Item>
	));

export const genItemMobile = (
	item: Navigation.Item,
	currentId: string,
	i: number
) =>
	"href" in item ? (
		<a
			key={i}
			href={item.href}
			className={genClassNameMobile(item.id === currentId)}
		>
			{item.name}
		</a>
	) : (
		<Menu as="div" key={i} className="relative ">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="flex w-full text-sm">
							<a
								className={genClassNameMobile(
									item.subitems.findIndex((e) => e.id === currentId) !== -1,
									"w-full text-left outline-none"
								)}
							>
								<span>{item.name}</span>
								<span className="float-right">
									<span className="sr-only">Arrow Indication for Dropdown</span>
									<ChevronLeftIcon
										className={
											`w-h-nav transform transition-transform duration-500 inline-block ${open ? "-rotate-90" : "rotate-0"}`
											
										}
										aria-hidden="true"
									/>
								</span>
							</a>
						</Menu.Button>
					</div>
					<Collapse transition className="mt-0" isOpened={open}>
						<Menu.Items className="w-full py-1 mt-1 bg-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							{genDDItemsMobile(item.subitems, currentId)}
						</Menu.Items>
					</Collapse>
				</>
			)}
		</Menu>
	);

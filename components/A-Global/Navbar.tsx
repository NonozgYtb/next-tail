/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Collapse from "../Utils/Collapse";
import { Navigation } from "../../interfaces";
import { genItemDesktop, genItemMobile } from "./NavBar_Gen";

const navigation: Navigation.Item[] = [
	{ name: "Accueil", href: "/", id: "home" },
	{ name: "Link", href: "/link", id: "link" },
	{
		name: "Dropdown",
		subitems: [
			{ name: "Dropdown Item 1", href: "/dropdown/item", id: "drop-1" },
		],
	},
];

export default class Navbar extends Component<{ currentId: string }> {
	render() {
		return (
			<Disclosure as="nav" className="sticky top-0 shadow-2xl navbar">
				{({ open }) => (
					<>
						<div className="mx-2 sm:mx-8 lg:mx-16 xl:mx-24">
							<div className="global-bar">
								<div className="open-menu-section">
									{/* Mobile menu button*/}
									<Disclosure.Button className="open-menu">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block w-6 h-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block w-6 h-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="link-section">
									<div className="flex items-center flex-shrink-0">
										{/* <img
											className="block w-auto h-8 lg:hidden"
											src="/images/lib/logos/navbar.svg"
											alt="Workflow"
										/>
										<img
											className="hidden w-auto h-8 lg:block"
											src="/images/lib/logos/navbar-large.svg"
											alt="Workflow"
										/> */}
										<img
											className="block w-auto transform scale-125 h-9"
											src="/logo.jpg"
											alt="Workflow"
										/>
									</div>
									<div className="hidden sm:block sm:ml-6">
										<div className="flex space-x-3">
											{navigation.map((item, i) =>
												genItemDesktop(item, this.props.currentId, i)
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="px-2 sm:hidden ">
							<Collapse isOpened={open} transition>
								<Disclosure.Panel>
									<Menu>
										<div className="mobile-link-section">
											{navigation.map((item, i) => (
												<Menu.Item key={i}>
													{genItemMobile(item, this.props.currentId, i)}
												</Menu.Item>
											))}
										</div>
									</Menu>
								</Disclosure.Panel>
							</Collapse>
						</div>
					</>
				)}
			</Disclosure>
		);
	}
}

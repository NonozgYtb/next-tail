import Layout from "../components/A-Global/Layout";

export default function Home() {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
		>
			<Layout id="home" title="Exemple" description="Page d'exemple">
				<main className="flex-1 mx-2 sm:mx-8 lg:mx-16 xl:mx-24">Hello</main>
			</Layout>
		</div>
	);
}

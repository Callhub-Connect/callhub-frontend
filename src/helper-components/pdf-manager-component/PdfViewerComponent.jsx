import { useEffect, useRef } from 'react';

export default function PdfViewerComponent(props) {
	const containerRef = useRef(null);

	useEffect(() => {
		console.log("loeading new")
		const container = containerRef.current;
		let instance, PSPDFKit;
		(async function () {
			PSPDFKit = await import('pspdfkit');

			PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

			instance = await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// The document to open.
				document: props.document,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, [props]);
	
	// const instance = PSPDFKit.instance.default;
	// instance.exportPDF().then(arrayBuffer => {
	// const blob = new Blob ( [arrayBuffer], { type: "application/pdf" });
	// });
	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '80%' }}
		/>
	);
}import { useEffect, useRef } from 'react';

export default function PdfViewerComponent(props) {
	const containerRef = useRef(null);

	useEffect(() => {
		console.log("loeading new")
		const container = containerRef.current;
		// eslint-disable-next-line no-unused-vars
		let instance, PSPDFKit;
		(async function () {
			PSPDFKit = await import('pspdfkit');

			PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

			instance = await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// The document to open.
				document: props.document,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, [props]);
	
	// const instance = PSPDFKit.instance.default;
	// instance.exportPDF().then(arrayBuffer => {
	// const blob = new Blob ( [arrayBuffer], { type: "application/pdf" });
	// });
	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100%' }}
		/>
	);
}
import { useEffect, useRef, useState } from 'react';

export default function PdfViewerComponent(props) {
	const containerRef = useRef(null);
	const [pdfInstance, setPdfInstance] = useState(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const container = containerRef.current;
		let PSPDFKit;
		(async function () {
			PSPDFKit = await import('pspdfkit');
			PSPDFKit.unload(container); // Ensure there's only one instance
	
			const instance = await PSPDFKit.load({
				container,
				document: props.document,
				baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
			});
	
			setPdfInstance(instance); // Set instance here inside async function
		})();
	
		return () => {
			if (PSPDFKit && container) {
				PSPDFKit.unload(container);
			}
		};
	}, [props.document]); // Dependency array should contain props.document	

	// eslint-disable-next-line no-unused-vars
	const exportPdf = async () => {
		if (pdfInstance) {
		  const pdfData = await pdfInstance.exportPDF();
		  return new Blob([pdfData], { type: "application/pdf" });
		}
	};

	// Expose the exportPdf function to parent via props
	useEffect(() => {
	if (pdfInstance) {
		const exportPdf = async () => {
			const pdfData = await pdfInstance.exportPDF();
			return new Blob([pdfData], { type: "application/pdf" });
		};

		props.onInstanceChange({
			exportPdf,
		});
	}
	// eslint-disable-next-line
	}, [pdfInstance]);
	
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
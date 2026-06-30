import { useEffect } from "react";

function setMeta(name: string, content: string) {
	let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
	if (!tag) {
		tag = document.createElement("meta");
		tag.setAttribute("name", name);
		document.head.appendChild(tag);
	}
	tag.setAttribute("content", content);
}

export function useLegalPageMeta(title: string, description: string) {
	useEffect(() => {
		const previousTitle = document.title;
		document.title = title;
		setMeta("description", description);
		setMeta("robots", "index, follow");
		return () => {
			document.title = previousTitle;
		};
	}, [title, description]);
}

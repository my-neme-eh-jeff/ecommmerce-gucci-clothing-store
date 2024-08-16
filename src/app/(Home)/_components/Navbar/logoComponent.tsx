"use client";
import { useEffect, useState } from "react";
import { LogoVersion } from "../Sections/HeroSection/MainHeading";

export default function LogoComponent() {
	const [showLogo, setShowLogo] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			setShowLogo(scrollTop > 358);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return showLogo ? (
		<div className="logo flex items-center">
			<LogoVersion />
		</div>
	) : null;
}

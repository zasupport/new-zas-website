import {
	ArrowRight,
	BatteryCharging,
	Camera,
	CheckCircle,
	Cloud,
	Laptop,
	Monitor,
	Network,
	Phone,
	Printer,
	Server,
	ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQAccordion from "@/components/ui/FAQ";
import portfolio from "@/data/technology-portfolio.json";
import { buildWhatsAppUrl } from "@/lib/constants";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
	title:
		"Technology Brand Portfolio Johannesburg | Business IT Sourcing | ZA Support",
	description:
		"Our current verified technology portfolio: business devices, networking, security, storage, print and power brands that ZA Support sources, deploys and supports for Johannesburg businesses. Call 064 529 5863.",
	alternates: { canonical: "https://zasupport.com/technology-portfolio" },
	keywords: [
		"technology procurement Johannesburg",
		"business IT hardware supplier Johannesburg",
		"IT equipment sourcing Gauteng",
		"business laptop supplier Johannesburg",
		"networking equipment supplier Johannesburg",
		"UPS supplier business Johannesburg",
	],
};

const categoryIcons: Record<string, typeof Laptop> = {
	"Business devices": Laptop,
	"Displays and audiovisual": Monitor,
	"Networking and connectivity": Network,
	"Cybersecurity and management": ShieldCheck,
	"Cloud and software": Cloud,
	"Servers and storage": Server,
	"Print and workplace": Printer,
	"Power and continuity": BatteryCharging,
	"Physical security": Camera,
};

const categoryBlurbs: Record<string, string> = {
	"Business devices":
		"Desktops, notebooks, workstations, tablets and mobile devices for staff at every level, specified for the work they actually do.",
	"Displays and audiovisual":
		"Monitors, commercial displays, projectors, video conferencing and meeting-room audio that make hybrid work usable.",
	"Networking and connectivity":
		"Switching, routing, WiFi, fibre and communications infrastructure, designed and installed to carry your business reliably.",
	"Cybersecurity and management":
		"Endpoint security, identity, device management and monitoring that protect data and satisfy POPIA obligations.",
	"Cloud and software":
		"Productivity, collaboration, operating systems, licensing and cloud services, procured and administered correctly from day one.",
	"Servers and storage":
		"Servers, NAS, storage, virtualisation, backup and recovery sized to your data and your tolerance for downtime.",
	"Print and workplace":
		"Printers, scanners, peripherals and workplace accessories that staff depend on daily.",
	"Power and continuity":
		"UPS, backup power and power protection, essential in South Africa, specified against your actual load.",
	"Physical security":
		"Surveillance, access control and related infrastructure, deployed with the same discipline as the rest of your network.",
};

const faqs = [
	{
		question: "Does ZA Support sell hardware directly, like an online store?",
		answer:
			"No. ZA Support is a procurement and managed IT partner, not a web shop. We source equipment through our technology supply network against a written quotation, then configure, deploy and support it as part of your environment. That means the device that arrives is ready for work, not just a box.",
	},
	{
		question: "Are these all the brands ZA Support can source?",
		answer:
			"This page lists our current verified technology portfolio, selected brands available through our technology supply network. It is not a complete list. If the brand or product you need is not shown, ask us, sourcing against a specific requirement is exactly what our procurement service does.",
	},
	{
		question: "How does pricing work for equipment sourcing?",
		answer:
			"Every request is quoted in writing. Availability, configuration, price and delivery timing are confirmed during quotation, because stock positions and exchange rates move. You approve the written quote before we place any order.",
	},
	{
		question: "Can ZA Support handle an entire office technology rollout?",
		answer:
			"Yes. We handle requirements discovery, specification, sourcing, configuration, deployment, asset registration and ongoing support as one engagement. Our procurement service page describes the full lifecycle, from first scoping conversation to refresh planning years later.",
	},
	{
		question: "Do you only supply Apple equipment?",
		answer:
			"Apple is our deepest specialisation, and we support mixed environments every day. The portfolio spans Windows devices, networking, security, storage, print and power, because real businesses run on more than one platform.",
	},
	{
		question: "What happens after the equipment is delivered?",
		answer:
			"Delivery is the midpoint, not the end. We configure and harden devices, enrol them into management, register them on your asset register, and support them under your service agreement. Warranty coordination and end-of-life planning are part of the same service.",
	},
];

export default function TechnologyPortfolioPage() {
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", url: "https://zasupport.com" },
		{ name: "Business", url: "https://zasupport.com/business" },
		{
			name: "Technology Portfolio",
			url: "https://zasupport.com/technology-portfolio",
		},
	]);

	return (
		<>
			<SchemaOrg schema={breadcrumbSchema} />

			{/* Hero */}
			<section className="hero-gradient grid-overlay pt-32 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-6">
						<Breadcrumb
							items={[
								{ label: "Business", href: "/business" },
								{ label: "Technology Portfolio" },
							]}
						/>
					</div>
					<div className="max-w-4xl">
						<p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
							Business Technology Sourcing · Johannesburg &amp; Gauteng
						</p>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
							Our current verified
							<br />
							<span className="text-[#0FEA7A]">technology portfolio</span>
						</h1>
						<p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-4">
							ZA Support sources, configures, deploys, supports and manages a
							broad range of business technologies for Johannesburg companies.
							The brands below are selected brands available through our
							technology supply network, organised by what they do for your
							business.
						</p>
						<p className="text-sm text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
							Availability, configuration, price and delivery timing are
							confirmed during quotation. Listing here does not assert an
							official partnership with any brand.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href={buildWhatsAppUrl(
									"PORTFOLIO-HERO",
									"technology-portfolio",
								)}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
							>
								<Phone className="w-5 h-5" /> Request a sourcing quotation
							</a>
							<Link
								href="/procurement"
								className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
							>
								<ArrowRight className="w-5 h-5" /> How our procurement service
								works
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Category jump navigation (crawlable, full list below in initial HTML) */}
			<section className="py-8 bg-[#0F2522] border-y border-[rgba(15,234,122,0.12)]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3">
					{portfolio.categories.map((c) => (
						<a
							key={c.name}
							href={`#${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
							className="text-sm text-[#7A9E98] border border-[rgba(15,234,122,0.18)] rounded-full px-4 py-2 hover:text-[#0FEA7A] hover:border-[#0FEA7A]/50 transition-all"
						>
							{c.name}
						</a>
					))}
				</div>
			</section>

			{/* Categories */}
			<section className="py-16 bg-[#0A1A18]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
					{portfolio.categories.map((c) => {
						const Icon = categoryIcons[c.name] ?? CheckCircle;
						const anchor = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
						return (
							<div key={c.name} id={anchor} className="scroll-mt-28">
								<div className="flex items-center gap-3 mb-3">
									<Icon className="w-7 h-7 text-[#0FEA7A]" />
									<h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F4F1]">
										{c.name}
									</h2>
								</div>
								<p className="text-[#7A9E98] max-w-3xl mb-6">
									{categoryBlurbs[c.name]}
								</p>
								<ul className="flex flex-wrap gap-3">
									{c.brands.map((b) => (
										<li
											key={b}
											className="text-[#E8F4F1] text-sm font-semibold bg-[#0F2522] border border-[rgba(15,234,122,0.18)] rounded-xl px-5 py-3"
										>
											{b}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</section>

			{/* What we do with it */}
			<section className="py-16 bg-[#0F2522]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
						Equipment is the start, not the service
					</h2>
					<p className="text-[#7A9E98] mb-10 max-w-3xl">
						Anyone can ship a box. Our value is what happens around it:
						procurement, implementation, managed support, repair and lifecycle
						management, delivered by the team that already looks after your
						environment.
					</p>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								title: "Procurement and sourcing",
								href: "/procurement",
								desc: "Requirements discovery, specification, quotation and acquisition through our supply network.",
							},
							{
								title: "Managed IT services",
								href: "/managed-services",
								desc: "Monitoring, updates, security and support for everything we deploy, under one agreement.",
							},
							{
								title: "Device management",
								href: "/jamf-mdm",
								desc: "MDM enrolment, configuration profiles and security baselines applied before handover.",
							},
							{
								title: "Repair and workshop",
								href: "/apple-repair",
								desc: "Component-level repair in our Hyde Park workshop keeps equipment in service longer.",
							},
							{
								title: "Business support",
								href: "/business",
								desc: "SME, enterprise, medical and government support models shaped around your operation.",
							},
							{
								title: "Network services",
								href: "/managed-services/unifi-networking",
								desc: "Design, installation and management of business WiFi and network infrastructure.",
							},
						].map((s) => (
							<Link
								key={s.href}
								href={s.href}
								className="group block rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0A1A18] p-6 hover:border-[#0FEA7A]/50 transition-all"
							>
								<h3 className="text-lg font-bold text-[#E8F4F1] mb-2 group-hover:text-[#0FEA7A] transition-colors">
									{s.title}
								</h3>
								<p className="text-[#7A9E98] text-sm leading-relaxed">
									{s.desc}
								</p>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* FAQ - visible accordion only; no FAQPage JSON-LD on this page by design */}
			<section className="py-16 bg-[#0A1A18]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
						Technology sourcing questions
					</h2>
					<FAQAccordion items={faqs} />
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 bg-[#0F2522]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
						Tell us what your business needs
					</h2>
					<p className="text-[#7A9E98] mb-8 max-w-2xl mx-auto">
						Send us your requirement, a device list, a new office, a replacement
						cycle, and we will come back with a written specification and
						quotation.
					</p>
					<a
						href={buildWhatsAppUrl("PORTFOLIO-CTA", "technology-portfolio")}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
					>
						<Phone className="w-5 h-5" /> Start a requirements assessment
					</a>
				</div>
			</section>
		</>
	);
}

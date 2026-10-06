import {
	Activity,
	ArrowRight,
	BookOpen,
	Building2,
	ClipboardList,
	FileText,
	KeyRound,
	Phone,
	Recycle,
	Scale,
	Server,
	Settings,
	ShieldCheck,
	Smartphone,
	Stethoscope,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQAccordion from "@/components/ui/FAQ";
import { buildWhatsAppUrl } from "@/lib/constants";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
	title:
		"IT Procurement Service Johannesburg | Business Technology Sourcing | ZA Support",
	description:
		"Managed IT procurement for Johannesburg businesses: requirements discovery, specification, quotation, deployment, asset registration and lifecycle management. Call 064 529 5863.",
	alternates: { canonical: "https://zasupport.com/procurement" },
	keywords: [
		"IT procurement Johannesburg",
		"business IT procurement service",
		"technology sourcing Gauteng",
		"IT equipment quotation Johannesburg",
		"device lifecycle management Johannesburg",
		"IT asset management Johannesburg",
	],
};

const steps = [
	{
		icon: ClipboardList,
		title: "Requirements discovery and specification",
		desc: "We start with how your team works, not with a product list. The output is a written technical specification you can hold us to.",
	},
	{
		icon: Scale,
		title: "Product comparison and compatibility validation",
		desc: "Options are compared against your existing environment, management tooling and security baseline, so nothing arrives that cannot be managed.",
	},
	{
		icon: FileText,
		title: "Quotation and acquisition",
		desc: "A written quotation covers equipment, configuration and deployment. Availability, price and delivery timing are confirmed at this step, and you approve before we order.",
	},
	{
		icon: KeyRound,
		title: "Licensing and subscription coordination",
		desc: "Software, cloud and security subscriptions are registered to your business, documented, and set to renew deliberately rather than by surprise.",
	},
	{
		icon: Settings,
		title: "Configuration, security hardening and deployment",
		desc: "Devices are configured, hardened and tested before handover. Staff receive equipment that is ready for work on day one.",
	},
	{
		icon: BookOpen,
		title: "Asset registration and documentation",
		desc: "Every item lands on your asset register with serials, assignments and warranty terms, the foundation for insurance, POPIA and planning.",
	},
	{
		icon: Smartphone,
		title: "MDM, endpoint and identity enrolment",
		desc: "New equipment is enrolled into device management and identity from the start, so policy, updates and security apply automatically.",
	},
	{
		icon: ShieldCheck,
		title: "Warranty and third-party coordination",
		desc: "When something fails, we drive the warranty or supplier process on your behalf and keep your team working in the meantime.",
	},
	{
		icon: Activity,
		title: "Monitoring, support and maintenance",
		desc: "Deployed equipment joins your managed service, monitored, patched and supported by the team that specified it.",
	},
	{
		icon: Recycle,
		title: "Refresh planning, trade-in and end-of-life",
		desc: "We plan replacement cycles before failures force them, coordinate trade-ins, and retire devices with data handled correctly.",
	},
];

const scenarios = [
	{
		icon: Building2,
		title: "New office rollout",
		desc: "Devices, network, print, power and security for a new site, specified and deployed as one coordinated project.",
	},
	{
		icon: Recycle,
		title: "Device refresh cycle",
		desc: "Ageing fleet replaced in planned waves, with data migration, enrolment and asset-register updates handled for every seat.",
	},
	{
		icon: Users,
		title: "New employee onboarding",
		desc: "A standard, pre-approved equipment profile per role, ordered, configured and delivered ready for the start date.",
	},
	{
		icon: Server,
		title: "Infrastructure replacement",
		desc: "Servers, storage, networking or power replaced against a tested migration plan rather than a weekend scramble.",
	},
	{
		icon: Stethoscope,
		title: "Multi-site standardisation",
		desc: "Practices and branches brought onto one documented standard for devices, networking and security.",
	},
	{
		icon: Activity,
		title: "Managed lifecycle programme",
		desc: "Procurement, support and refresh run as a continuous programme under your service agreement, with reporting.",
	},
];

const faqs = [
	{
		question:
			"Why use a procurement service instead of buying directly online?",
		answer:
			"Because the purchase is the smallest part of the job. Specification, compatibility, configuration, enrolment, asset registration and support determine whether equipment actually serves the business. We take responsibility for that whole chain, and the equipment arrives managed, not merely delivered.",
	},
	{
		question: "Which brands can ZA Support source?",
		answer:
			"Our technology portfolio page lists the current verified brands available through our supply network, across devices, networking, security, storage, print and power. If you need something not listed, we source against your specific requirement.",
	},
	{
		question: "How is procurement priced?",
		answer:
			"Every engagement is quoted in writing before any order is placed. Availability, configuration, price and delivery timing are confirmed during quotation, and larger programmes are typically structured within a managed service agreement.",
	},
	{
		question: "Can you work with our existing suppliers or purchasing rules?",
		answer:
			"Yes. Many clients have procurement policies, preferred payment terms or existing vendor relationships. We fit our process around those rules, and we document the technical specification either way so the business gets the right equipment.",
	},
	{
		question: "Do you support the equipment after deployment?",
		answer:
			"Yes, that is the point of the model. Equipment we procure joins your managed service: monitored, patched, supported and eventually refresh-planned by the same team. Repairs run through our Hyde Park workshop where that is the economical route, including component-level logic board repair.",
	},
	{
		question: "How long does a typical rollout take?",
		answer:
			"It depends on scope, stock position and the complexity of your environment, so we commit to dates at quotation rather than in marketing copy. What we guarantee is a written plan with dates you can schedule the business around.",
	},
];

export default function ProcurementPage() {
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Home", url: "https://zasupport.com" },
		{ name: "Business", url: "https://zasupport.com/business" },
		{ name: "Procurement", url: "https://zasupport.com/procurement" },
	]);
	const serviceSchema = buildServiceSchema({
		name: "Business IT Procurement and Lifecycle Management",
		description:
			"Managed technology procurement for Johannesburg businesses: requirements discovery, specification, quotation, acquisition, deployment, asset registration, support and refresh planning.",
	});

	return (
		<>
			<SchemaOrg schema={serviceSchema} />
			<SchemaOrg schema={breadcrumbSchema} />

			{/* Hero */}
			<section className="hero-gradient grid-overlay pt-32 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-6">
						<Breadcrumb
							items={[
								{ label: "Business", href: "/business" },
								{ label: "Procurement" },
							]}
						/>
					</div>
					<div className="max-w-4xl">
						<p className="text-[#0FEA7A] text-sm font-semibold uppercase tracking-widest mb-3">
							IT Procurement Service · Johannesburg &amp; Gauteng
						</p>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
							Technology procurement,
							<br />
							<span className="text-[#0FEA7A]">owned end to end</span>
						</h1>
						<p className="text-xl text-[#7A9E98] leading-relaxed max-w-3xl mb-8">
							ZA Support runs IT purchasing as a service: we establish what the
							business actually needs, source it through our technology supply
							network, deploy it configured and secured, and then support it for
							its whole working life.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href={buildWhatsAppUrl("PROCUREMENT-HERO", "procurement")}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
							>
								<Phone className="w-5 h-5" /> Start a requirements assessment
							</a>
							<Link
								href="/technology-portfolio"
								className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
							>
								<ArrowRight className="w-5 h-5" /> View our technology portfolio
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* The ten steps */}
			<section className="py-16 bg-[#0A1A18]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
						How the service works
					</h2>
					<p className="text-[#7A9E98] mb-10 max-w-3xl">
						Ten stages, one accountable partner. You can enter at any stage, but
						the value compounds when the same team carries a purchase from
						specification to retirement, with{" "}
						<Link href="/logic-board-repair" className="text-[#0FEA7A] hover:underline">
							component-level repair
						</Link>{" "}
						extending device life in between.
					</p>
					<div className="grid sm:grid-cols-2 gap-6">
						{steps.map((s, i) => (
							<div
								key={s.title}
								className="flex gap-4 rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0F2522] p-6"
							>
								<div className="flex-shrink-0">
									<s.icon className="w-8 h-8 text-[#0FEA7A]" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-[#E8F4F1] mb-1">
										{i + 1}. {s.title}
									</h3>
									<p className="text-[#7A9E98] text-sm leading-relaxed">
										{s.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Scenarios */}
			<section className="py-16 bg-[#0F2522]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
						Built for real business situations
					</h2>
					<p className="text-[#7A9E98] mb-10 max-w-3xl">
						These are the engagements we run most often for Johannesburg
						businesses.
					</p>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{scenarios.map((s) => (
							<div
								key={s.title}
								className="rounded-2xl border border-[rgba(15,234,122,0.18)] bg-[#0A1A18] p-6"
							>
								<s.icon className="w-8 h-8 text-[#0FEA7A] mb-4" />
								<h3 className="text-lg font-bold text-[#E8F4F1] mb-2">
									{s.title}
								</h3>
								<p className="text-[#7A9E98] text-sm leading-relaxed">
									{s.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ - visible accordion only; no FAQPage JSON-LD on this page by design */}
			<section className="py-16 bg-[#0A1A18]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-8">
						Procurement questions
					</h2>
					<FAQAccordion items={faqs} />
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 bg-[#0F2522]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-extrabold text-[#E8F4F1] mb-4">
						Put your next purchase on a professional footing
					</h2>
					<p className="text-[#7A9E98] mb-8 max-w-2xl mx-auto">
						Describe the requirement, we will return a written specification and
						quotation, and the equipment will arrive managed, registered and
						ready.
					</p>
					<a
						href={buildWhatsAppUrl("PROCUREMENT-CTA", "procurement")}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all"
					>
						<Phone className="w-5 h-5" /> Request a quotation
					</a>
				</div>
			</section>
		</>
	);
}

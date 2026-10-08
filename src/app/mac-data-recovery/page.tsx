import {
	AlertTriangle,
	ArrowRight,
	CheckCircle,
	ClipboardCheck,
	Database,
	FileSearch,
	Fingerprint,
	HardDrive,
	Lock,
	Mail,
	MessageCircle,
	PackageCheck,
	Phone,
	Shield,
	Trash2,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import PricingNote from "@/components/PricingNote";
import SchemaOrg from "@/components/seo/SchemaOrg";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQAccordion from "@/components/ui/FAQ";
import { buildWhatsAppUrl, CONTACT } from "@/lib/constants";
import { buildFaqSchema, LOCAL_BUSINESS_PROVIDER } from "@/lib/schema";

export const metadata: Metadata = {
	title: {
		absolute: "Mac Data Recovery Johannesburg 2026 | From R2,999 | ZA Support",
	},
	description:
		"Mac data recovery in Johannesburg from R2,999, confirmed after assessment. 92% data-recovery rate; recovery cannot be guaranteed and every device is assessed individually.",
	alternates: { canonical: "https://zasupport.com/mac-data-recovery" },
	robots: { index: true, follow: true },
	openGraph: {
		title: "Mac Data Recovery Johannesburg",
		description:
			"MacBook, iMac and Mac mini data recovery in Johannesburg. Assessment first, written quote before work, POPIA-aligned data handling.",
		url: "https://zasupport.com/mac-data-recovery",
		type: "website",
	},
};

// Owner-approved public wording (owner confirmation, 2026-10-08). Exact approved
// meaning preserved; do not paraphrase, extend or add controls not stated here.
const handlingControls = [
	{
		icon: <Users className="w-5 h-5" />,
		title: "Who can access your data",
		paragraphs: [
			"Access to customer data is limited to assigned technicians and specifically authorised personnel who require access to perform or oversee the agreed service.",
			"Access to customer data is restricted through technician assignment, individual user access, least-privilege permissions and management authorisation where required.",
		],
	},
	{
		icon: <Shield className="w-5 h-5" />,
		title: "Controlled recovery environment",
		paragraphs: [
			"Data-recovery work is performed in a controlled technical environment separated from ordinary public-access and administrative systems. Access is limited to assigned or specifically authorised personnel.",
		],
	},
	{
		icon: <HardDrive className="w-5 h-5" />,
		title: "Temporary storage",
		paragraphs: [
			"Recovered data is stored temporarily only on designated recovery media or controlled technical storage selected for the engagement. Temporary copies are associated with the relevant job and access is restricted to assigned or specifically authorised personnel. Storage location and media may vary according to data volume, device condition, recovery method and customer instructions. Recovered data is not intentionally placed on ordinary administrative or publicly accessible storage.",
		],
	},
	{
		icon: <Lock className="w-5 h-5" />,
		title: "Encryption",
		paragraphs: [
			"Encryption controls are selected according to the engagement's security requirements, data sensitivity, technical feasibility, storage media and transfer method. Recovered data and temporary copies are encrypted at rest or in transit where required and supported. Where the engagement requires universal encryption, all temporary recovered data is encrypted at rest and every electronic transfer is encrypted in transit. The applicable encryption requirement is agreed or documented for the engagement.",
		],
	},
	{
		icon: <ClipboardCheck className="w-5 h-5" />,
		title: "Retention",
		paragraphs: [
			"Temporary recovery data is retained only until successful handover and completion of an agreed verification period, after which it is scheduled for secure deletion unless a documented exception applies. Retention may be extended where requested by the customer or required for a lawful, contractual, security or dispute-resolution purpose.",
		],
	},
	{
		icon: <Trash2 className="w-5 h-5" />,
		title: "Secure deletion",
		paragraphs: [
			"Following the applicable retention and verification period, temporary working copies are securely deleted using a method appropriate to the storage medium, data sensitivity, engagement requirements and technical feasibility. Methods may include the platform's supported secure-deletion process, cryptographic erasure, media sanitisation or physical destruction where ordinary deletion is insufficient. Any documented retention exception remains effective until the exception ends.",
		],
	},
	{
		icon: <PackageCheck className="w-5 h-5" />,
		title: "Returning your data",
		paragraphs: [
			"Recovered data is returned only to the verified customer or a representative authorised by the customer, using a return method agreed for the engagement. The recipient, authorisation, return method and completion of the handover are recorded. Where credentials or access codes are required, they may be communicated separately from the returned data.",
		],
	},
	{
		icon: <Fingerprint className="w-5 h-5" />,
		title: "Device tracking and forensic engagements",
		paragraphs: [
			"Devices and recovery media are tracked from intake through authorised handling and final return. Formal evidential chain-of-custody procedures are available for qualifying forensic engagements.",
		],
	},
	{
		icon: <Database className="w-5 h-5" />,
		title: "Third-party processing",
		paragraphs: [
			"Third-party processing is used only where necessary and is subject to appropriate authorisation, confidentiality and security controls.",
		],
	},
	{
		icon: <FileSearch className="w-5 h-5" />,
		title: "Handling exceptions",
		paragraphs: [
			"Retention or handling periods may be extended where requested by the customer or required for a lawful, contractual, security or dispute-resolution purpose. Exceptions are documented, access-restricted and reviewed until the information can be securely returned or deleted.",
		],
	},
];

const faqs = [
	{
		question: "How much does Mac data recovery cost in Johannesburg?",
		answer:
			"Data recovery is quoted case by case following assessment. The minimum data-recovery charge is R2,999 and may increase according to the device condition, fault, recovery method, parts, labour and storage requirements. The assessment is from R599, separate and non-refundable.",
	},
	{
		question: "Is data recovery guaranteed?",
		answer:
			"No. Recovery cannot be guaranteed. Data recoverability depends on the device condition, storage condition, encryption and security configuration, availability of required credentials and the extent of physical or electronic damage. ZA Support assesses each device individually before confirming the available recovery options.",
	},
	{
		question: "Can data be recovered after logic-board failure?",
		answer:
			"Logic-board failure does not necessarily mean that the stored data is unrecoverable, but recovery cannot be guaranteed. On Apple silicon and T2 Macs, internal storage uses hardware-bound encryption, so recovery may require the original security hardware and valid credentials. Every device is assessed individually.",
	},
	{
		question: "Who can access my data during recovery?",
		answer:
			"Access to customer data is limited to assigned technicians and specifically authorised personnel who require access to perform or oversee the agreed service. Access is restricted through technician assignment, individual user access, least-privilege permissions and management authorisation where required.",
	},
	{
		question: "What happens to temporary copies after my data is returned?",
		answer:
			"Temporary recovery data is retained only until successful handover and completion of an agreed verification period, after which it is scheduled for secure deletion unless a documented exception applies. Retention may be extended where requested by the customer or required for a lawful, contractual, security or dispute-resolution purpose.",
	},
	{
		question: "How is my data returned to me?",
		answer:
			"Recovered data is returned only to the verified customer or a representative authorised by the customer, using a return method agreed for the engagement. The recipient, authorisation, return method and completion of the handover are recorded. Where credentials or access codes are required, they may be communicated separately from the returned data.",
	},
	{
		question: "Does the warranty cover recovered data?",
		answer:
			"Any applicable warranty covers only the qualifying repair work or replacement parts specified for the engagement. It does not guarantee that data can be recovered or that recovered files will be complete, compatible or usable. Warranty coverage and exclusions are confirmed for the specific engagement.",
	},
	{
		question: "Who do I contact about privacy or POPIA?",
		answer:
			"Privacy and POPIA enquiries may be directed to ZA Support's Information Officer at admin@zasupport.com.",
	},
];

const serviceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	name: "Mac Data Recovery Johannesburg",
	provider: LOCAL_BUSINESS_PROVIDER,
	areaServed: [
		{ "@type": "City", name: "Johannesburg" },
		{ "@type": "Suburb", name: "Sandton" },
		{ "@type": "Suburb", name: "Rosebank" },
		{ "@type": "Suburb", name: "Fourways" },
		{ "@type": "Suburb", name: "Bryanston" },
		{ "@type": "Suburb", name: "Hyde Park" },
	],
	description:
		"Mac data recovery in Johannesburg for MacBook, iMac and Mac mini. Assessment first, written quote before work, POPIA-aligned data handling. Recovery cannot be guaranteed; every device is assessed individually.",
};

const breadcrumbSchema = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: "https://zasupport.com",
		},
		{
			"@type": "ListItem",
			position: 2,
			name: "Mac Data Recovery",
			item: "https://zasupport.com/mac-data-recovery",
		},
	],
};

const faqSchema = buildFaqSchema(faqs);

export default function MacDataRecoveryPage() {
	return (
		<>
			<SchemaOrg schema={faqSchema} />
			<SchemaOrg schema={breadcrumbSchema} />
			<SchemaOrg schema={serviceSchema} />

			{/* HERO */}
			<section className="hero-gradient grid-overlay pt-32 pb-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<Breadcrumb items={[{ label: "Mac Data Recovery" }]} />
					<div className="mt-8 max-w-4xl">
						<div className="inline-flex items-center gap-2 bg-[rgba(15,234,122,0.1)] border border-[rgba(15,234,122,0.25)] text-[#0FEA7A] text-sm font-semibold px-4 py-2 rounded-full mb-6">
							<CheckCircle className="w-4 h-4" /> POPIA-Aligned Data Handling
							&middot; Hyde Park JHB
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8F4F1] leading-tight mb-6">
							Mac Data Recovery
							<br />
							<span className="text-[#0FEA7A]">Johannesburg</span>
						</h1>
						<p className="text-xl text-[#7A9E98] mb-8 max-w-2xl">
							MacBook, iMac and Mac mini. Deleted files, failed storage, liquid
							damage and Macs that will not power on. Assessment first, written
							quote before any recovery work begins.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href={buildWhatsAppUrl("MDR-HERO", "general")}
								className="inline-flex items-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl font-bold hover:bg-[#0FEA7A]/90 transition-all text-lg"
								target="_blank"
								rel="noopener noreferrer"
							>
								<MessageCircle className="w-5 h-5" /> WhatsApp Us
							</a>
							<a
								href={`tel:${CONTACT.phoneTel}`}
								className="inline-flex items-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
							>
								<Phone className="w-5 h-5" /> {CONTACT.phone}
							</a>
							<Link
								href="/book"
								className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#E8F4F1] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(255,255,255,0.05)] transition-all"
							>
								Book an Assessment <ArrowRight className="w-5 h-5" />
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* RECOVERY RATE (owner-confirmed business metric; qualification kept adjacent) */}
			<section className="bg-[rgba(15,234,122,0.06)] border-y border-[rgba(15,234,122,0.15)] py-12">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p className="text-4xl sm:text-5xl font-extrabold text-[#0FEA7A] mb-4">
						92% data-recovery rate
					</p>
					<p className="text-[#7A9E98] text-base leading-relaxed max-w-3xl mx-auto">
						Recovery outcomes depend on the condition of the device and storage
						components, encryption and security configuration, available
						credentials and the extent of physical or electronic damage.
						Recovery cannot be guaranteed, and every device is assessed
						individually.
					</p>
				</div>
			</section>

			{/* PRICING */}
			<section className="py-10 sm:py-20 bg-[#0A1A18]">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-10">
						<h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
							Data Recovery <span className="text-[#0FEA7A]">Pricing</span>
						</h2>
						<p className="text-2xl font-bold text-[#E8F4F1] mb-3">
							Data recovery from R2,999. Final pricing is confirmed after
							assessment and depends on the device condition, fault, recovery
							method, parts, labour and storage requirements.
						</p>
					</div>
					<div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 space-y-4">
						<p className="text-[#7A9E98] text-sm leading-relaxed">
							Data recovery is quoted case by case following assessment. The
							minimum data-recovery charge is R2,999 and may increase according
							to the device condition, fault, recovery method, parts, labour and
							storage requirements.
						</p>
						<p className="text-[#7A9E98] text-sm leading-relaxed">
							The assessment is from R599, charged separately and
							non-refundable. You receive a written quote before any recovery
							work begins.
						</p>
						<PricingNote variant="inline" />
					</div>
				</div>
			</section>

			{/* RECOVERABILITY */}
			<section className="py-10 sm:py-20 bg-[#111C1A]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-10">
						<h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
							What Determines{" "}
							<span className="text-[#0FEA7A]">Recoverability</span>
						</h2>
					</div>
					<div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 mb-6">
						<p className="text-[#E8F4F1] text-base leading-relaxed">
							Data recoverability depends on the device condition, storage
							condition, encryption and security configuration, availability of
							required credentials and the extent of physical or electronic
							damage. Logic-board failure does not necessarily mean that the
							stored data is unrecoverable, but recovery cannot be guaranteed.
							ZA Support assesses each device individually before confirming the
							available recovery options.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
						{[
							{
								icon: <Lock className="w-5 h-5" />,
								title: "Apple silicon, T2 and FileVault",
								desc: "Internal storage on Apple silicon and T2 Macs uses hardware-bound encryption. Recovery may require the original security hardware and valid credentials; erased keys or severe damage can prevent it.",
							},
							{
								icon: <AlertTriangle className="w-5 h-5" />,
								title: "Stop before erasing",
								desc: "Do not erase, reinstall over the affected storage, restore firmware or authorise a board replacement before discussing the data. Later writes can remove what remains.",
							},
							{
								icon: <HardDrive className="w-5 h-5" />,
								title: "Dead or liquid-damaged Macs",
								desc: "A Mac that will not power on may need board-level work before any file extraction can begin. For liquid exposure, disconnect power and stop charging.",
							},
							{
								icon: <FileSearch className="w-5 h-5" />,
								title: "Assessment first",
								desc: "The assessment identifies the fault, the viable recovery options and their limits for your specific device before you approve anything.",
							},
						].map((item) => (
							<div
								key={item.title}
								className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.2)] transition-colors"
							>
								<div className="text-[#0FEA7A] mb-3">{item.icon}</div>
								<h3 className="text-[#E8F4F1] font-bold text-sm mb-2">
									{item.title}
								</h3>
								<p className="text-[#7A9E98] text-xs leading-relaxed">
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* DATA HANDLING */}
			<section className="py-10 sm:py-20 bg-[#0A1A18]">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-4">
							How Your Data Is <span className="text-[#0FEA7A]">Handled</span>
						</h2>
						<p className="text-[#7A9E98] max-w-2xl mx-auto">
							The controls below describe how customer data is handled during
							recovery engagements at our Hyde Park workshop.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{handlingControls.map((item) => (
							<div
								key={item.title}
								className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 hover:border-[rgba(15,234,122,0.15)] transition-colors"
							>
								<div className="text-[#0FEA7A] mb-3">{item.icon}</div>
								<h3 className="text-[#E8F4F1] font-bold text-sm mb-2">
									{item.title}
								</h3>
								{item.paragraphs.map((p) => (
									<p
										key={p.slice(0, 40)}
										className="text-[#7A9E98] text-xs leading-relaxed mt-2"
									>
										{p}
									</p>
								))}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CUSTOMER AUTHORISATION + WARRANTY */}
			<section className="py-10 sm:py-20 bg-[#111C1A]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
					<div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
						<h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-3">
							Customer Authorisation{" "}
							<span className="text-[#0FEA7A]">at Intake</span>
						</h2>
						<p className="text-[#7A9E98] text-sm leading-relaxed mb-4">
							Recovery work proceeds only on your authorisation. At intake, you
							as the customer confirm the following:
						</p>
						<blockquote className="border-l-2 border-[rgba(15,234,122,0.4)] pl-4 text-[#E8F4F1] text-sm leading-relaxed italic">
							I confirm that I own the device and data, or have lawful authority
							from the owner to authorise this service. I authorise ZA Support
							to access and process the device and its data only to the extent
							reasonably necessary to perform the agreed recovery work. I
							confirm that the information supplied is accurate and that the
							nominated recipient is authorised to receive the recovered data.
						</blockquote>
					</div>
					<div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
						<h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-3">
							Warranty <span className="text-[#0FEA7A]">Scope</span>
						</h2>
						<p className="text-[#7A9E98] text-sm leading-relaxed">
							Any applicable warranty covers only the qualifying repair work or
							replacement parts specified for the engagement. It does not
							guarantee that data can be recovered or that recovered files will
							be complete, compatible or usable. Warranty coverage and
							exclusions are confirmed for the specific engagement.
						</p>
					</div>
					<div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
						<h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-3">
							Privacy and <span className="text-[#0FEA7A]">POPIA</span>
						</h2>
						<p className="text-[#7A9E98] text-sm leading-relaxed mb-3">
							Privacy and POPIA enquiries may be directed to ZA Support&apos;s
							Information Officer at{" "}
							<a
								href="mailto:admin@zasupport.com"
								className="text-[#0FEA7A] hover:underline"
							>
								admin@zasupport.com
							</a>
							.
						</p>
						<p className="text-[#7A9E98] text-xs leading-relaxed flex items-start gap-2">
							<Mail className="w-4 h-4 text-[#0FEA7A] flex-shrink-0 mt-0.5" />
							<span>
								Information Officer, ZA Support Operations, 1 Hyde Lane, Hyde
								Park, Johannesburg, 2196.
							</span>
						</p>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-10 sm:py-20 bg-[#0A1A18]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<FAQAccordion
						items={faqs}
						title="Mac Data Recovery, Frequently Asked Questions"
					/>
				</div>
			</section>

			{/* SUBURBS */}
			<section className="py-8 sm:py-16 bg-[#0A1A18] border-t border-[rgba(255,255,255,0.05)]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-extrabold text-[#E8F4F1] mb-6 text-center">
						Mac Data Recovery Near You,{" "}
						<span className="text-[#0FEA7A]">Johannesburg</span>
					</h2>
					<div className="flex flex-wrap justify-center gap-3">
						{[
							"Sandton",
							"Rosebank",
							"Fourways",
							"Bryanston",
							"Hyde Park",
							"Randburg",
							"Midrand",
							"Melrose",
							"Parkhurst",
							"Illovo",
							"Rivonia",
							"Morningside",
							"Paulshof",
							"Sunninghill",
							"Woodmead",
						].map((suburb) => (
							<span
								key={suburb}
								className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] text-sm px-4 py-2 rounded-full hover:border-[rgba(15,234,122,0.2)] hover:text-[#E8F4F1] transition-colors"
							>
								{suburb}
							</span>
						))}
					</div>
					<p className="text-[#7A9E98] text-sm text-center mt-6">
						Based at{" "}
						<strong className="text-[#E8F4F1]">
							1 Hyde Lane, Hyde Park, Second Floor, Office E2004, Johannesburg
							2196
						</strong>
						. Walk-ins welcome, call first to confirm same-day capacity.
					</p>
				</div>
			</section>

			{/* RELATED SERVICES */}
			<section className="py-12 bg-[#071210]">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-xl font-bold text-[#E8F4F1] mb-6">
						Related Services
					</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
						{[
							{
								label: "MacBook Data Recovery",
								href: "/macbook-repair/data-recovery",
							},
							{
								label: "Dead MacBook Recovery Guide",
								href: "/guides/how-to-recover-data-from-dead-macbook",
							},
							{ label: "Logic Board Repair", href: "/logic-board-repair" },
							{ label: "Liquid Damage Repair", href: "/liquid-damage" },
							{
								label: "Digital Evidence Preservation",
								href: "/digital-evidence-preservation",
							},
							{ label: "MacBook Repair", href: "/macbook-repair" },
						].map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#7A9E98] hover:text-[#0FEA7A] hover:border-[#0FEA7A] text-sm transition-colors"
							>
								{link.label} →
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA BOTTOM */}
			<section className="py-10 sm:py-20 bg-[#111C1A]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="bg-[rgba(39,80,77,0.3)] border border-[rgba(15,234,122,0.2)] rounded-3xl p-10">
						<h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-3">
							Lost Data on Your Mac?
						</h2>
						<p className="text-[#7A9E98] mb-2 text-lg">
							Stop using the machine. Assessment first, recovery options and
							charges confirmed before work.
						</p>
						<p className="text-[#7A9E98] text-sm mb-8">
							Hyde Park, Johannesburg &middot; POPIA-aligned handling &middot;
							MacBook, iMac and Mac mini
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href={buildWhatsAppUrl("MDR-CTA", "general")}
								className="inline-flex items-center justify-center gap-2 bg-[#0FEA7A] text-[#0A1A18] px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#0FEA7A]/90 transition-all"
								target="_blank"
								rel="noopener noreferrer"
							>
								<MessageCircle className="w-5 h-5" /> WhatsApp Us Now
							</a>
							<a
								href={`tel:${CONTACT.phoneTel}`}
								className="inline-flex items-center justify-center gap-2 border border-[rgba(15,234,122,0.35)] text-[#0FEA7A] px-8 py-4 rounded-xl font-semibold hover:bg-[rgba(15,234,122,0.08)] transition-all"
							>
								<Phone className="w-5 h-5" /> {CONTACT.phone}
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

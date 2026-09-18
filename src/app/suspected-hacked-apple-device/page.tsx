import {
	AlertTriangle,
	CheckCircle,
	KeyRound,
	MessageCircle,
	Phone,
	ShieldAlert,
	Wifi,
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
	title:
		"Suspected Hacked Mac or iPhone? Apple Device Compromise Assessment | Johannesburg | ZA Support",
	description:
		"Worried your Mac, iPhone or Apple device is hacked? Calm, private assessment in Johannesburg. Suspicious pop-ups, unexpected remote access, phishing or strange logins. We help you check safely. Symptoms alone are not proof of compromise. Hyde Park.",
	alternates: {
		canonical: "https://zasupport.com/suspected-hacked-apple-device",
	},
	keywords: [
		"is my mac hacked",
		"iphone hacked johannesburg",
		"suspected hacked apple device",
		"mac compromise assessment johannesburg",
		"suspicious mac pop ups",
		"unexpected remote access mac",
		"apple id phishing help johannesburg",
	],
};

const immediateActions = [
	"Disconnect the device from Wi-Fi and any network if you believe access is happening right now, so the situation stops while you get help.",
	"Do not delete apps, messages, emails or logs yet. If anything is wrong, those records help us understand what happened.",
	"Change important passwords from a different, trusted device (not the one you are worried about), starting with your email and Apple Account.",
	"Turn on two-factor authentication on your Apple Account and email if it is not already on.",
	"Write down what you noticed and when: the pop-up, the message, the login alert, the unexpected behaviour, with dates and times.",
];

const whatWeAssess = [
	{
		icon: ShieldAlert,
		title: "Suspicious pop-ups and warnings",
		body: "Fake virus warnings, pressure to call a number, or prompts to install profiles. We check whether it is adware, a scam page, or something that needs deeper attention.",
	},
	{
		icon: Wifi,
		title: "Unexpected remote access",
		body: "Screen-sharing you did not start, a cursor moving on its own, or remote-support software you do not recognise. We check what is installed and what is enabled.",
	},
	{
		icon: KeyRound,
		title: "Apple Account and login concerns",
		body: "Sign-in alerts from places you have not been, phishing emails or texts, or a password that no longer works. We help you check account activity safely.",
	},
	{
		icon: AlertTriangle,
		title: "Unusual device behaviour",
		body: "Battery draining fast, the device running hot, settings changing, or data used you cannot explain. We look for a technical cause first.",
	},
];

const faqs = [
	{
		question: "Does one of these symptoms mean I have definitely been hacked?",
		answer:
			"No. Symptoms alone are not proof of compromise. A pop-up, a hot device, a fast-draining battery or a strange email can each have an ordinary technical cause, adware, a scam web page, a failing battery, or a misconfigured setting. The purpose of the assessment is to check calmly and tell you what the evidence actually shows, rather than assume the worst.",
	},
	{
		question: "What does the assessment involve?",
		answer:
			"We go through what you noticed, look at the device with you, check for software and profiles that should not be there, review account and login prompts safely, and look for a technical explanation. You stay in control of your device and your accounts throughout.",
	},
	{
		question:
			"Will you recover a hacked account, remove Activation Lock, or bypass a password?",
		answer:
			"No. ZA Support does not promise account recovery, password, two-factor or Activation Lock bypass, guaranteed attribution of who did something, legal conclusions, forensic-admissibility claims, or recovery of lost data, funds or accounts. Account recovery is handled by Apple or your provider directly, and we will point you to the correct official route.",
	},
	{
		question: "How do I contact you privately?",
		answer: `Message us on WhatsApp on ${CONTACT.phone} or call the same number. Describe what you noticed in general terms. Please do not send passwords, two-factor codes, banking details or ID documents in a message. We will guide you on what is safe to share and when.`,
	},
	{
		question: "What should I bring or have ready?",
		answer:
			"The device itself, your notes of what happened and when, and access to a second trusted device for changing passwords if needed. If you received a suspicious email or message, keep it rather than deleting it.",
	},
	{
		question: "Is this different from virus and malware removal?",
		answer:
			"Yes. If the concern is adware, browser hijackers or slow performance, our Mac virus and malware removal service covers that. This assessment is for the broader worry that someone may have accessed your device or accounts, where the first job is to check safely what is actually happening.",
	},
];

const breadcrumbSchema = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: "https://zasupport.com/",
		},
		{
			"@type": "ListItem",
			position: 2,
			name: "Suspected Hacked Apple Device Assessment",
			item: "https://zasupport.com/suspected-hacked-apple-device",
		},
	],
};

const serviceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	name: "Suspected Hacked Apple Device Assessment",
	serviceType: "Apple device security assessment",
	areaServed: "Johannesburg, Gauteng",
	provider: LOCAL_BUSINESS_PROVIDER,
	description:
		"Calm, private assessment for a Mac, iPhone or Apple device you suspect may be compromised. We help you check safely what is actually happening. Symptoms alone are not proof of compromise.",
};

const faqSchema = buildFaqSchema(faqs);

export default function SuspectedHackedAppleDevicePage() {
	const wa = buildWhatsAppUrl("SEC-ASSESS", "suspected-hacked-apple-device");
	return (
		<>
			<SchemaOrg schema={faqSchema} />
			<SchemaOrg schema={breadcrumbSchema} />
			<SchemaOrg schema={serviceSchema} />
			<main className="max-w-4xl mx-auto px-4 py-10">
				<Breadcrumb
					items={[
						{ label: "Apple Support", href: "/apple-support" },
						{ label: "Suspected Hacked Apple Device" },
					]}
				/>

				<section className="mt-6">
					<h1 className="text-3xl font-bold">
						Suspected Hacked Mac or iPhone? A Calm, Private Assessment
					</h1>
					<p className="mt-4 text-lg text-gray-700">
						If you think your Mac, iPhone or Apple device may have been hacked,
						take a breath. Most worrying signs have an ordinary technical cause,
						and the first job is to check safely what is actually happening
						rather than assume the worst. We help Johannesburg customers do
						exactly that, privately and without judgement, from our Hyde Park
						workshop.
					</p>
					<p className="mt-3 font-semibold text-gray-900">
						Symptoms alone are not proof of compromise.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<a
							href={wa}
							className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white font-semibold"
						>
							<MessageCircle className="w-5 h-5" /> Ask us privately on WhatsApp
						</a>
						<a
							href={`tel:${CONTACT.phoneTel}`}
							className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-semibold"
						>
							<Phone className="w-5 h-5" /> {CONTACT.phone}
						</a>
					</div>
				</section>

				<section className="mt-10">
					<h2 className="text-2xl font-semibold">
						First, a few safe steps you can take now
					</h2>
					<ul className="mt-4 space-y-3">
						{immediateActions.map((a) => (
							<li key={a} className="flex gap-3">
								<CheckCircle className="w-5 h-5 mt-1 text-green-600 shrink-0" />
								<span className="text-gray-700">{a}</span>
							</li>
						))}
					</ul>
					<p className="mt-4 text-gray-700">
						Keeping the evidence matters. If something is wrong, the messages,
						emails, logs and settings on the device help us understand what
						happened, so please avoid deleting them before we look together.
					</p>
				</section>

				<section className="mt-10">
					<h2 className="text-2xl font-semibold">
						What we check in the assessment
					</h2>
					<div className="mt-4 grid gap-5 sm:grid-cols-2">
						{whatWeAssess.map((w) => (
							<div key={w.title} className="rounded-lg border p-5">
								<w.icon className="w-6 h-6 text-emerald-700" />
								<h3 className="mt-2 font-semibold">{w.title}</h3>
								<p className="mt-1 text-gray-700">{w.body}</p>
							</div>
						))}
					</div>
				</section>

				<section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-6">
					<h2 className="text-2xl font-semibold">
						What this assessment is, and is not
					</h2>
					<p className="mt-3 text-gray-800">
						This is a practical technical check to help you understand what is
						happening and what to do next. It is honest about its limits. ZA
						Support does not promise, and this assessment does not provide:
					</p>
					<ul className="mt-3 space-y-2 text-gray-800">
						<li>
							• Recovery of a locked or hacked Apple Account, email or other
							account.
						</li>
						<li>
							• Password, two-factor, or Activation Lock bypass or removal.
						</li>
						<li>
							• A guarantee of who was responsible, or attribution of an
							attacker.
						</li>
						<li>
							• Legal advice or legal conclusions, or evidence prepared for
							admissibility in court.
						</li>
						<li>• Guaranteed recovery of lost data, money or accounts.</li>
					</ul>
					<p className="mt-3 text-gray-800">
						Where account recovery is needed, we will point you to the correct
						official Apple or provider route. Read more on our{" "}
						<Link href="/editorial-policy" className="underline">
							editorial and service policy
						</Link>
						.
					</p>
				</section>

				<section className="mt-10">
					<h2 className="text-2xl font-semibold">Related help</h2>
					<ul className="mt-4 space-y-2 text-emerald-800">
						<li>
							•{" "}
							<Link href="/macbook-repair/virus-removal" className="underline">
								Mac virus and malware removal
							</Link>{" "}
							if the concern is adware, pop-ups or a slow Mac.
						</li>
						<li>
							•{" "}
							<Link href="/macbook-repair" className="underline">
								MacBook repair
							</Link>{" "}
							and{" "}
							<Link href="/imac-repair" className="underline">
								iMac repair
							</Link>{" "}
							for hardware faults.
						</li>
						<li>
							•{" "}
							<Link href="/iphone-repair" className="underline">
								iPhone repair
							</Link>{" "}
							for device faults on your iPhone.
						</li>
						<li>
							•{" "}
							<Link href="/contact" className="underline">
								Contact us
							</Link>{" "}
							or{" "}
							<Link href="/book" className="underline">
								book an assessment
							</Link>
							.
						</li>
					</ul>
				</section>

				<PricingNote repair={false} />

				<section className="mt-10">
					<FAQAccordion
						items={faqs}
						title="Suspected Hacked Apple Device, Frequently Asked Questions"
					/>
				</section>

				<section className="mt-10 border-t pt-6 text-sm text-gray-600">
					<p>
						Reviewed by Courtney Bentley, CEO and Apple Certified Expert, ZA
						Support. Written from real assessments carried out in our Hyde Park,
						Johannesburg workshop. Guidance is general and does not replace
						advice specific to your situation.
					</p>
					<div className="mt-4 flex flex-wrap gap-3">
						<a
							href={wa}
							className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white font-semibold"
						>
							<MessageCircle className="w-5 h-5" /> Message us privately
						</a>
						<a
							href={`tel:${CONTACT.phoneTel}`}
							className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-semibold"
						>
							<Phone className="w-5 h-5" /> {CONTACT.phone}
						</a>
					</div>
				</section>
			</main>
		</>
	);
}

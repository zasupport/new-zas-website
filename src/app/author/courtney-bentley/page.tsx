import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Award, Shield, Wrench } from 'lucide-react';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { CONTACT, SITE } from '@/lib/constants';
import { redirect } from 'next/navigation';

// Redirect old URL to new author page
export default function CourtneyBentleyRedirect() {
  redirect('/author/david-bentley');
}

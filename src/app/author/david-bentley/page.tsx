import { redirect } from 'next/navigation';

// 301 redirect: old author slug → correct author page
export default function DavidBentleyRedirect() {
  redirect('/author/courtney-bentley');
}

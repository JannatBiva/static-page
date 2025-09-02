import Link from "next/link";

type Params = { params: { slug: string } };

export default function NewsArticle({ params }: Params) {
    return (
        <main className="container section">
            <Link href="/" className="text-brand-teal">← Back</Link>
            <h1 className="mt-6 text-4xl font-semibold">{params.slug.replace(/-/g, " ")}</h1>
            <p className="mt-4 text-brand-gray max-w-2xl">
                Demo Page
            </p>
        </main>
    );
}

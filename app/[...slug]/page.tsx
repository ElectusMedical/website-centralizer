
import { notFound }   from "next/navigation";
import Navigation    from "@/components/Navigation";
import Footer        from "@/components/Footer";
import GHLEmbed      from "@/components/GHLEmbed";
import { client }    from "@/lib/tina-client";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const filename = slug?.join("/") ?? "home";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = null;

  try {
    data = await (client as any).queries.page({
      relativePath: `${filename}.mdx`,
    });
  } catch {
    notFound();
  }

  const page = data?.data?.page;
  if (!page) notFound();

  return (
    <main>
      <Navigation />
      <section className="section-pad pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-xl text-gray-500 mb-12">{page.subtitle}</p>
          )}

          {/* GHL Embed if configured for this page */}
          {page.ghl?.embedCode && (
            <GHLEmbed
              embedCode={page.ghl.embedCode}
              type={(page.ghl.embedType as "form" | "calendar") ?? "form"}
            />
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}

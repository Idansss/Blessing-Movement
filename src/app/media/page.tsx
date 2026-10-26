import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { photos, type OutreachPhoto } from "@/data/photos";
import { prisma } from "@/lib/db";
export default async function MediaPage() {
  let additions: OutreachPhoto[] = [];
  try {
    const uploaded = await prisma.mediaItem.findMany({
      where: { type: "photo", publishedAt: { not: null } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    additions = uploaded.map((p) => ({
      id: p.id,
      src: p.url,
      title: p.title,
      alt: p.description ?? p.title,
      category: p.topic ?? "Community",
    }));
  } catch {
    /* The curated album remains available during a database outage. */
  }
  return (
    <>
      <section className="page-heading page-width">
        <p className="eyebrow">The movement, in pictures</p>
        <h1>
          Every picture.
          <br />
          <em>A little more love.</em>
        </h1>
        <p>
          Medical care, shared worship, community and everyday kindness. These
          are moments from our outreach family, captured along the way.
        </p>
      </section>
      <section className="page-width pb-24">
        <PhotoGallery
          items={[
            ...additions,
            ...photos.filter(
              (photo) => !additions.some((item) => item.title === photo.title),
            ),
          ]}
        />
      </section>
    </>
  );
}

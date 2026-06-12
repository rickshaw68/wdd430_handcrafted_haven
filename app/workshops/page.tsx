import Link from "next/link";

const workshops = [
    {
        title: "Beginner Crochet",
        level: "Beginner",
        duration: "2 hours",
        description:
            "Learn basic stitches and create a simple handmade project with guidance from a local artisan.",
    },
    {
        title: "Woodworking Basics",
        level: "Beginner",
        duration: "3 hours",
        description: 
            "Practice safe tool use while learning simple woodworking techniques for small home projects.",
    },
    {
        title: "Handmade Jewelry",
        level: "Beginner to Intermediate",
        duration: "2 hours",
        description:
            "Design and assemble your own jewelry using beads, wire, charms, and employing your own creative finishing techniques.",
    },
    {
        title: "Pastel Artwork",
        level: "Advanced",
        duration: "4 hours",
        description:
            "Build on previous art experience to delve into the world of Pastels.  Create an artpiece that you can hang in your home.",
    },
    {
        title: "Knitting",
        level: "Beginners",
        duration: "2 hours",
        description:
            "Learn the basics of knitting and start your own knitted scarf or blanket",
    },
];

export default function WorkshopsPage() {
    return (
        <main className="bg-stone-50 text-stone-900">
        <section className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 px-6 py-20 text-center text-white">
            <h1 className="text-4xl font-bold md:text-5xl">Craft Workshops</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg">
            Learn new skills in person from local artisans and connect with others who enjoy handmade creativity.
            </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-center text-2xl font-bold text-teal-700">Upcoming Workshops</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
            {workshops.map((workshop) => (
                <div key={workshop.title} className="rounded-xl bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-stone-900">{workshop.title}</h3>
                <p className="mt-3 text-sm font-semibold text-teal-700">
                    Skill Level: {workshop.level}
                </p>
                <p className="mt-1 text-sm font-semibold text-stone-600">
                    Duration: {workshop.duration}
                </p>
                <p className="mt-4 text-stone-700">{workshop.description}</p>
                </div>
            ))}
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">Learn New Skills</h3>
                <p className="mt-3 text-stone-700">
                Try hands-on techniques with help from experienced artisans.
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">Meet Local Creators</h3>
                <p className="mt-3 text-stone-700">
                Connect with artisans, hobbyists, and other members of the crafting community.
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">Create Something Unique</h3>
                <p className="mt-3 text-stone-700">
                Leave each workshop with a completed project or a skill you can keep practicing on.
                </p>
            </div>
            </div>

            <div className="mt-16 rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-teal-700">Registration Coming Soon</h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-700">
                Online workshop registration is not available yet, but keep checking back for upcoming workshops and registration information.
            </p>

            <Link
                href="/"
                className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
            >
                Return to Home Page
            </Link>
            </div>
        </section>
        </main>
    );
}
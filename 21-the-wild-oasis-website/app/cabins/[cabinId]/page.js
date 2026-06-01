import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = { title: `Cabin` };

// generating metadata dynamically (since we want cabin's id in the title)
// this function also have access to current params
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// making these dynamic pages static so they'll prerender as static pages on build (instead of being dynamic due to unknown id for server in params)
export async function generateStaticParams() {
  const cabins = await getCabins();
  // Getting ids of cabins and returning them
  // also parameter need to be a string (or we're getting error)
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  // if we're fetching all needed data (settings, bookedDates in this case but we're talking in general) right here we're creating a blocking waterfall
  // since these requests can took a long time it'll block the page entirely even though these pieces of data doesn't relate or depend on each other
  // but they're still blocking one another

  // we can use Promise.all() to get this data in parallel
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(cabinId),
  // ]);
  // still not perfect because as fast as the slowest Promise (still can be a blocking operation)

  // so we're simply create a bunch of different components and fetch data in them (only data that components needs), and then those components can be streamed in as they're ready
  // in this case it's Reservation.js
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        <Cabin cabin={cabin} />
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        {/* using Streaming (more granular case) to create spinner only in this part of the page and not instead of all page*/}
        {/* basically the same as before with Suspense targeted on a smaller component */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </>
  );
}

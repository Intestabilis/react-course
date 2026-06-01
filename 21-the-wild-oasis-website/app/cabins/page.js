import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// making page dynamic again + revalidating the cache completely
// also revalidate can't be computed and needs to be a value
// export const revalidate = 0;
// page basically regenerating for each request

// doing revalidation 1 per hour since it's not likely that cabin prices will be updated often
// (doesn't have any effect since page is rendered dynamicalyl due to the usage of searchParams but anyway demonstrates the purpose)
export const revalidate = 3600;

export const metadata = { title: "Cabins" };

// getting params from url with searchParams prop
// also page can't be statically rendered with using searchParams since server won't know them at the runtime
// also every time searchParams change component will rerender (server components rerender when navigation and well that's a URL so navigation)
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {/* usage of Suspense */}
      {/* Suspense won't hide already existing stuff with using of transition (and that's how next.js navigation(?) operates - it wrap's in a transition)
       - it's a default behaviour*. TL;DR - read Suspense docs, next.js wraps nav in transition/}
      {/* we're using unique key prop to avoid that behaviour (ig the same principle as in lists with key prop and smth smth state in react)*/}
      {/* filter is unique for each element so we're using it as a key*/}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

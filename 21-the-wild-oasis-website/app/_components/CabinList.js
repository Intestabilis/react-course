import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

// we can do revalidation on individual component level (well route level idk)

// can opt out of cache though with noStore
// opting out one of the component of the page will opt out the entire route (because of dynamic generation and ofc page will be dynamic generated too)
// make sense with PPR since this component will be in Suspense and page around will be generated as static (shell) and component'll be generated dynamically
// (at least based on course info since it can be different(?) in next.js 16 and course is based on next.js 14)
async function CabinList() {
  // noStore();

  // can't revalidate with fetch api since we're using supabase api and not fetch() directly
  const cabins = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;

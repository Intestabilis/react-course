// fetching data with getStaticProps

import CabinList from "@/components/CabinList";
import { getCabins } from "@/lib/data-service";

// will be executed on the server and whatever exported from here passed into a component
// Statically generated (SSG)
export async function getStaticProps() {
  const cabins = await getCabins();
  return {
    props: { cabins },
    // revalidate: 3600
  };
}

// to use ISR (revalidate in app router) we're returning revalidate from getStaticProps

// getStaticProps - static route
// getServerSideProps - dynamic route

export default function Cabins({ cabins }) {
  console.log(cabins);

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

      <CabinList cabins={cabins} />
    </div>
  );
}

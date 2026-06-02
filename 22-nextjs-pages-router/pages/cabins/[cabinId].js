import CabinView from "@/components/CabinView";
import { getCabin } from "@/lib/data-service";
import Head from "next/head";
import { useRouter } from "next/router";

// get access to query params
// Dynamically generated (SSR)
export async function getServerSideProps({ params }) {
  const cabin = await getCabin(params.cabinId);
  return { props: { cabin } };
}

// similar to generateStaticParams(?)
// getStaticPaths

function Cabin({ cabin }) {
  // way of getting params in component
  // const router = useRouter();

  return (
    <>
      <Head>
        {/* <title>Cabin #{router.query.cabinId} | The Wild PageRouter</title> */}
        <title>Cabin #{cabin.name} | The Wild PageRouter</title>
      </Head>
      <div className="max-w-6xl mx-auto mt-8">
        <CabinView cabin={cabin} />
      </div>
    </>
  );
}

export default Cabin;

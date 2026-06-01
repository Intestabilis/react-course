"use client";

// we need hooks from /navigation not /router
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  // using next.js hook to get params from the URL
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  // marking current filter as active
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    // using URLSearchParams API that provides methods to manipulate URL query params
    const params = new URLSearchParams(searchParams);

    // then we can do things like set get etc (not sure if that's mutating the object or creating a new one under hood)
    // only builds the url but doesn't navigate to it
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

// internal component (client ofc) to abstract buttons from Filter
function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;

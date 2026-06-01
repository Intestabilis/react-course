// [...nextauth] - catch-all segment

// will handle all URLs that start with api/auth/ and then whatever we want

// importing and exporting with this syntax
export { GET, POST } from "@/app/_lib/auth";

// behind the scenes next.js created all relevant api routes like signin signout etc that start with /api/auth/ so
// api requests can be handled by next.js

// as I undestand then we import and export GET and POST handlers from auth.js that actually implement authentication
// signin signout providers etc

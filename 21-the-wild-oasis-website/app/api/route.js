// we're creating another route (with folder) and then route file (this file) to implement API endpoints
// route and page files can't coexist in one folder because they're obviously conflicting
// then we can create functions lie GET POST PUT etc. for each HTTP verb (so we can create one route handler)

// they're using Response and Request (not next.js standard fetch API)
// also we can use extended next.js versions but for that should check docs (won't be implemented here)

export async function GET() {
  return Response.json({ test: "test" });
}
export async function POST() {}

// every file in API folder becomes API endpoint
// there's no servers actions in pages router ig so API's are the only way to mutate data

import { supabase } from "@/lib/supabase";

// difference from servers actions - we need to call these endpoints manually from components
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Please, make a POST request",
    });
  }

  const contactData = JSON.parse(req.body);

  const { error } = await supabase.from("contact").insert([contactData]);

  if (error) {
    res.status(500).json({
      success: false,
      message: "Could not send your message. Please, try again",
    });
  }

  // Success message
  res.status(200).json({
    success: true,
    message: "Thanks for your message! We will be in touch soon",
  });
}

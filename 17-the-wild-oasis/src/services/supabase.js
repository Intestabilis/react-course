import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fraqtfxqzurpqzvkduwx.supabase.co";
const supabaseKey = `sb_publishable_-dtpIQ-GAVMMUIecLA0XnQ_Nku_QCbp`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

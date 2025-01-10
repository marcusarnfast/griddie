import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient  } from "@supabase/supabase-js";


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error("Either supabase URL or key is not set");
}

export const supabase = createClient(
	supabaseUrl,
	supabaseKey,
  {
		auth: {
			storage: AsyncStorage,
			detectSessionInUrl: false,
		},
	}
);

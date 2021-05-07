import { createClient } from "@supabase/supabase-js";
import { Key } from "../../interfaces";
import config from "../config";

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_API_KEY);

const getAll = async () => {
  try {
    const { data: rows, error } = await supabase
      .from<Key>("Key")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    return rows;
  } catch (err) {
    console.log(err);
  }
};

const add = async (key: Key) => {
  try {
    const { data: rows, error } = await supabase
      .from<Key>("Key")
      .insert(key, { returning: "representation" });

    if (error) {
      throw error;
    }

    return rows![0];
  } catch (err) {
    console.log(err);
  }
};

export { getAll, add };

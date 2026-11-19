import { redirect } from "next/navigation";

// The store now works on computers too, so the old "shop on your phone" page just goes home.
export default function Desktop() {
  redirect("/");
}

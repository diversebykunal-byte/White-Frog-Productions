import { permanentRedirect } from "next/navigation";

export default function FeatureFilmsRedirectPage() {
  permanentRedirect("/films");
}

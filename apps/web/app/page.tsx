import AppLayout from "@web/components/AppLayout";
import Home from "./home/Home";

export default function RootPage() {
  return (
    <>
      <AppLayout>
        <Home />
      </AppLayout>
    </>
  );
}

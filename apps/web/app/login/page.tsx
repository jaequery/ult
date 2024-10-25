import HomeLayout from "@web/components/home/layouts/HomeLayout";
import Login from "./Login";
import PlainLayout from "@web/components/home/layouts/PlainLayout";

export default function LoginPage() {
  return (
    <PlainLayout>
      <Login />
    </PlainLayout>
  );
}

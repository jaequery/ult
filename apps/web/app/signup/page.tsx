import HomeLayout from "@web/components/home/layouts/HomeLayout";
import Signup from "./Signup";
import PlainLayout from "@web/components/home/layouts/PlainLayout";

export default function SignupPage() {
  return (
    <PlainLayout>
      <Signup />
    </PlainLayout>
  );
}

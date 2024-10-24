import Link from "next/link";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-4 md:space-y-0 ">
      <h1 className="text-lg font-bold ">
        <Link href="/" className="flex items-center gap-2">
          <span className="hidden md:block">Ult</span>
        </Link>
      </h1>
      <div>
        <Link href="/" className="flex items-center gap-2 flex-col md:flex-row">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnZoa3IxazhxcWhjdzRmenJ0dmV3bnAxZW5uaXI3bHk2dXpmMWJkeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sKYkLv7TioLv2/giphy.webp"
            className="w-12 h-12 hidden md:block"
          />
          <h1 className="text-center">
          The Ultimate Stack for Modern Frameworks
          </h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 0,
          }}
        >
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

import { IconType } from "react-icons/lib";
import Logo from "./Logo";
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
const links = [FaGithub, FaInstagram, FaLinkedin, FaTwitter];
const IconContainer = (props: { icon: IconType }) => {
  return <props.icon size={25} className="cursor-pointer" />;
};
const Footer = () => {
  return (
    <section className="bg-gray-100 w-full h-full ">
      <hr className="p-3" />
      <div className="flex flex-col p-20 xs:gap-8 md:gap-6">
        <div className="flex md:flex-row xs:flex-col md:justify-between xs:justify-start items-center">
          <div>
            <Logo />
          </div>
          <div className="flex p-2 gap-6">
            {links.map((item) => (
              <IconContainer icon={item} key={item.toString()} />
            ))}
          </div>
        </div>
        <div>
          <p className="md:text-xl xs:text-md font-semibold md:text-start xs:text-center ">
            <span> {new Date().getFullYear()}</span> <span>© Copyright </span>
            <span className="font-bold  ">Blogify</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

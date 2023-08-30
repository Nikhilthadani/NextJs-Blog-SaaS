import Image from "next/image";
import { MdAttachEmail } from "react-icons/md";
import BlogItem from "../components/BlogItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUserById } from "@/lib/helpers";
import { UserItemType } from "@/lib/types";
const ProfilePage = async () => {
  const sessionData = await getServerSession(authOptions);

  const userData: UserItemType = await getUserById(sessionData?.user.id ?? "");
  console.log("userData", userData);

  return (
    <section className="w-full h-full flex flex-col">
      <div className="mx-auto">
        <Image
          src={sessionData?.user.image ?? "/usericon.png"}
          alt="UserProfile"
          width={200}
          height={200}
          className="w-20"
        />
      </div>
      <div className=" mx-auto my-2 w-auto">
        <h1 className="text-4xl font-semibold bg-slate-100 px-4 py-2">
          {sessionData?.user.name}
        </h1>
      </div>
      <div className=" mx-auto my-2 w-auto flex items-center gap-3">
        <span>
          <MdAttachEmail />
        </span>{" "}
        <p className="text-xl font-semibold bg-slate-100 p-3">
          {sessionData?.user.email}
        </p>
      </div>
      <hr className="p-2 " />
      <div className="w-full h-full flex flex-col">
        <div className=" mx-auto">
          <p className="text-center bg-slate-100 p-3 rounded-md font-semibold">
            ✨ Blog Count {userData?._count?.blogs}
          </p>
        </div>
        <div className="flex flex-wrap justify-center p-4 my-3">
          {userData?.blogs?.map((blog) => (
            <BlogItem {...blog} key={blog.id} isProfile={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

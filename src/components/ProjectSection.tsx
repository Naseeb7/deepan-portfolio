import { ProjectFieldTypes, ProjectType } from "@/constants/enums";
import React from "react";
import Header from "./ui/Header";
import Image from "next/image";
import DummyImage from "@/assets/dummyImage.png";
import ConnectArrow from "@/assets/ConnectArrow.svg";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { deleteProject } from "@/utils/serverActions.ut";

const ProjectSection = ({
  id,
  type,
  name,
  heroImage,
  challenge,
  details,
  overview,
  photos,
  url,
}: ProjectFieldTypes) => {
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    // Implement delete functionality here
    const response = await deleteProject(id);
    if (response === true) {
      // Handle successful deletion (e.g., show a success message, redirect, etc.)
      window.location.reload();
    } else {
      // Handle error (e.g., show an error message)
      alert("Error deleting project");
    }
  };
  return (
    <div className="flex flex-col w-full gap-11 bg-brand-200 p-10 relative rounded-[20px] h-fit">
      <div className="flex gap-10 items-center">
        <Header text={name} containerClassName="pb-0" />

        {isAdmin && (
          <div className="flex gap-4">
            <Link
              href={`/project/edit/${id}`}
              className=" flex px-6 py-1 justify-center rounded-xl bg-secondary-100 hover:cursor-pointer hover:bg-secondary-100/80"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className=" flex px-6 py-1 justify-center rounded-xl bg-red-600 hover:cursor-pointer hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <Image
        src={heroImage || DummyImage}
        alt={name}
        className="h-[440px] w-full object-cover rounded-4xl"
        width={1200}
        height={440}
        objectFit="cover"
      />

      <div>
        <Header text="Overview" textClassName="!text-2xl" />
        <p>{overview}</p>
      </div>

      <div>
        <Header text="Challenge" textClassName="!text-2xl" />
        <p>{challenge}</p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[440px]">
        {photos && photos.length > 0 ? (
          photos.slice(0, 3).map((photo, index) => (
            <div
              key={index}
              className={index === 0 ? "row-span-2 h-full" : "h-full"}
            >
              <Image
                src={photo || DummyImage}
                alt={`${name} photo ${index + 1}`}
                className="h-full w-full object-cover rounded-4xl"
                width={720}
                height={440}
              />
            </div>
          ))
        ) : (
          <div className="col-span-2">
            <Image
              src={DummyImage}
              alt="No photos available"
              className="h-full w-full object-cover rounded-4xl"
              width={720}
              height={440}
            />
          </div>
        )}
      </div>

      <div>
        <Header text="Project Details" textClassName="!text-2xl" />
        <ul className="list-disc pl-5">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>

      <div>
        <Header
          text={`Checkout ${
            type === ProjectType.PROJECT ? "Project" : "Complete Case Study"
          }`}
          textClassName="!text-2xl"
        />
        <Link
          href={url}
          target="_blank"
          className="text-secondary-100 hover:underline"
        >
          {url}
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <span className="flex justify-center w-full font-extrabold">
          Need to Know More about the Projects?
        </span>
        <div className="flex w-full items-center">
          <div className="h-[1px] bg-gradient-to-r from-brand-200 to-white/50 w-1/2" />
          <Link
            href={"/contact"}
            className="flex gap-1 py-3 justify-center w-1/5 bg-secondary-100 rounded-xl hover:cursor-pointer"
          >
            <span className="font-bold">Let&apos;s Connect</span>
            <Image src={ConnectArrow} alt="Arrow" />
          </Link>
          <div className="h-[1px] bg-gradient-to-l from-brand-200 to-white/50 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;

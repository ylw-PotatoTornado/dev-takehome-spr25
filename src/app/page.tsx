import { NP } from "@/utils/constants/strings";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white">
      <div className="flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1>{NP.NAME}</h1>
          <p>{NP.TAGLINE}</p>
        </div>
        <div className="flex flex-row gap-5">
          <button className="bg-primary-fill text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white border-white border">
            Log In
          </button>
          <button className="bg-primary-fill text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white border-white border">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

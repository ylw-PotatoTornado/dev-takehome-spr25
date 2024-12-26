import Button from "@/components/atoms/Button";
import { APP_PATHS } from "@/utils/constants/paths";
import { NP } from "@/utils/constants/strings";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white">
      <div className="flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1>{NP.NAME}</h1>
          <p>{NP.TAGLINE}</p>
        </div>
        <div className="flex flex-col w-full gap-5">
          <Link href={APP_PATHS.CREATE_REQ}>
            <Button variant="inverted">
              <p>Request an Item</p>
            </Button>
          </Link>
          <Link href={APP_PATHS.ADMIN_PORTAL}>
            <Button variant="inverted">
              <p>Admin Portal</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { APP_PATHS } from "@/utils/constants/paths";
import Link from "next/link";

export default function LogIn() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-primary">
      <div className="w-full max-w-md bg-white rounded-lg p-7 flex flex-col gap-6">
        <Link href={APP_PATHS.HOME}>
          <button className="text-primary hover:underline self-start">
            <p>&larr; Back to Home</p>
          </button>
        </Link>
        <div className="flex flex-col gap-3">
          <h2 className="text-center">Log In</h2>

          <form className="flex flex-col gap-7 mx-5">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="username">
                  <p>Username</p>
                </label>
                <Input placeholder="Enter username" />
              </div>

              <div>
                <label htmlFor="password">
                  <p>Password</p>
                </label>
                <Input type="password" placeholder="Enter password" />
              </div>
            </div>
            <Button type="submit">
              <p>Log In</p>
            </Button>
          </form>
        </div>
        <div className="text-center">
          <p>
            Don’t have an account?{" "}
            <Link href={APP_PATHS.SIGNUP}>
              <button className="text-primary hover:underline">Sign Up</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

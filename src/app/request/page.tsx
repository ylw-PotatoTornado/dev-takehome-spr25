import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Link from "next/link";

export default function CreateRequestForm() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary p-5">
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col gap-5">
        <h3 className="text-center">Create Item Request</h3>
        <Input label="Requestor Name" />
        <Input label="Item Requested" />
        <Button type="submit">
          <p>Submit Request</p>
        </Button>
      </form>
      <Link href="/">
        <p className="mt-5 text-white text-xxs hover:underline">
          &larr; Back to Home
        </p>
      </Link>
    </div>
  );
}

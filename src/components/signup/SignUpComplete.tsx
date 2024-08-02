import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import Link from "next/link";

export default function SignUpComplete({
  isDialogOpen,
  setDialog,
}: {
  isDialogOpen: boolean;
  setDialog: () => void;
}) {
  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setDialog}>
        <AlertDialogContent className="bg-[#162341] w-[80%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-center">
              Thank you for signing up!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white text-center">
              Thank you for signing up with an account! You can proceed to log
              in now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-center">
            <Link href="/login">
              <AlertDialogAction className="bg-white text-[#162341]">
                Continue
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

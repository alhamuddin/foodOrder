import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
export default async function Setting() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center gap-3 justify-between">
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <Button type="submit">SignOut</Button>
      </form>
    </div>
  );
}

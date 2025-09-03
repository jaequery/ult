import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateDto, UserCreateDtoType } from "@server/user/user.dto";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import { Button } from "@web/components/ui/button";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AlertCircle } from "lucide-react";

type ShadcnDashboardUserCreateModalProps = {
  open?: boolean;
  onClose: () => void;
};

export default function ShadcnDashboardUserCreateModal(
  props: ShadcnDashboardUserCreateModalProps
) {
  const { trpc } = useTrpc();
  const createUser = trpc.userRouter.create.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserCreateDtoType>({
    resolver: zodResolver(UserCreateDto),
  });

  return (
    <Dialog open={props.open !== false} onOpenChange={(open) => !open && props.onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new user</DialogTitle>
          <DialogDescription>
            Create a new user account. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await createUser.mutateAsync(data);
              toast("User added");
              if (props.onClose) {
                props.onClose();
              }
            } catch (e) {
              // Error is handled by createUser.error below
            }
          })}
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                {...register("firstName")}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.firstName.message}
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                {...register("lastName")}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.lastName.message}
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {createUser.error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {createUser.error.message}
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createUser.isLoading}
            >
              {createUser.isLoading ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
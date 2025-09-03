"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserUpdateDto, UserUpdateDtoType } from "@server/user/user.dto";
import { Roles } from "@shared/interfaces";
import { useUserContext } from "@web/app/user/UserContext";
import { Uploader } from "@web/components/common/forms/Uploader";
import { Avatar, AvatarFallback, AvatarImage } from "@web/components/ui/avatar";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Checkbox } from "@web/components/ui/checkbox";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import { Textarea } from "@web/components/ui/textarea";
import { useTrpc } from "@web/contexts/TrpcContext";
import _ from "lodash";
import { Upload, Save, Key } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

export default function ShadcnDashboardUserView() {
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const params = useParams();
  const [showProfilePicUrlUploader, setShowProfilePicUrlUploader] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const user = trpc.userRouter.findById.useQuery({ id: Number(params.id) });
  const updateUser = trpc.userRouter.update.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<UserUpdateDtoType>({
    resolver: zodResolver(UserUpdateDto),
  });

  const data = getValues();

  useEffect(() => {
    if (user.data) {
      const formData = {
        id: user.data.id,
        email: user.data.email,
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        username: user.data.username || "",
        phone: user.data.phone || "",
        gender: user.data.gender || "",
        bio: user.data.bio || "",
        profilePicUrl: user.data.profilePicUrl || "",
        roles:
          user.data.roles.map((r) => {
            return r.name as Roles;
          }) || [],
      };
      reset(formData);
    }
  }, [user.data, reset]);

  const rolesWatched = watch("roles");
  const isRoleChecked = (role: Roles) =>
    Array.isArray(rolesWatched) && rolesWatched.includes(role);

  const handleCheckboxChange = (role: Roles, checked: boolean) => {
    const currentRoles = Array.isArray(rolesWatched) ? rolesWatched : [];
    if (checked) {
      setValue("roles", [...currentRoles, role], { shouldValidate: true });
    } else {
      setValue(
        "roles",
        currentRoles.filter((r) => r !== role),
        { shouldValidate: true }
      );
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {_.capitalize(data?.firstName || "")}{" "}
            {_.capitalize(data?.lastName || "")}'s Profile
          </CardTitle>
          <CardDescription>
            Update user profile details. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                await updateUser.mutateAsync(data);
                toast("Saved");
              } catch (e: any) {
                toast(e.message, { type: "error" });
              }
            })}
            className="space-y-6"
          >
            {/* Profile Photo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="md:pt-2">Profile photo</Label>
              <div className="md:col-span-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={data?.profilePicUrl} alt="Profile" />
                    <AvatarFallback>
                      {getInitials(data?.firstName, data?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowProfilePicUrlUploader(!showProfilePicUrlUploader)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload photo
                  </Button>
                  {showProfilePicUrlUploader && (
                    <Uploader
                      onClose={() => setShowProfilePicUrlUploader(false)}
                      onUpload={(file) => {
                        setValue("profilePicUrl", file.url);
                        setShowProfilePicUrlUploader(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="md:pt-2">
                Full name <span className="text-destructive">*</span>
              </Label>
              <div className="md:col-span-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      {...register("firstName")}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      {...register("lastName")}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label htmlFor="username" className="md:pt-2">
                Username
              </Label>
              <div className="md:col-span-2">
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label htmlFor="email" className="md:pt-2">
                Email <span className="text-destructive">*</span>
              </Label>
              <div className="md:col-span-2">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="md:pt-2">Password</Label>
              <div className="md:col-span-2">
                {showChangePassword ? (
                  <>
                    <Input
                      type="password"
                      {...register("password")}
                      required={showChangePassword}
                      placeholder="Enter new password"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowChangePassword(true)}
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Set new password
                  </Button>
                )}
              </div>
            </div>

            {/* Roles (Admin only) */}
            {currentUser?.roles?.some((r) => r.name === Roles.Admin) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Label className="md:pt-2">Roles</Label>
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="adminRole"
                      checked={isRoleChecked(Roles.Admin)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(Roles.Admin, checked as boolean)
                      }
                    />
                    <label
                      htmlFor="adminRole"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Admin
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="userRole"
                      checked={isRoleChecked(Roles.User)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(Roles.User, checked as boolean)
                      }
                    />
                    <label
                      htmlFor="userRole"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      User
                    </label>
                  </div>
                  {errors.roles && (
                    <p className="text-sm text-destructive">
                      {errors.roles.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="md:pt-2">Phone</Label>
              <div className="md:col-span-2">
                <PhoneInput
                  country={"us"}
                  value={data.phone}
                  onChange={(phone) => setValue("phone", phone)}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    fontSize: "14px",
                    paddingLeft: "48px",
                    borderRadius: "6px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                  }}
                  buttonStyle={{
                    borderRadius: "6px 0 0 6px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--background))",
                  }}
                  dropdownStyle={{
                    borderRadius: "6px",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label htmlFor="bio" className="md:pt-2">Bio</Label>
              <div className="md:col-span-2">
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Tell us about yourself..."
                  rows={6}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={updateUser.isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {updateUser.isLoading ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
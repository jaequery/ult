"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PostUpdateDto, PostUpdateDtoType } from "@server/post/post.dto";
import { S3Uploader } from "@web/components/common/forms/S3Uploader";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Input } from "@web/components/ui/input";
import { Label } from "@web/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@web/components/ui/alert-dialog";
import { useTrpc } from "@web/contexts/TrpcContext";
import { Upload, Trash2, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function ShadcnDashboardPostView() {
  const { trpc } = useTrpc();
  const params = useParams();
  const router = useRouter();
  const categories = trpc.categoryRouter.findAll.useQuery({});
  const deletePost = trpc.postRouter.delete.useMutation();
  const post = trpc.postRouter.findById.useQuery(
    { id: Number(params.id) },
    { refetchOnWindowFocus: false }
  );
  const updatePost = trpc.postRouter.update.useMutation();
  const [showImageUrlUploader, setShowImageUrlUploader] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
  } = useForm<PostUpdateDtoType>({
    resolver: zodResolver(PostUpdateDto),
  });

  const data = getValues(); // Gets all current form values

  // set default form values
  useEffect(() => {
    if (post.data) {
      const formData = {
        id: post.data.id,
        title: post.data.title,
        categoryId: post.data.categoryId || 0,
        teaser: post.data.teaser || "",
        description: post.data.description || "",
        imageUrl: post.data.imageUrl || "",
      };
      reset(formData);
    }
  }, [post.data, reset]);

  // loading Quill this way due to SSR issues
  // https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const handleDelete = async () => {
    if (post?.data?.id) {
      await deletePost.mutateAsync({
        id: [post.data.id],
      });
      router.push(`/dashboard/posts`);
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{data?.title || "Edit Post"}</CardTitle>
          <CardDescription>
            Update post details. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                await updatePost.mutateAsync(data);
                toast("Saved");
              } catch (e: any) {
                toast(e.message, { type: "error" });
              }
            })}
            className="space-y-6"
          >
            {/* Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="md:pt-2">Cover image</Label>
              <div className="md:col-span-2">
                <div className="flex items-center gap-4">
                  {data?.imageUrl && (
                    <a href={data?.imageUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        className="w-20 h-20 object-cover rounded-lg border"
                        src={data?.imageUrl}
                        alt="Cover"
                      />
                    </a>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowImageUrlUploader(!showImageUrlUploader)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload photo
                  </Button>
                  {showImageUrlUploader && (
                    <S3Uploader
                      onClose={() => setShowImageUrlUploader(false)}
                      onUpload={(file) => {}}
                      onComplete={(file) => {
                        setValue("imageUrl", file.url);
                        setShowImageUrlUploader(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label htmlFor="title" className="md:pt-2">
                Title <span className="text-destructive">*</span>
              </Label>
              <div className="md:col-span-2">
                <Input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Enter post title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="md:pt-2">
                Category <span className="text-destructive">*</span>
              </Label>
              <div className="md:col-span-2">
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => {
                        const numValue = parseInt(value);
                        field.onChange(isNaN(numValue) ? "" : numValue);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.data?.records?.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Label className="md:pt-2">Description</Label>
              <div className="md:col-span-2">
                <div className="border rounded-lg">
                  <ReactQuill
                    value={data.description}
                    onChange={(value: string) => {
                      setValue("description", value);
                    }}
                    theme="snow"
                    className="[&_.ql-container]:min-h-[200px] [&_.ql-toolbar]:border-b [&_.ql-toolbar]:bg-muted/30"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={deletePost.isLoading}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button type="submit" disabled={updatePost.isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {updatePost.isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
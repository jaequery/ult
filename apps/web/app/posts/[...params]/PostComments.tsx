"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUsername,
  PostCommentCreateDto,
  PostCommentCreateDtoType,
} from "@server/post/post.dto";
import { PostById } from "@shared/interfaces";
import { useUserContext } from "@web/app/user/UserContext";
import { useTrpc } from "@web/contexts/TrpcContext";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PostComments({
  post,
  onChange,
}: {
  post: PostById;
  onChange: () => void;
}) {
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const createPostComment = trpc.postRouter.createComment.useMutation();
  const deletePostComment = trpc.postRouter.deleteComment.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostCommentCreateDtoType>({
    resolver: zodResolver(PostCommentCreateDto),
  });

  return (
    <>
      <div className="w-full mx-auto rounded-lg border border-gray-200 p-4 bg-gray-50">
        {/* Reply to section */}
        <form
          onSubmit={handleSubmit(async (data) => {
            if (!currentUser) {
              toast("Please login");
            }
            try {
              const postComment = await createPostComment.mutateAsync(data);
              if (onChange && postComment) {
                onChange();
                reset();
              }
            } catch (e) {}
          })}
        >
          <input
            type="hidden"
            value={post.id}
            {...register("postId", {
              valueAsNumber: true,
            })}
          />
          <div className="flex items-stretch space-x-4">
            <textarea
              {...register("message")}
              className="flex-grow h-14 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-transparent resize-none"
              placeholder={
                currentUser ? "Write a reply..." : "Please login"
              }
              disabled={!currentUser}
              onClick={() => {
                if (!currentUser) {
                  toast("Please login", { type: "warning" });
                }
              }}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              onClick={() => {
                if (!currentUser) {
                  alert("Please login");
                }
              }}
              className="w-32 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            >
              Write a reply
            </button>
          </div>
        </form>
        {/* Divider */}
        <div className="text-red-400 text-left">
          {errors.message && (
            <p className="text-sm">{errors.message.message}</p>
          )}
        </div>
        {/* Replies Section */}
        {post?.postComments?.map((postComment) => (
          <div key={postComment.id} className="mt-6">
            <div className="flex items-start space-x-1 gap-2">
              <div className="flex flex-col text-left">
                <span className=" text-gray-900 text-sm">
                {getUsername(postComment.user)}
                  <span className="ml-4 text-sm">{postComment.message}</span>
                </span>
                <div className="flex items-center text-xs text-gray-500 space-x-2 mt-2">
                  <time dateTime="2023-03-29">
                    {format(postComment.createdAt, "yyyy.MM.dd hh:mm a")}
                  </time>
                  {/* <button className="hover:text-gray-700">Report</button> */}
                  <span className="flex-grow" />
                </div>
                {postComment.userId === currentUser?.id && (
                  <div className="">
                    <button
                      className="text-red-500 font-bold text-xs"
                      onClick={async () => {
                        const c = confirm("Are you sure?");
                        if (c) {
                          await deletePostComment.mutateAsync({
                            id: postComment.id,
                          });
                          toast("Comment deleted");
                          onChange();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

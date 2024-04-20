"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostCommentCreateDto,
  PostCommentCreateDtoType,
} from "@server/post/post.dto";
import { PostById } from "@shared/interfaces";
import { useUserContext } from "@web/app/user/UserContext";
import { useTrpc } from "@web/contexts/TrpcContext";
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
  const removePostComment = trpc.postRouter.removeComment.useMutation();
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
      <div className="w-full mx-auto px-8 mt-24">
        {/* Reply to section */}
        <form
          onSubmit={handleSubmit(async (data) => {
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
          <div className="flex items-center space-x-4 mb-4">
            <img
              className="w-10 h-10 rounded-full"
              src={
                currentUser?.profilePicUrl ||
                "https://avataaars.io/?accessoriesType=Wayfarers&avatarStyle=Circle&clotheColor=Red&clotheType=CollarSweater&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&facialHairColor=BlondeGolden&facialHairType=BeardMedium&hairColor=PastelPink&hatColor=Blue02&mouthType=Default&skinColor=Brown&topType=ShortHairShortCurly"
              }
              alt="Avatar"
            />
            <input
              type="text"
              {...register("message")}
              className="w-full border-none focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
              placeholder="Leave a comment..."
            />
            <span className="flex-grow" />
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Comment
            </button>
          </div>
        </form>
        {/* Divider */}
        <div className="border-t border-gray-300 my-4" />
        <div className="text-red-400 text-left">
          {errors.message && (
            <p className="text-sm">{errors.message.message}</p>
          )}
        </div>
        {/* Replies Section */}
        <h3 className="text-xl text-left my-12">
          {post?.postComments?.length || 0} Comments
        </h3>
        {!post?.postComments ||
          (post?.postComments?.length === 0 && (
            <div className="text-left">Be the first to comment</div>
          ))}
        {post?.postComments?.map((postComment) => (
          <div key={postComment.id} className="mb-8">
            <div className="flex items-start space-x-1 gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={
                  postComment.user.profilePicUrl ||
                  "https://avataaars.io/?accessoriesType=Wayfarers&avatarStyle=Circle&clotheColor=Red&clotheType=CollarSweater&eyeType=Surprised&eyebrowType=RaisedExcitedNatural&facialHairColor=BlondeGolden&facialHairType=BeardMedium&hairColor=PastelPink&hatColor=Blue02&mouthType=Default&skinColor=Brown&topType=ShortHairShortCurly"
                }
                alt="Avatar"
              />
              <div className="flex flex-col text-left">
                <span className="font-medium text-gray-900">
                  {postComment.user.firstName} {postComment.user.lastName}
                </span>
                <p className="text-gray-700 mt-1">{postComment.message}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-2 mt-2">
                  <time dateTime="2023-03-29">Mar 29</time>
                  {/* <button className="hover:text-gray-700">Report</button> */}
                  {postComment.userId === currentUser?.id && (
                    <button
                      className="hover:text-gray-700"
                      onClick={async () => {
                        const c = confirm("Are you sure?");
                        if (c) {
                          await removePostComment.mutateAsync({
                            id: postComment.id,
                          });
                          toast("Comment deleted");
                          onChange();
                        }
                      }}
                    >
                      Delete
                    </button>
                  )}
                  <span className="flex-grow" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

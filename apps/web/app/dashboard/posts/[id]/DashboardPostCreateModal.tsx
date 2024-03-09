import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreateDto, PostCreateDtoType } from "@server/post/post.dto";
import { Dialog } from "@web/components/Dialog";
import { useTrpc } from "@web/contexts/TrpcContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type DashboardPostCreateModalProps = {
  onClose: () => void;
};
export default function DashboardPostCreateModal(
  props: DashboardPostCreateModalProps
) {
  const { trpc } = useTrpc();
  const createPost = trpc.postRouter.create.useMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PostCreateDtoType>({
    resolver: zodResolver(PostCreateDto),
  });
  return (
    <Dialog
      onClose={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
    >
      <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] px-2 pb-10">
        <div className="mt-8">
          <div className="text-center">
            <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
              Add a new post
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              * means required
            </p>
          </div>
        </div>
        <div className="p-4 overflow-y-auto">
          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                await createPost.mutateAsync(data);
                toast("Post added");
                if (props.onClose) {
                  props.onClose();
                }
              } catch (e) {}
            })}
          >
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Title *
                </label>
                <div className="relative">
                  <input
                    type="title"
                    {...register("title")}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    required
                    aria-describedby="title-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {errors.title && (
                  <p className="text-xs text-red-600 mt-2" id="firstName-error">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Description
                </label>
                <div className="relative">
                  <input
                    type="lastName"
                    {...register("description")}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    required
                    aria-describedby="description-error"
                  />
                  <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg
                      className="size-5 text-red-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                {errors.description && (
                  <p className="text-xs text-red-600 mt-2" id="lastName-error">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={createPost.isLoading}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                {createPost.isLoading ? "Adding ..." : "Add"}
              </button>
            </div>
            {createPost.error && (
              <p className="text-sm text-red-600 mt-4 text-center">
                {createPost.error.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </Dialog>
  );
}

"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { differenceInDays, format } from "date-fns";
import kebabCase from "lodash/kebabCase";
import Link from "next/link";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import { useUserContext } from "../user/UserContext";
import { getUsername } from "@server/post/post.dto";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Button } from "@web/components/ui/button";
import { Separator } from "@web/components/ui/separator";
import { ChevronLeft, ChevronRight, Edit2, MessageSquare, ThumbsUp } from "lucide-react";

export const isNew = (date: Date | null) => {
  if (!date) return false;
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  return diffInHours <= 24 * 1;
};

export default function ShadcnPostList(params: {
  categoryId?: number;
  page?: number;
  perPage?: number;
  showPagination?: boolean;
  search?: string;
}) {
  const { trpc } = useTrpc();
  const { currentUser } = useUserContext();
  const [categoryId, setCategoryId] = useQueryParam(
    "categoryId",
    withDefault(NumberParam, params.categoryId ?? 0)
  );
  const [page, setPage] = useQueryParam(
    "page",
    withDefault(NumberParam, params.page ?? 1)
  );
  const [perPage, setPerPage] = useQueryParam(
    "perPage",
    withDefault(NumberParam, params.perPage ?? 10)
  );
  const [showPagination, setShowPagination] = useQueryParam(
    "showPagination",
    withDefault(BooleanParam, params.showPagination ?? false)
  );
  const [search, setSearch] = useQueryParam(
    "search",
    withDefault(StringParam, params.search)
  );

  const postList = trpc.postRouter.findAll.useQuery({
    page,
    perPage,
    categoryId,
    search,
  });

  const category = trpc.categoryRouter.findById.useQuery({
    id: categoryId,
  });

  const getWriteUrl = () => {
    if (
      category?.data?.singlePostOnly &&
      postList?.data?.records?.length &&
      postList?.data?.records?.length > 0
    ) {
      return `/posts/${postList?.data?.records[0]?.id}/edit?categoryId=${categoryId}`;
    }
    return `/posts/new?categoryId=${categoryId}`;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <Link
              className="text-primary hover:underline"
              href={`/posts/?category=${category?.data?.name}&categoryId=${categoryId}`}
            >
              {category?.data?.name}
            </Link>
          </CardTitle>
          {params.showPagination &&
            currentUser &&
            (!category?.data?.adminWriteOnly ||
              (category?.data?.adminWriteOnly &&
                currentUser?.roles?.some((r) => r.name === "Admin"))) && (
              <Button size="sm" asChild>
                <Link href={getWriteUrl()}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Write
                </Link>
              </Button>
            )}
        </CardHeader>
        <CardContent>
          {postList?.isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}
          
          {postList?.data?.records && postList.data.records.length > 0 && category?.data?.singlePostOnly ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: postList?.data?.records[0]?.description || "",
              }}
            />
          ) : (
            <div className="space-y-2">
              {postList?.data?.records.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No posts available</p>
              )}
              
              {postList?.data?.records?.map((post) => (
                <div key={post.id} className="border-b last:border-0 pb-2">
                  <Link
                    href={`/posts/${post.id}`}
                    className="block hover:bg-accent/50 p-2 -mx-2 rounded-md transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-medium hover:underline">
                            {post.title}
                          </h3>
                          {isNew(post.createdAt) && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span>{getUsername(post)}</span>
                          <span>
                            {differenceInDays(new Date(), new Date(post.createdAt || new Date())) <= 1
                              ? format(new Date(post.createdAt || new Date()), "h:mm a")
                              : format(new Date(post.createdAt || new Date()), "MM/dd/yyyy")}
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {post.reactionCount || 0}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {post.commentCount || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {showPagination && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((page || 1) - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil((postList?.data?.total || 0) / perPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((page || 1) + 1)}
                disabled={page >= Math.ceil((postList?.data?.total || 0) / perPage)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}